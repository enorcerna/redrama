import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/app.css";
import Header from "@/layouts/Header";
import Respve from "@/components/global/Respve";
import Footer from "@/layouts/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Redrama",
  description: "Miles de kdramas para disfrutar"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
    >
      <head>
        <link
          rel="icon"
          href="/logo.svg"
          type="svg"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <Respve>{children}</Respve>
        <Footer />
      </body>
    </html>
  );
}
