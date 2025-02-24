"use client";

import { UserButton } from "@/components/user-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <div className="flex items-center p-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu />
      </Button>
      <div className="flex w-full justify-end items-center gap-x-3">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
}
