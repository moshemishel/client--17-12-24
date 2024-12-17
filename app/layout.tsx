'use client';
import { ReactNode } from "react";
import MainNavBar from "../components/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
export default function RootLayout({ children }: { children: ReactNode }) {
  const pathName: string = usePathname();
  const isCheckoutPage = pathName.startsWith('/checkout');

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
      </head>
      
      <body>
        {!isCheckoutPage ?
        <AuthProvider>
        <MainNavBar />
        <main style={{paddingTop: '75px'}}>{children}</main>
        </AuthProvider>
        :
        <main >{children}</main>
      }
      </body>
    </html>
  );
}