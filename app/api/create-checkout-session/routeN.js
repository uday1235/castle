import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, email } = await req.json(); // Use `req.json()` to parse the incoming JSON body

    const transformedItems = items.map((item) => ({
      description: item.description,
      quantity: 1,
      price_data: {
        currency: "inr",
        unit_amount: item.price * 100, // Stripe expects the amount in cents
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1Po7CMSBJ8lhNFGRMWqdY34u"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      line_items: transformedItems,
      mode: "payment", // Fixed from "payments" to "payment"
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
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
