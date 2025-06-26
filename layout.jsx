// app/layout.jsx
import "./globals.css";
import Providers from "../components/Providers"; // adjust path if needed

export const metadata = {
  title: "Client Dashboard",
  description: "Advanced dashboard with NextAuth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
