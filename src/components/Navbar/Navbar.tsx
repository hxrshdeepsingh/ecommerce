"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User, ShoppingBag } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { Logo } from "../Logo/Logo";

import { Cart } from "@/components/Cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-background/80 backdrop-blur-2xl sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                href="/shop"
                className="font-medium hover:text-primary text-sm"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="font-medium hover:text-primary text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="font-medium hover:text-primary text-sm"
              >
                Contact
              </Link>
              <Link
                href="/Contact"
                className="font-medium hover:text-primary text-sm"
              >
                Orders
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-6 text-primary">
          {/* ACCOUNT MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User size={18} />
                Account <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/orders">Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/wishlist">Wishlist</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Cart />
        </div>

        {/* MOBILE MENU BUTTON */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost">
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 sm:w-80">
            <div className="flex flex-col gap-6 mt-4">
              <Link
                href="/"
                className="text-xl font-bold"
                onClick={() => setOpen(false)}
              >
                ShopMart
              </Link>

              {/* Mobile Links */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-semibold mb-1">Shop</p>
                  <div className="pl-3 space-y-1 text-sm">
                    <Link href="/men" onClick={() => setOpen(false)}>
                      Men
                    </Link>
                    <br />
                    <Link href="/women" onClick={() => setOpen(false)}>
                      Women
                    </Link>
                    <br />
                    <Link href="/accessories" onClick={() => setOpen(false)}>
                      Accessories
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-1">Pages</p>
                  <div className="pl-3 space-y-1 text-sm">
                    <Link href="/about" onClick={() => setOpen(false)}>
                      About Us
                    </Link>
                    <br />
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Contact
                    </Link>
                    <br />
                    <Link href="/faq" onClick={() => setOpen(false)}>
                      FAQ
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-1">Account</p>
                  <div className="pl-3 space-y-1 text-sm">
                    <Link href="/account" onClick={() => setOpen(false)}>
                      Dashboard
                    </Link>
                    <br />
                    <Link href="/orders" onClick={() => setOpen(false)}>
                      Orders
                    </Link>
                    <br />
                    <Link href="/wishlist" onClick={() => setOpen(false)}>
                      Wishlist
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/cart" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  <ShoppingBag size={18} className="mr-2" />
                  Cart
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
