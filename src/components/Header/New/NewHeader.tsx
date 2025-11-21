"use client";

import React, { useState } from "react";
import { Menu, Search, Bell, ChevronDown, X } from "lucide-react";
import { Cart } from "@/components/Cart";
import { AccountAvatarMenu } from "@/components/AccountNav/accountAvatarMenu";
import Link from "next/link";
import { Logo } from "@/components/Logo/Logo";

function NewHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    "Dashboard",
    "Overview",
    "Layout",
    "Order",
    "Applications",
  ];

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      {/* Top Bar */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Left section: Menu + Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden flex items-center justify-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Logo />
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-md:hidden max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="w-full rounded-md border border-input bg-transparent px-3 pl-9 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/30"
            />
          </div>

          {/* Right section: icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile search button */}
            <button className="lg:hidden p-2 rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Search className="h-5 w-5" />
            </button>



            {/* Avatar */}
            <AccountAvatarMenu />

                        {/* Cart */}
            <Cart />
            
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Desktop only) */}
      <div className="bg-primary">
        <div className="hidden  lg:flex mx-auto max-w-7xl px-4 py-1.5 sm:px-6">
          <nav
            aria-label="Main"
            className="flex-1 flex items-center justify-center"
          >
            <ul className="flex items-center gap-1">
              {navigationItems.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-white group flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="absolute right-0 top-0 h-full w-64 bg-background shadow-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-accent dark:hover:bg-accent/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  className="text-left w-full px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default NewHeader;
