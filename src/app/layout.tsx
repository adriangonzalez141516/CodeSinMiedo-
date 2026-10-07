import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevProfesor | Aprende a Programar desde Cero sin Frustración",
    template: "%s | DevProfesor"
  },
  description: "Plataforma didáctica con micro-lecciones, apuntes interactivos y 3 perspectivas explicativas (Visual, Lógica y Técnica). Aprende Java desde cero paso a paso.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar courseId="java-zero-to-hero" />
        {children}
        <Footer courseId="java-zero-to-hero" />
      </body>
    </html>
  );
}
