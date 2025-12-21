"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { Menu, Home, User, BookOpen, Mail, LayoutDashboard, LogOut, LogIn, UserPlus } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

import { Skeleton } from "@/components/ui/skeleton"

export function Navbar() {
    const { data: session, isPending } = authClient.useSession()
    const router = useRouter()

    console.log(session)

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login")
                },
            },
        })
    }

    const navItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/about", label: "About", icon: User },
        { href: "/blog", label: "Blog", icon: BookOpen },
        { href: "/contact", label: "Contact", icon: Mail },
        ...(session ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] : []),
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative">
                            <Image
                                src="/images/logo.png"
                                alt="BlogSpace Logo"
                                width={130}
                                height={120}
                                className="object-contain h-auto"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="transition-colors hover:text-primary text-muted-foreground"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {isPending ? (
                        <div className="hidden md:flex items-center gap-4">
                            <Skeleton className="h-9 w-20" />
                            <Skeleton className="h-9 w-20" />
                        </div>
                    ) : session ? (
                        <Button variant="ghost" size="sm" onClick={handleSignOut} className="hidden md:flex">
                            Sign out
                        </Button>
                    ) : (
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button size="sm">Sign up</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle className="text-left flex items-center gap-2">
                                        <Image
                                            src="/images/logo.png"
                                            alt="BlogSpace Logo"
                                            width={100}
                                            height={40}
                                            className="object-contain"
                                        />
                                        <span className="sr-only">Navigation Menu</span>
                                    </SheetTitle>
                                    <SheetDescription className="sr-only">
                                        Navigation menu for mobile devices
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 mt-8">
                                    <nav className="flex flex-col gap-2">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-4 px-2 py-3 text-lg font-medium transition-colors hover:bg-muted hover:text-foreground rounded-md text-muted-foreground"
                                            >
                                                <item.icon className="h-5 w-5" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </nav>
                                    <div className="border-t pt-6">
                                        {isPending ? (
                                            <div className="flex flex-col gap-3">
                                                <Skeleton className="h-11 w-full" />
                                                <Skeleton className="h-11 w-full" />
                                            </div>
                                        ) : !session ? (
                                            <div className="flex flex-col gap-3">
                                                <Link href="/auth/login">
                                                    <Button variant="outline" className="w-full justify-start gap-2 h-11 text-base">
                                                        <LogIn className="h-5 w-5" />
                                                        Log in
                                                    </Button>
                                                </Link>
                                                <Link href="/auth/register">
                                                    <Button className="w-full justify-start gap-2 h-11 text-base">
                                                        <UserPlus className="h-5 w-5" />
                                                        Sign up
                                                    </Button>
                                                </Link>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                onClick={handleSignOut}
                                                className="w-full justify-start gap-2 h-11 text-base text-red-500 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="h-5 w-5" />
                                                Sign out
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
