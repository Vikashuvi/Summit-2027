import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomScrollbar from "@/components/CustomScrollbar";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-sans",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: "Millionaire Summit 2027 | Executives Collaboration",
    description: "Join the most exclusive summit for the elite in 2027. Grandeur, Elegance, and Collaboration.",
    icons: {
        icon: "/fav.png",
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

import NavBar from "@/components/NavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${playfair.variable} antialiased`}>
                <SmoothScrollProvider>
                    <NavBar />
                    <CustomScrollbar />
                    {children}
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
