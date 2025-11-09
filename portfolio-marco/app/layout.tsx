import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc Xavier Marques - Développeur Full Stack | Portfolio",
  description: "Portfolio de Marc Xavier Marques, développeur web full stack passionné. Étudiant en 2e année à la Web@cadémie by Epitech, spécialisé en React, Next.js, Laravel et Node.js.",
  keywords: ["développeur web", "full stack", "React", "Next.js", "Laravel", "Portfolio", "Web@cadémie", "Epitech"],
  authors: [{ name: "Marc Xavier Marques" }],
  creator: "Marc Xavier Marques",
  publisher: "Marc Xavier Marques",
  openGraph: {
    title: "Marc Xavier Marques - Développeur Full Stack",
    description: "Portfolio de Marc Xavier Marques, développeur web full stack passionné",
    url: "https://marcxavier.dev",
    siteName: "Portfolio Marc Xavier",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Xavier Marques - Développeur Full Stack",
    description: "Portfolio de Marc Xavier Marques, développeur web full stack passionné",
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
  verification: {
    google: "verification_token", // À remplacer par le vrai token Google
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link 
          rel="preload" 
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" 
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" 
          media="all"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
