import type { Metadata } from "next";
import "./globals.css";
import Header from "@/componentes/header/page";
import Footer from "@/componentes/footer/page";

export const metadata: Metadata = {
  title: "DevJobs",
  description: "Vagas para Desenvolvedores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
