import type { Metadata } from "next";
import localFont from "next/font/local";
import {ClerkProvider,  SignInButton,  SignedIn,  SignedOut,  UserButton} from '@clerk/nextjs'

import { ModalProvider } from "@/providers/modal-provider";

import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bogota Artesanias",
  description: "Dashboard de administración de Bogota Artesanias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className="font-geist-sans bg-white text-black">
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

/* Es el pedazo de código que ejecuta cuando el usuario está logueado
<SignedOut>
            <SignInButton />
          </SignedOut>
<SignedIn>
            <UserButton />
          </SignedIn>
*/
