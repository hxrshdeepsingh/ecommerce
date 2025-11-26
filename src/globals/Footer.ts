// src/globals/Footer.ts
import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
    slug: "footer",
    label: "Footer",
    admin: {
        group: "Settings",
    },

    fields: [
        // -----------------------------
        // Feature Cards
        // -----------------------------
        {
            name: "features",
            label: "Features",
            type: "array",
            required: true,
            minRows: 1,
            fields: [
                {
                    name: "title",
                    type: "text",
                    required: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    required: true,
                },
                {
                    name: "icon",
                    type: "select",
                    required: true,
                    options: [
                        { label: "Truck", value: "truck" },
                        { label: "Wallet", value: "wallet" },
                        { label: "Refresh", value: "refresh" },
                        { label: "Shield Check", value: "shield-check" },
                        { label: "Map", value: "map" },
                        { label: "Phone", value: "phone" },
                        { label: "Mail", value: "mail" },
                    ],
                },
            ],
        },

        // -----------------------------
        // Footer Link Sections
        // -----------------------------
        {
            name: "linkSections",
            label: "Link Sections",
            type: "array",
            minRows: 1,
            fields: [
                {
                    name: "title",
                    type: "text",
                    required: true,
                },
                {
                    name: "links",
                    type: "array",
                    fields: [
                        {
                            name: "label",
                            type: "text",
                        },
                        {
                            name: "url",
                            type: "text",
                        },
                    ],
                },
            ],
        },

        // -----------------------------
        // Copyright
        // -----------------------------
        {
            name: "copyright",
            type: "text",
            defaultValue: `© ${new Date().getFullYear()} All rights reserved.`,
        },
    ],
};
