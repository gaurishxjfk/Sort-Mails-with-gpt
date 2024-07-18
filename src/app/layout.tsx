import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";

export const metadata: Metadata = {
  title: "Sort My Mails",
  description:
    "Sort My Mails is an application which fetches your emails and classify them into categories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className="bg-gray-300">{children}</body>
      </html>
    </SessionWrapper>
  );
}
