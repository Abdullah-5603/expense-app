import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import './globals.scss'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: 'ExpenseTrack - Personal Expense Manager',
  description: 'Track and manage your expenses with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
