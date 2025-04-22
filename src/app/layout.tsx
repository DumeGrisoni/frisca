import localFont from "next/font/local";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./app.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import ReactLenis from "lenis/react";
import Footer from "@/components/Footer";

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  variable: "--font-alpino",
  display: "swap",
  weight: "100 900",
});

<script
  async
  defer
  src="https://static.cdn.prismic.io/prismic.js?new=true&repo=your-repo-name"
></script>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`scroll-smooth ${alpino.variable}`}>
      <ReactLenis root>
        <body className="overflow-x-hidden bg-yellow-300">
          <Header />
          <main>
            {children}
            <ViewCanvas />
          </main>
          <footer>
            <Footer />
          </footer>
        </body>
        <PrismicPreview repositoryName={repositoryName} />
      </ReactLenis>
    </html>
  );
}
