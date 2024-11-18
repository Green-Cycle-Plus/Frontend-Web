// LandingPageLayout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter , DM_Sans, Londrina_Solid} from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable:"--font-inter" });
const dms_sans = DM_Sans({ subsets: ["latin"], variable:"--font-dms_sans" });
const londrina = Londrina_Solid({
  variable:"--font-londrina",
  weight:"400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Green Cycle Plus",
  description: "Turn your waste into wealth and make the environment and the world a better place for us all to live in recycling one waste at a time",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dms_sans.variable} ${londrina.className}`}>
        {children}
      </body>
    </html>
  );
}
