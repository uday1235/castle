'use client'

import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/basketSlice";

//import '../styles/globals.css'

function Header() {
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header>
      <div className="flex px -2 items-center bg-violet-800 p-1 flex-grow py-2">
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
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={signIn} className="cursor-pointer link">
            <p>Hello Uday</p>
            <p className="font-extrabold md:text-sm">Accounts& Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">&Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative  cursor-pointer link flex items-center"
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
        <p className="link hidden lg:inline-flex"> Car Electronics</p>
        <p className="link hidden lg:inline-flex">Wheels</p>
      </div>
    </header>
  );
}

export default Header;
