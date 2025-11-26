import { Logo } from "../Logo/Logo";
import AccountDropdown from "./AccountDropdown";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/components/Cart";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Navbar() {
  const payload = await getPayload({ config: configPromise })

  const header = await payload.findGlobal({
    slug: "header",
    depth: 2,
  });

  return (
    <nav className="border-b bg-background/80 backdrop-blur-2xl sticky top-0 z-50">
      <div className="px-6 grid grid-cols-2 lg:grid-cols-3 items-center py-4">

        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden lg:flex justify-center items-center gap-8">
          {header?.items?.map((item) => (
            <a href={item.page?.slug} key={item.id} className="font-medium hover:text-primary text-md">{item.label}</a>
          ))}
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
