import { Metadata } from "next";
import { StepSidebar } from "./_components/step-sidebar";

export const metadata: Metadata = {
  title: "Register Recycler || Green Cycle Plus",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <main>
        {children}
   </main>
  );
}
