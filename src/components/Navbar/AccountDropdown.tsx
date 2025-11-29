import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from "lucide-react"
import { headers as getHeaders } from 'next/headers.js'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Button } from "../ui/button"

import { getPayloadClient } from '@/utilities/getPayloadCached';
import { getCachedUser } from '@/utilities/getCachedUser';

export default async function AccountDropdown() {
    // const headers = await getHeaders()
    // const payload = await getPayload({ config: configPromise }) 
    // const { user } = await payload.auth({ headers })

    const headers = await getHeaders();
    const payload = await getPayloadClient();
    const user = await getCachedUser(payload, headers);

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link href="/login">
                    <Button>Log in</Button>
                </Link>
                <Separator orientation="vertical" className="h-6" />
                <Link href="/create-account">
                    <Button variant="outline">Sign Up</Button>
                </Link>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-2 rounded-lg'>
                <Avatar>
                    <AvatarImage src={'/media/user.gif'} />
                    <AvatarFallback className='text-sm'>
                        {user?.name?.[0] || "U"}
                    </AvatarFallback>
                </Avatar>

                <div className='flex flex-col gap-1 text-start leading-none'>
                    <span className='max-w-[17ch] truncate text-sm font-semibold'>
                        {user?.name}
                    </span>
                    <span className='text-muted-foreground max-w-[20ch] truncate text-xs'>
                        {user?.email}
                    </span>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='start' className='w-64'>
                <DropdownMenuLabel className="flex items-center gap-2">
                    <User size={16} /> My Account
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/account">Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
