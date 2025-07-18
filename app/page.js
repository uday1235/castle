'use client';

import React, {Suspense} from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductFeed from './components/ProductFeed';


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/Products');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await res.json();
        console.log('Fetched result:', result);

        // Check if the data property is an array
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);

         
        } else {
          console.error('Data is not an array or success flag is false:', result);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Suspense fallback= {<div> Loading... </div>}>
      <Header setProducts={setProducts} />
      </Suspense>
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
  
      </main>
    </div>
  );
}
