import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import FloatingIngredients from "@/components/FloatingIngredients";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fat Kats | Pizza & Ice Cream",
  description: "The best pizza and ice cream in Redford.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <FloatingIngredients />
        {children}
      </body>
    </html>
  );
}
