// RootLayout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter , DM_Sans, Londrina_Solid} from "next/font/google";
import { headers } from "next/headers";
import Header from "./_components/Header";

const inter = Inter({ subsets: ["latin"], variable:"--font-inter" });
const dms_sans = DM_Sans({ subsets: ["latin"], variable:"--font-dms_sans" });
const londrina = Londrina_Solid({
variable:"--font-londrina",
weight:"400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextjs AppKit Starter",
  description: "AppKit by reown",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookies = await headers();
  // const cookie = cookies.get("cookie") ?? "";
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dms_sans.variable} ${londrina.className}`}>
      <div className="min-h-screen max-w-[1440px] mx-auto bg-[#F8FFF8]">
        <Header/>
   {children}
   </div>
      </body>
    </html>
  );
}
