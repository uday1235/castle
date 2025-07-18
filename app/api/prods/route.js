import connectToDatabase from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    await connectToDatabase();

    const products = await Product.find({
      title: { $regex: query, $options: 'i' }
    });

    return new Response(JSON.stringify({ success: true, data: products }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
