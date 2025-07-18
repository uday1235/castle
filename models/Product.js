// /models/Product.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }], // Changed from `image` to `images` array
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  image:{type: String, required: true}
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;