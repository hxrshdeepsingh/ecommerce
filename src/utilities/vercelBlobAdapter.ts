'use server'
import { put, del } from "@vercel/blob";
import type { GeneratedAdapter } from "payload";

export const vercelBlobAdapter = (): GeneratedAdapter => {
    return {
        async upload({ data, filename }) {
            const blob = await put(filename, data, { access: "public" });
            return {
                filename,
                url: blob.url,
            };
        },

        async delete({ filename }) {
            await del(filename);
        },
    };
};
