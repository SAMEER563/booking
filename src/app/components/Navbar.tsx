"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Workspace<span className="text-gray-800">Book</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <NavItem href="/rooms" text="Rooms" />
          <NavItem href="/admin" text="Goto Admin Panel" />
     
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm p-4 space-y-3 text-gray-700">
          <MobileItem href="/rooms" text="Rooms" />
          <MobileItem href="/admin" text="Goto Admin Panel" />
         
        </div>
      )}
    </header>
  );
}

function NavItem({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-blue-600 transition relative group"
      >
        {text}
        {/* Hover underline animation */}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </li>
  );
}

function MobileItem({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="block w-full py-2 text-gray-800 font-medium border-b last:border-b-0 border-gray-200"
    >
      {text}
    </Link>
  );
}
