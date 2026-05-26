import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const josefin = Josefin_Sans({ 
  subsets: ["latin"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "King's Real Estate - Find Your Dream Home",
  description: "Premium real estate properties in Nairobi and Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefin.variable} font-sans`}>
        <Navbar />
        <main className="pt-22"> 
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
