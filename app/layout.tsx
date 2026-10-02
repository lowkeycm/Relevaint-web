import type { Metadata } from "next";
import {siteUrl} from "@/lib/site-url";
import "./globals.css";
import "./redesign.css";
import "./service-world.css";
import "./service-media.css";
import "./purposeful-depth.css";
import "./copy-review.css";
import "./journey-interactions.css";
import "./journey-film.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...(process.env.RELEVAINT_REVIEW === "1" ? {robots:{index:false,follow:false}} : {}),
  openGraph:{type:"website",siteName:"Relevaint",locale:"en_US",images:[{url:"/media/business-neighborhood.webp",width:1536,height:1024,alt:"Relevaint: your business, improved"}]},
  title: "Relevaint | Video ads, websites, CRM & follow-up",
  description: "Relevaint creates video ads, builds websites, and sets up customer management and follow-up systems for small businesses. One project or a connected system.",
  icons: {
    icon: [{url:"/favicon-relevaint.png",type:"image/png",sizes:"48x48"},{url:"/favicon.ico?v=2",sizes:"16x16 32x32 48x48"}],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
