import type { Metadata } from "next";
import {siteUrl} from "@/lib/site-url";
import "./globals.css";
import "./redesign.css";
import "./service-world.css";
import "./service-media.css";
import "./purposeful-depth.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph:{type:"website",siteName:"Relevaint",locale:"en_US",images:[{url:"/media/business-neighborhood.webp",width:1536,height:1024,alt:"Relevaint: your business, improved"}]},
  title: "Relevaint | Websites, creative & connected systems",
  description: "Help the right customers see your value and take the next step. Websites, creative, and connected follow-up for established businesses.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
