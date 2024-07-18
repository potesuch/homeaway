import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/NavBar";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import AddPropertyModal from "./components/modals/AddPropertyModal";
import ClientWrapper from "./components/ClientWrapper";
import SearchModal from "./components/modals/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeAway",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          <Navbar />

          <div className="pt-32">
            {children}
          </div>

          <LoginModal />
          <SignupModal />
          <AddPropertyModal />
          <SearchModal />
        </ClientWrapper>
      </body>
    </html>
  );
}
