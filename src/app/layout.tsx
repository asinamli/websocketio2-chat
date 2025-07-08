// app/layout.tsx
import Link from "next/link";
import "./globals.css"; 

export const metadata = {
  title: "Socket Chat",
  description: "Next.js + Socket.IO Chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="m-0 p-0">
        <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
          <div className="font-bold text-lg">
            <Link href="/">Socket Chat</Link>
          </div>
          <div className="space-x-4">
            <Link href="/">Odaya Katıl</Link>
            <Link href="/admin/login">Admin Giriş</Link>
          </div>
        </nav>
        <main >{children}</main>
      </body>
    </html>
  );
}
