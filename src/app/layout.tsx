import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/user-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  // themeColor: config.site.themeColor,
} satisfies Viewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="pocketplay">
      <body className={`${inter.className} bg-primary`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
