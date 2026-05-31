import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
