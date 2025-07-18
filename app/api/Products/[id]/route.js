import Product from '../../../../models/Product';
import connectToDatabase from '../../../../lib/dbConnect';
import { Types } from 'mongoose';

export async function GET(req, { params }) {
  const { id } = params;

  if (!Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid product ID' }), {
      status: 400,
    });
  }

  await connectToDatabase();

  console.log('about to fetch')

  try {
    const product = await Product.findById(id);

    if (!product) {
      return new Response(JSON.stringify({ success: false, message: 'Product not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}