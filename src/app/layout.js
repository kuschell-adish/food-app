import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weights: ["300", "400", "600"],
});

export const metadata = {
  title: "Acai Bowl Co.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${libreFranklin.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
