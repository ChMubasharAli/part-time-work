"use client";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
