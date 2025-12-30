import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: "Millionaire Summit 2027 | Executives Collaboration",
    description: "Join the most exclusive summit for the elite in 2027. Grandeur, Elegance, and Collaboration.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
