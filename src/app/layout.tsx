import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "ImmoClair",
  description: "Copilote belge de gestion immobilière pour propriétaires bailleurs"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr-BE">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
