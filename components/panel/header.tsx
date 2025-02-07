"use client"
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../theme-provider/mode-toggle";

interface HeaderProps {
  children?: React.ReactNode; // Allow dynamic content (like breadcrumbs)
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 rounded-xl m-3 shadow-md border">
      <div className="flex justify-between w-full mr-4">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {children}
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
