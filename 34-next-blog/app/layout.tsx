import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { TanstackProvider } from "@/providers/tanstak.provider";
import { ToastifyProvider } from "@/providers/toastify.provider";

import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Ali Rajabi Nekoo Blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ToastifyProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </ToastifyProvider>
      </body>
    </html>
  );
}
