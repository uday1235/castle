// pages/api/products.js
import { getAllProducts } from '../../../lib/actions/product.actions.js'; // Adjust the path

export default async function handler(req, res) {
  const { query } = req.query; // Extract the query parameter

  try {
    const result = await getAllProducts({ query }); // Pass the query to the action
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
