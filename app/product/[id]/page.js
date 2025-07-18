"use client"
import React,{Suspense} from  'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Header from '../../components/Header';
import ProductDetailComponent from '../../components/ProductDetailComponent';
import {useParams} from 'next/navigation';

export default function ProductDetailPage() {
  //const router = useRouter();
  const {id} = useParams();
  console.log('my new params' +" " + id);
  //const { id } = router.query;
  //const {id} = params;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return; // Prevent running if id is not ready

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/Products/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await res.json();

        if (result.success && result.data) {
          setProduct(result.data);
        } else {
          console.error('Product not found or success flag is false:', result);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>{product ? product.title : 'Loading...'}</title>
      </Head>
      <Suspense fallback= {<div> Loading... </div>}>
      <Header  />
      </Suspense>
      <main className="max-w-screen-2xl mx-auto p-5">
        {product ? (
          <ProductDetailComponent product={product} />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
}
