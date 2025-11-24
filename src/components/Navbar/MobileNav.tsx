"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Logo } from "../Logo/Logo";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Separator } from "@/components/ui/separator";

const mobileMenu = [
    {
        title: "Shop",
        links: [
            { label: "Men", href: "/men" },
            { label: "Women", href: "/women" },
            { label: "Accessories", href: "/accessories" },
        ],
    },
    {
        title: "Pages",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "FAQ", href: "/faq" },
        ],
    },
    {
        title: "Account",
        links: [
            { label: "Dashboard", href: "/account" },
            { label: "Orders", href: "/orders" },
            { label: "Wishlist", href: "/wishlist" },
        ],
    },
];

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="p-0">
                    <Menu size={44} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:w-80 px-6">
                <VisuallyHidden>
                    <h2>Mobile Navigation Menu</h2>
                </VisuallyHidden>
                <div className="flex flex-col gap-6 mt-4">
                    <div className="pb-2">
                        <Logo />
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-6">
                        {mobileMenu.map((section) => (
                            <div key={section.title} className="space-y-2">
                                <p className="font-semibold text-sm text-primary uppercase tracking-wide">
                                    {section.title}
                                </p>

                                <div className="pl-2 space-y-1 text-sm">
                                    {section.links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                            className="block px-2 py-1 rounded-md hover:bg-accent hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
