"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-500 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          
          {/* BRAND */}
          <div>
            <h1 className="text-2xl font-bold text-blue-300">
              Workspace<span className="text-gray-100">Book</span>
            </h1>
            <p className="text-gray-200 mt-2 text-sm">
              Smart workspace booking made simple, fast & efficient.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Quick Links</h2>
            <ul className="mt-3 space-y-2 text-gray-200">
              <li><Link href="/" className="hover:text-blue-300 transition">Home</Link></li>
              <li><Link href="/rooms" className="hover:text-blue-300 transition">Rooms</Link></li>
              <li><Link href="/admin" className="hover:text-blue-300 transition">Admin Dashboard</Link></li>
             
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Follow Us</h2>
            <div className="flex items-center gap-4 mt-3">
              <Link href="#" className="text-gray-200 hover:text-blue-300 transition">
                <Facebook size={22} />
              </Link>
              <Link href="#" className="text-gray-200 hover:text-blue-300 transition">
                <Instagram size={22} />
              </Link>
              <Link href="#" className="text-gray-200 hover:text-blue-300 transition">
                <Linkedin size={22} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 border-t border-gray-500 pt-5 text-center text-sm text-gray-200">
          © {year} WorkspaceBook — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}