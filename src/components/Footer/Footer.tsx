import {
  Truck,
  Wallet,
  RefreshCcw,
  Mail,
  Phone,
  Map,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo/Logo";

const features = [
  {
    title: "Free & Fast Delivery",
    description:
      "Get your security products delivered quickly and at no extra cost. Enjoy seamless and reliable shipping on every CCTV purchase.",
    icon: Truck,
  },
  {
    title: "Secure Online Payments",
    description:
      "Make safe and smooth payments with our encrypted checkout system. Choose from multiple trusted payment options with full confidence.",
    icon: Wallet,
  },
  {
    title: "Easy Returns",
    description:
      "Shop worry-free with our 7-day easy return policy. If something doesn’t fit your needs, request a return or exchange effortlessly.",
    icon: RefreshCcw,
  }
];


const contactInfo = [
  { icon: Map, text: "Maharai Farm, Jaipur, Rajasthan" },
  { icon: Phone, text: "+91 98XXXXXXXX" },
  { icon: Mail, text: "support@yourcctvstore.com" },
];


const pagesLinks = [
  "About Us",
  "Contact Us",
  "Installation Services",
  "Terms & Conditions",
  "Privacy Policy",
];

const shopLinks = [
  "CCTV Cameras",
  "DVR & NVR Systems",
  "Smart Door Cameras",
  "WiFi Cameras",
  "Security Accessories",
];

const accountLinks = [
  "Dashboard",
  "My Orders",
  "Wishlist",
  "Account Settings",
];


export default function Footer() {
  return (
    <footer className="bg-accent dark:bg-gray-900">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
                <p className="text-center text-sm">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact / Info Section */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 sm:py-16 md:py-24 lg:grid-cols-4 lg:px-6">

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

        <div className="flex justify-end">
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
        </div>

        <div className="flex justify-end">
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
        </div>

        <div className="flex justify-end">
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

      </div>

      <div className="mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center font-medium text-balance">
          ©2025 <Link href="/">parth</Link>, Made with ❤️ by thewinterlabs.
        </p>
      </div>
    </footer>
  );
}