// src/globals/Defaults.ts

import type { GlobalConfig } from "payload";

export const Defaults: GlobalConfig = {
    slug: "defaults",
    label: "Defaults",
    admin: {
        group: "Settings",
        description: "Default settings for the website.",
    },

    fields: [
        // -----------------------------
        // BASIC BRANDING
        // -----------------------------
        {
            name: "siteName",
            label: "Website Name",
            type: "text",
            required: true,
        },
        {
            name: "siteTagline",
            label: "Tagline",
            type: "text",
        },

        {
            name: "logo",
            label: "Logo (Light Mode)",
            type: "upload",
            relationTo: "media",
            required: false,
        },
        {
            name: "logoDark",
            label: "Logo (Dark Mode)",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "favicon",
            label: "Favicon",
            type: "upload",
            relationTo: "media",
        },

        {
            name: "ogImage",
            label: "Default OG Image",
            type: "upload",
            relationTo: "media",
        },

        // -----------------------------
        // CONTACT INFORMATION
        // -----------------------------
        {
            name: "contactEmail",
            label: "Contact Email",
            type: "email",
        },
        {
            name: "contactPhone",
            label: "Phone Number",
            type: "text",
        },
        {
            name: "address",
            label: "Address",
            type: "textarea",
        },

        // -----------------------------
        // SOCIAL LINKS
        // -----------------------------
        {
            name: "socialLinks",
            label: "Social Links",
            type: "array",
            fields: [
                {
                    name: "platform",
                    label: "Platform",
                    type: "text",
                },
                {
                    name: "url",
                    label: "URL",
                    type: "text",
                },
            ],
        },

        // -----------------------------
        // SEO DEFAULTS
        // -----------------------------
        {
            type: "group",
            name: "seo",
            label: "Default SEO Settings",
            fields: [
                {
                    name: "metaTitle",
                    label: "Default Meta Title",
                    type: "text",
                },
                {
                    name: "metaDescription",
                    label: "Meta Description",
                    type: "textarea",
                },
                {
                    name: "keywords",
                    label: "Keywords",
                    type: "text",
                },
            ],
        },

        // -----------------------------
        // DEFAULT CTA BUTTONS
        // -----------------------------
        {
            name: "defaultButtons",
            label: "Default CTA Buttons",
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

        // -----------------------------
        // UI SETTINGS
        // -----------------------------
        {
            name: "themeMode",
            label: "Default Theme Mode",
            type: "select",
            defaultValue: "light",
            options: [
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
                { label: "System", value: "system" },
            ],
        },

        {
            name: "showAnnouncementBar",
            label: "Show Announcement Bar",
            type: "checkbox",
            defaultValue: false,
        },
        {
            name: "announcementText",
            label: "Announcement Text",
            type: "text",
            admin: {
                condition: (data) => data.showAnnouncementBar === true,
            },
        },

        // -----------------------------
        // COPYRIGHT
        // -----------------------------
        {
            name: "copyright",
            label: "Copyright Text",
            type: "text",
            defaultValue: `© ${new Date().getFullYear()} All rights reserved.`,
        },
    ],
};
