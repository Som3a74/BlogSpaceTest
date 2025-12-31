import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

import Image from "next/image"

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="relative">
                                <Image
                                    src="/images/logo.png"
                                    alt="DevJournal Logo"
                                    width={130}
                                    height={120}
                                    className="object-contain h-auto"
                                />
                            </div>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                            Sharing thoughts, ideas, and stories about technology, design, and the future.
                            Join our community of readers today.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Links</h3>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-primary">Home</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-primary">Blog</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Social</h3>
                        <div className="mt-4 flex gap-4">
                            <Link href="#" aria-label="Follow us on Twitter" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" aria-label="Visit our GitHub" className="text-muted-foreground hover:text-primary">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="#" aria-label="Connect on LinkedIn" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} DevJournal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
