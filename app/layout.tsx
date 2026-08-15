import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Archly",
  description: "A blogging platform for developers and tech enthusiasts to share their knowledge, ideas, and experiences with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={poppins.className}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
