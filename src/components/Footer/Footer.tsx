import {
  Truck,
  Wallet,
  RefreshCcw,
  Mail,
  ShieldCheck,
  Phone,
  Map,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo/Logo";

const features = [
  {
    title: "Free delivery",
    description:
      "Get your orders delivered to your doorstep for free. Shop with us and enjoy hassle-free shipping on every purchase.",
    icon: Truck,
  },
  {
    title: "Online Payment",
    description:
      "Experience hassle-free online payments with secure and convenient options. Pay quickly and effortlessly with your method.",
    icon: Wallet,
  },
  {
    title: "Easy Return",
    description:
      "Enjoy easy returns within 30 days of purchase. Use our prepaid label or visit any store for a quick refund or exchange!",
    icon: RefreshCcw,
  },
];

const contactInfo = [
  { icon: Map, text: "Maharai-farm, Jaipur (RJ)" },
  { icon: Phone, text: "+1-613-598-6981" },
  { icon: Mail, text: "johndoe@gmail.com" },
];

const pagesLinks = [
  "About Us",
  "Contact Us",
  "Terms & Conditions",
  "Privacy Policy",
];
const shopLinks = [
  "Men",
  "Women",
  "Accessories"
];
const accountLinks = [
  "Dashboard",
  "Orders",
  "Wishlist",
];

export default function Footer() {
  return (
    <footer className="bg-accent dark:bg-gray-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className={`space-y-6 p-6 ${idx === 0
                ? "sm:border-e"
                : idx === 1
                  ? "max-sm:border-t md:border-e"
                  : "max-md:border-t sm:max-md:col-span-2"
                }`}
            >
              <div className="flex justify-center items-center">
                <Icon className="h-8 w-8 text-muted-foreground text-primary dark:text-white" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <h6 className="text-xl font-semibold text-primary">{feature.title}</h6>
                <p className="text-center">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact / Info Section */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 sm:py-16 md:py-24 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-8">
          <Logo />
          <div className="space-y-3">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{info.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-xl font-semibold text-primary">Pages</div>
          <ul className="text-muted-foreground space-y-3">
            {pagesLinks.map((link, idx) => (
              <li key={idx}>
                <Link className="text-sm font-medium hover:text-primary" href="#">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-xl font-semibold text-primary">Shop</div>
          <ul className="text-muted-foreground space-y-3">
            {shopLinks.map((link, idx) => (
              <li key={idx}>
                <Link className="text-sm font-medium hover:text-primary" href="#">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-xl font-semibold text-primary">Account</div>
          <ul className="text-muted-foreground space-y-3">
            {accountLinks.map((link, idx) => (
              <li key={idx}>
                <Link className="text-sm font-medium hover:text-primary" href="#">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center font-medium text-balance">
          ©2025 <Link href="/">parth</Link>, Made with ❤️ by thewinterlabs.
        </p>
      </div>
    </footer>
  );
}