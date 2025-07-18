import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, email, currency, customerDetails } = await req.json();

    const isInternational = currency !== "inr";

    const transformedItems = items.map((item) => ({
      price_data: {
        currency: currency,
        unit_amount: item.price * 100, // Stripe expects the amount in cents
        product_data: {
          name: item.title,
          description: item.description, // Move description inside product_data
          images: [item.image],
        },
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
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
      },
      shipping: isInternational ? {
        name: customerDetails.name,
        address: {
          line1: customerDetails.address.line1,
          postal_code: customerDetails.address.postal_code,
          city: customerDetails.address.city,
          state: customerDetails.address.state,
          country: customerDetails.address.country,
        },
      } : undefined,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create checkout session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
