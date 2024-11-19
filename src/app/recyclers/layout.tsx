import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recycler || Green Cycle Plus",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="">{children}</div>
  );
}
