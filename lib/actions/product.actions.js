import connectToDatabase from '../../lib/dbConnect';
import Product from '../../models/Product';
import { handleError } from '../util'; // Assuming you have a function to handle errors

export async function getAllProducts({ query }) {
  try {
    await connectToDatabase();

    // Create the title condition for searching products by title
    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};

    // Fetch all products matching the title condition
    const products = await Product.find(titleCondition).sort({ createdAt: 'desc' });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(products)),
    };
  } catch (error) {
    handleError(error);
    return {
      success: false,
      error: error.message,
    };
  }
}
