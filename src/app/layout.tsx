import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Titillium_Web } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-titillium",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TUSSLE - Quiz Challenge App",
    template: "%s | TUSSLE",
  },
  description:
    "Challenge your friends with interactive quizzes across multiple categories",
  keywords: ["quiz", "challenge", "trivia", "friends", "education"],
  authors: [{ name: "Madhu U" }],
  creator: "Madhu U",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tussle-quiz.vercel.app/",
    siteName: "TUSSLE",
    title: "TUSSLE - Quiz Challenge App",
    description: "Challenge your friends with interactive quizzes",
    images: [
      {
        url: "/Mobile-demo.png",
        width: 1200,
        height: 630,
        alt: "TUSSLE Quiz App",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${montserrat.variable} ${titillium.variable}`}>
      <body>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
