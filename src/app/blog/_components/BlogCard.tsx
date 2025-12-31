import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { dataFormat } from '@/utils/dataFormat'
import { BlogCardProps } from '../types/blogTypes'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const BlogCard = ({
    id,
    title,
    content,
    category,
    image,
    updatedAt,
    createdAt,
    user = { id: "#", name: "John Doe", image: "" },
    slug = "#",
    views = 0,
    className
}: BlogCardProps) => {
    return (
        <Card className={cn("group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full", className)}>
            <div className="aspect-video w-full bg-muted relative overflow-hidden">
                <div className="absolute inset-0 from-black/60 to-transparent z-10" />
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Badge className="absolute top-4 left-4 z-20">{category.name}</Badge>
            </div>
            <CardHeader className="pb-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {dataFormat(createdAt)}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {views} views</span>
                </div>
                <Link href={`/blog/${slug}`} className="group-hover:text-primary transition-colors">
                    <h3 className="text-xl font-bold leading-tight line-clamp-2">{title}</h3>
                </Link>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <p className="text-muted-foreground line-clamp-3 text-sm">
                    {typeof content === 'string'
                        ? content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."
                        : "No content available."}
                </p>
            </CardContent>
            <CardFooter className="pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Avatar className="h-8 w-8 border border-border shadow-sm">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                            {user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80 p-0 hover:bg-transparent" asChild>
                    <Link href={`/blog/${slug}`}>
                        Read More <span className="sr-only">about {title}</span> <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default BlogCard