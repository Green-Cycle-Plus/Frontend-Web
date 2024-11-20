'use client'

import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GetStartedModal } from "@/components/modals/get-started-modal";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Register as a recycler", href: "/recyclers/register" },
  { name: "Contact us", href: "/contact" },
  { name: "Blog", href: "/blog" },
];
const Header = () => {
  const { isConnected } = useAccount();
  return (
    <nav className="w-full px-5 md:px-10 lg:px-[100px] py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-4xl font-semibold text-brandGreen font-londrina"
        >
          Greencycle+
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-dms_sans">
          <Link href="/" className="text-brandText font-medium">
            Home
          </Link>
          <Link href="/recyclers/register" className="text-[#797979] hover:text-gray-900">
            Register as a Recycler
          </Link>
          <Link href="/contact" className="text-[#797979] hover:text-gray-900">
            Contact us
          </Link>
          <Link href="/blog" className="text-[#797979] hover:text-gray-900">
            Blog
          </Link>
        </div>

        {isConnected ? <Button className="bg-[#228B22] text-white px-0 py-5 rounded-[24px] font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors"><w3m-account-button balance="hide"/> </Button>: <w3m-connect-button/>}

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden text-gray-500 hover:text-gray-900">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#F8FFF8]">
              <SheetHeader>
                <SheetTitle className="text-white" />
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-2">
                {navigationItems.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href="#"
                      className="flex items-center px-3 py-2 text-base font-medium text-brandText font-dms_sans hover:text-black "
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header;
