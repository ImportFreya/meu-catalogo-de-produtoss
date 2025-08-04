// app/layout.tsx
"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider, useCart } from "@/context/CartContext";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { CartDrawer } from "@/components/CartDrawer/CartDrawer";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

function AppContent({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useCart();

  return (
    <div className="bg-gray-100">
      {/* Overlay e Sidebar ficam aqui, como camadas independentes */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <Sidebar />
      <CartDrawer />
      <Toaster position="bottom-right" />

      {/* Container principal para o conteúdo da página */}
      <div className="flex flex-col min-h-screen md:pl-64">
        <Header />
        
        {/* O 'main' agora cresce para ocupar o espaço, empurrando o footer para baixo */}
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {children}
        </main>
        
        <Footer />
      </div>
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