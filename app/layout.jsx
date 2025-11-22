import "../styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "SBRAT",
  description: "Platform Stiker ala TikTok + WA Pack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <Navbar />
        {children}

        <footer className="text-center opacity-60 text-sm mt-10 mb-4">
          Made with ❤️ by Rafzhost (Rafflie Aditya)
        </footer>
      </body>
    </html>
  );
}