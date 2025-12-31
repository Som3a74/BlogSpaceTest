import Link from "next/link"
import Image from "next/image"
import { Menu, LogIn, UserPlus, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItem {
    href: string
    label: string
    icon: LucideIcon
}

interface MobileMenuProps {
    items: NavItem[]
    session: any
    isPending: boolean
}

export function MobileMenu({ items, session, isPending }: MobileMenuProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-70 sm:w-87.5 flex flex-col p-0 border-l border-border/40">
                <SheetHeader className="px-6 py-8 border-b border-border/10 bg-muted/5">
                    <SheetTitle className="text-left flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-primary/10 flex items-center justify-center p-2">
                            <Image
                                src="/images/logo.png"
                                alt="DevJournal"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                            DevJournal
                        </span>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        Navigation menu
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-8">
                    <nav className="flex flex-col gap-2">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-4 py-3.5 text-base font-medium transition-all hover:bg-muted hover:text-primary rounded-2xl text-foreground/80 hover:translate-x-1 active:scale-[0.98]"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="p-4 mt-auto border-t border-border/40 bg-muted/20">
                    {!session && !isPending && (
                        <div className="flex flex-col gap-2">
                            <Link href="/auth/login" className="w-full">
                                <Button variant="ghost" className="w-full justify-center gap-2 h-9 text-xs font-bold rounded-xl">
                                    <LogIn className="h-3.5 w-3.5" />
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/auth/register" className="w-full">
                                <Button className="w-full justify-center gap-2 h-10 text-xs font-bold rounded-xl shadow-xs">
                                    <UserPlus className="h-3.5 w-3.5" />
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    )}
                    {isPending && (
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-9 w-full rounded-xl" />
                            <Skeleton className="h-10 w-full rounded-xl" />
                        </div>
                    )}
                    {session && (
                        <Link href="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/60 transition-colors">
                            <div className="h-8 w-8 rounded-full overflow-hidden border border-border">
                                <Avatar>
                                    <AvatarImage src={session.user.image || "/images/placeholder-user.jpg"} aria-label={session.user.name} />
                                    <AvatarFallback>{session.user.name[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-bold truncate">{session.user.name}</span>
                                <span className="text-[10px] text-muted-foreground truncate">{session.user.email}</span>
                            </div>
                        </Link>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}