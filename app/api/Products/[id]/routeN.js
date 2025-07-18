
import connectToDatabase from '../../../../lib/dbConnect';
import Product from '../../../../models/Product';

export async function GET({req,params}) {
  const { id } = params;
  console.log('hello' + id);
  await connectToDatabase();
  try {
    const product = await Product.findById({_id:id});
    if (!product) {
      return new Response(JSON.stringify({ success: false }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }
}

export async function PUT(req) {
  const { id } = req.query;
  await dbConnect();
  try {
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return new Response(JSON.stringify({ success: false }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }
}

export async function DELETE(req) {
  const { id } = req.query;
  await dbConnect();
  try {
    const deletedProduct = await Product.deleteOne({ _id: id });
    if (!deletedProduct) {
      return new Response(JSON.stringify({ success: false }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ success: true, data: {} }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }
}
