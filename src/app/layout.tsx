
"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider, useCart } from "@/context/CartContext";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { CartDrawer } from "@/components/CartDrawer/CartDrawer";
import { Header } from "@/components/Header/Header";
import { Toaster } from 'react-hot-toast'; 

const inter = Inter({ subsets: ["latin"] });

function AppContent({ children }: { children: React.ReactNode }) {
  const { isCartOpen, isSidebarOpen, toggleSidebar } = useCart();

  return (
    <div className="relative min-h-screen bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex">
        <Sidebar />

      
        <div className={`
            flex-1 
            pl-0 md:pl-64 
            transition-all duration-300 ease-in-out
            ${isCartOpen ? 'pr-0 xl:pr-[28rem]' : 'pr-0'}
          `}
        >
          <Header />
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>

      <CartDrawer />
      <Toaster position="bottom-left" />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <CartProvider>
          <AppContent>{children}</AppContent>
        </CartProvider>
      </body>
    </html>
  );
}