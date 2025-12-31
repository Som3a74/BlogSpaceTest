export interface BlogCardProps {
    title: string
    image: string
    updatedAt: string
    createdAt: string
    content: any
    user: {
        id: string
        name: string
        image?: string
    }
    category: {
        id: string
        name: string
    }
    slug: string
    id: string
    views?: number
    className?: string
}