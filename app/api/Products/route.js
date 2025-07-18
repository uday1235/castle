// /app/api/products/route.js
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export  async function GET(req) {
  await dbConnect();
  try {
    const products = await Product.find({});
    return new Response(JSON.stringify({ success: true, data: products }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }
}

export  async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const product = await Product.create(body);
    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }
}
