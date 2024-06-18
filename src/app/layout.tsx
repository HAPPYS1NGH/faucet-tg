import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TmaSDKProvider } from "@/components/tma";
import "@rainbow-me/rainbowkit/styles.css";
const Header = dynamic(() => import("@/components/shared/Header"), {
  ssr: false,
});
import Footer from "@/components/shared/Footer";
const inter = Inter({ subsets: ["latin"] });
import Web3ModalProvider from "@/context";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "My Telegram Mini App",
  description: "A mini app for Telegram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-navy text-white`}>
        <TmaSDKProvider>
          <Web3ModalProvider>
            <Header />
            {children}
            <Footer />
          </Web3ModalProvider>
        </TmaSDKProvider>
      </body>
    </html>
  );
}
