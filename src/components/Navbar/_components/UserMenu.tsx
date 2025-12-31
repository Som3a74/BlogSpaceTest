import Link from "next/link"
import { User, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserMenuProps {
    user: {
        name: string
        email: string
        image?: string | null
        role?: string
    }
    onSignOut: () => void
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
    const isAdminOrAuthor = user.role === "ADMIN" || user.role === "AUTHOR"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                    <Avatar className="size-9">
                        <AvatarImage className="object-cover" loading="lazy" src={user.image || ""} alt={user.name || ""} />
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">
                            {user.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                {isAdminOrAuthor && (
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={onSignOut}
                    className="cursor-pointer flex items-center gap-2 text-red-500 focus:text-red-500 focus:bg-red-50"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
