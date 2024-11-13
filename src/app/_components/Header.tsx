import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Contact us", href: "/contact" },
  { name: "Blog", href: "/blog" },
];
const Header = () => {
  return (
    <nav className="w-full px-5 md:px-10 lg:pl-[100px] lg:pr-[68px] py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-4xl font-semibold text-brandGreen font-londrina"
        >
          Greencycle
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-dms_sans">
          <Link href="/" className="text-brandText font-medium">
            Home
          </Link>
          <Link href="/contact" className="text-[#797979] hover:text-gray-900">
            Contact us
          </Link>
          <Link href="/blog" className="text-[#797979] hover:text-gray-900">
            Blog
          </Link>
        </div>

        <button className="hidden md:block bg-[#228B22] text-white px-6 py-2 rounded-full font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors">
          Get started
        </button>

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
