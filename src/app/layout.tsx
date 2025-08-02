import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GreenTrack - Build Greener Communities",
  description:
    "Track eco-friendly habits, connect with your community, and make a real impact on environmental sustainability through our gamified platform.",
  keywords: ["sustainability", "eco-friendly", "environment", "community", "green living", "carbon footprint"],
  authors: [{ name: "GreenTrack Team" }],
  openGraph: {
    title: "GreenTrack - Build Greener Communities",
    description:
      "Track eco-friendly habits, connect with your community, and make a real impact on environmental sustainability.",
    url: "https://greentrack.vercel.app",
    siteName: "GreenTrack",
    images: [
      {
        url: "/assets/screenshot.png",
        width: 1200,
        height: 630,
        alt: "GreenTrack Platform Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenTrack - Build Greener Communities",
    description:
      "Track eco-friendly habits, connect with your community, and make a real impact on environmental sustainability.",
    images: ["/assets/screenshot.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
