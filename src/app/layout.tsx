import Header from "@/components/Header";
import "./globals.css";
import { Montserrat, Titillium_Web } from "next/font/google";
import { isContext } from "vm";

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

export const metadata = {
  title: "Quiz App",
  description: "Challenge your friends!",
  icons: {
    icon: "/favicon.svg",
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
