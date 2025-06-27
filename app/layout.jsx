import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Playlist } from "./ui/playlist";

export const metadata = {
  title: "VK Music Player",
  description: "Easy, fast and comfortable player to listen music from VK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Playlist /> */}
        {children}
      </body>
    </html>
  );
}
