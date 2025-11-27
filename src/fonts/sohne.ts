import localFont from "next/font/local";

export const SohneHalbfett = localFont({
    src: [
        {
            path: "./sohnebreit-halbfett.woff2",
            weight: "600",
            style: "normal",
        },
    ],
    variable: "--font-sohne-halbfett",
    display: "swap", // Show fallback font immediately, swap when custom font loads
});
