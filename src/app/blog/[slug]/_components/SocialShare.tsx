"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"

interface SocialShareProps {
    url: string
    title: string
}

export const SocialShare = ({ url, title }: SocialShareProps) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const shareLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            className: "hover:bg-[#1877F2]/10 hover:text-[#1877F2] dark:hover:bg-[#1877F2]/20"
        },
        {
            name: "Twitter",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            className: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] dark:hover:bg-[#1DA1F2]/20"
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            className: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] dark:hover:bg-[#0A66C2]/20"
        }
    ]

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard!")
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mr-2">Share:</span>
            {shareLinks.map((link) => (
                <Button
                    key={link.name}
                    variant="outline"
                    size="icon"
                    className={`rounded-full w-9 h-9 transition-colors ${link.className}`}
                    onClick={() => window.open(link.url, "_blank")}
                >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">Share on {link.name}</span>
                </Button>
            ))}
            <Button
                variant="outline"
                size="icon"
                className="rounded-full w-9 h-9 hover:bg-muted"
                onClick={copyToClipboard}
            >
                <LinkIcon className="h-4 w-4" />
                <span className="sr-only">Copy link</span>
            </Button>
        </div>
    )
}
