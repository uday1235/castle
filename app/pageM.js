'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductFeed from './components/ProductFeed';


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/Products');
      const data = await res.json();
      setProducts(data);
      console.log(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}



{/*import Image from "next/image";

export default function Home() {
  return (
   <h1 className="text-red-400">hello world</h1>
  );
}

*/}