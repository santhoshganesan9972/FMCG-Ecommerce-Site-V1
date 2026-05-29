import type { Metadata } from "next";
import { AdminLayoutClient } from "./layout-client";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | FMCG Commerce",
    template: "%s | FMCG Commerce Admin",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
