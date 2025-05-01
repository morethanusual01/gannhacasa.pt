import { Fira_Code as FontMono, Inter as FontSans, Poppins as FontLogo } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Added Poppins for the logo
export const fontLogo = FontLogo({
  subsets: ["latin"],
  weight: ["600", "700"], // Include needed weights (semibold, bold)
  variable: "--font-logo",
});
