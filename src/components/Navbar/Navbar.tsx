import { Logo } from "../Logo/Logo";
import AccountDropdown from "./AccountDropdown";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/components/Cart";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b bg-background/80 backdrop-blur-2xl sticky top-0 z-50">
      <div className="px-6 grid grid-cols-2 lg:grid-cols-3 items-center py-4">

        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden lg:flex justify-center items-center gap-8">
          <Link href="/" className="font-medium hover:text-primary text-md">Home</Link>
          <Link href="/shop" className="font-medium hover:text-primary text-md">Shop</Link>
          <Link href="/about" className="font-medium hover:text-primary text-md">About</Link>
          <Link href="/contact" className="font-medium hover:text-primary text-md">Contact</Link>
        </div>

        <div className="hidden lg:flex justify-end items-center gap-4">
          <ThemeToggle />
          <Cart />
          <Separator orientation="vertical" className="h-6" />
          <AccountDropdown />
        </div>

        <div className="flex lg:hidden justify-end">
          <MobileNav />
        </div>

      </div>
    </nav>
  );
}

export const revalidate = 300;
