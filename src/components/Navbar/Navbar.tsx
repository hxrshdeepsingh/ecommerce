import { Logo } from "../Logo/Logo";
import AccountDropdown from "./AccountDropdown";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/components/Cart";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  List,
} from "lucide-react";

export const NAVBAR_CONFIG = {
  topBar: {
    welcomeText: "Welcome to our online store!",
    contacts: [
      {
        label: "+91 919376152461",
        href: "tel:+91919376152461",
        icon: Phone,
      },
      {
        label: "+91 98765 43210",
        href: "https://wa.me/919876543210",
        icon: MessageCircle,
      },
      {
        label: "contact@parthinfotechs.in",
        href: "mailto:contact@parthinfotechs.in",
        icon: Mail,
      },
      {
        label: "Manasarovar, Jaipur, Rajasthan, India",
        href: "https://maps.app.goo.gl/LVZabv75qGADhfh18",
        icon: MapPin,
      },
    ],
  },

  mainActions: {
    showCategoryButton: true,
    categoryIcon: List,
  },

  bottomMenu: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};


export default function Navbar() {
  const { topBar, mainActions, bottomMenu } = NAVBAR_CONFIG;

  return (
    <nav className="sticky top-0 z-50 flex flex-col bg-primary text-primary-foreground">

      {/* ==== TOP BAR ==== */}
      <div className="hidden lg:block">
        <div className="container flex justify-between items-center py-3 text-xs font-medium">

          <p>{topBar.welcomeText}</p>

          <div className="flex items-center gap-6">
            {topBar.contacts.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==== MAIN HEADER ==== */}
      <div className="bg-white backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-12 items-center gap-4 py-4 border-b">

            {/* LOGO */}
            <div className="col-span-1 lg:col-span-3 flex items-center">
              <Logo />
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex lg:col-span-9 justify-end items-center gap-6">
              {mainActions.showCategoryButton && (
                <Button variant="outline" className="bg-accent text-primary p-0">
                  <mainActions.categoryIcon className="w-4 h-4" />
                </Button>
              )}

              <ThemeToggle />
              <Cart />
              <Separator orientation="vertical" className="h-6" />
              <AccountDropdown />
            </div>

            {/* MOBILE ACTIONS */}
            <div className="flex lg:hidden col-span-1 justify-end items-center gap-4">
              <ThemeToggle />
              <Cart />
              <MobileNav />
            </div>
          </div>
        </div>
      </div>

      {/* ==== BOTTOM NAVIGATION ==== */}
      <div className="hidden lg:block bg-primary text-primary-foreground">
        <div className="container flex gap-10 py-3">
          {bottomMenu.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold tracking-wide uppercase hover:text-accent transition-colors"
    >
      {label}
    </Link>
  );
}


