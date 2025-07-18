"use client"
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { selectItems } from "../redux/slices/basketSlice";
import { formUrlQuery, removeKeysFromQuery } from '../../lib/util';


import { signIn, signOut, useSession } from "next-auth/react";

const Header = ({ setProducts, placeholder = 'Search title...' }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const {status} = useSession();
  
  const items = useSelector(selectItems);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      let newUrl = '';
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }
      router.push(newUrl, { scroll: false });

      // Fetch filtered products based on query
      try {
        const res = await fetch(`/api/prods${newUrl}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const result = await res.json();
        setProducts(result.data); // Update products state in parent component
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router, setProducts]);

  return (
    <header>
      <div className="flex px-2 items-center bg-violet-800 p-1 flex-grow py-2">
        <div className="mt-2 space-x-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://utfs.io/f/895e2b3e-5ece-4da9-944a-0da9fa486042-268l.jpg"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer z-11 mr-4"
          />
        </div>

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          
            <div className="flex items-center">
             
            {status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sign In
        </button>
      )}
            </div>
          
          
            
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative cursor-pointer link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full font-bold">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-2 pl-6 bg-rose-500 text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Side Wind Shields</p>
        <p className="link">Ford Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Leather Seats</p>
        <p className="link hidden lg:inline-flex">Bumpers</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Interiors</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Car Electronics</p>
        <p className="link hidden lg:inline-flex">Wheels</p>
      </div>
    </header>
  );
};

export default Header;
