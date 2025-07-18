import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Parse the request body
    const { items, email, currency, customerDetails } = await req.json();

    // Log the request data for debugging
    console.log("Request data:", { items, email, currency, customerDetails });

    // Determine if the transaction is international
    const isInternational = currency !== "inr";

    // Transform the items for Stripe
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: currency,
        unit_amount: item.price * 100, // Stripe expects the amount in cents
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
      quantity: 1,
    }));

    // Prepare session data
    const sessionData = {
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      customer_email: email,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
        transactionPurposeCode: isInternational ? 'P0107' : 'P0105', // Example purpose codes
      }
    };

    // Add shipping information if the transaction is international
    if (isInternational && customerDetails) {
      sessionData.shipping = {
        name: customerDetails.name,
        address: {
          line1: customerDetails.address.line1,
          postal_code: customerDetails.address.postal_code,
          city: customerDetails.address.city,
          state: customerDetails.address.state,
          country: customerDetails.address.country,
        },
      };
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionData);

    // Return the session ID
    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating checkout session:", error);

    // Return a detailed error response
    return new Response(
      JSON.stringify({
        error: "Failed to create checkout session",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
