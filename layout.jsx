// app/layout.jsx
import "./globals.css";
import Providers from "../components/Providers"; // adjust path if needed

export const metadata = {
  title: "Client Dashboard",
  description: "Advanced dashboard with NextAuth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
