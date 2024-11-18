// RootLayout.tsx
import "../globals.css";
import type { Metadata } from "next";
import Header from "./_components/Header";


export const metadata: Metadata = {
  title: "Green Cycle Plus || Home",
  description: "Turn your waste into wealth and make the environment and the world a better place for us all to live in recycling one waste at a time",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto bg-[#F8FFF8]">
      <Header/>
      {children}
   </div>
  );
}
