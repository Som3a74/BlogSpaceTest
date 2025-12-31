"use client"

import { Button } from "@/components/ui/button"
import { Home, BookOpen, Mail, LayoutDashboard } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { NavItems } from "./_components/NavItems"
import { UserMenu } from "./_components/UserMenu"
import { MobileMenu } from "./_components/MobileMenu"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Navbar() {
    const { data: session, isPending } = authClient.useSession()
    const router = useRouter()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login")
                },
            },
        })
    }

    const user = session?.user

    const navItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/blog", label: "Blog", icon: BookOpen },
        { href: "/contact", label: "Contact", icon: Mail },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                        <div className="relative w-24 md:w-32">
                            <Image
                                src="/images/logo.png"
                                alt="DevJournal Logo"
                                width={130}
                                height={120}
                                className="object-contain h-auto w-full"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <NavItems items={navItems} />

                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle />
                    {isPending ? (
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    ) : session ? (
                        <div className="flex items-center gap-2">
                            {user && <UserMenu user={user} onSignOut={handleSignOut} />}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex items-center gap-2 md:gap-4">
                                <Link href="/auth/login">
                                    <Button variant="ghost" size="sm" className="hidden md:flex">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button size="sm">Sign up</Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center">
                        <MobileMenu items={navItems} session={session} isPending={isPending} />
                    </div>
                </div>
            </div>
        </header>
    )
}
