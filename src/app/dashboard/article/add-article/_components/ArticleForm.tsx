"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Category {
    id: number
    name: string
}

interface ArticleFormProps {
    categories: Category[]
}

export function ArticleForm({ categories }: ArticleFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [published, setPublished] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        // await new Promise(resolve => setTimeout(resolve, 2000))
        const formData = new FormData(e.currentTarget)

        const data = {
            title: formData.get("title"),
            introduction: formData.get("introduction"),
            proTip: formData.get("proTip"),
            conclusion: formData.get("conclusion"),
            published,
            categoryId: Number(formData.get("category")),
            image: formData.get("image"),
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
        }

        try {
            const response = await fetch("/api/article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            setLoading(false)
            console.log(response)
            // await router.push("/dashboard/article")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Article Details</CardTitle>
                            <CardDescription>
                                Give your article a clear title and structure.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" placeholder="Enter article title" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="introduction">Introduction</Label>
                                <Textarea
                                    id="introduction"
                                    name="introduction"
                                    placeholder="Write a catchy introduction..."
                                    className="min-h-[150px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="proTip">Pro Tip</Label>
                                <Textarea
                                    id="proTip"
                                    name="proTip"
                                    placeholder="Share a valuable tip..."
                                    className="min-h-[100px] bg-sky-50 dark:bg-sky-950/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="conclusion">Conclusion</Label>
                                <Textarea
                                    id="conclusion"
                                    name="conclusion"
                                    placeholder="Wrap it up..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Published</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Make this article visible to everyone.
                                    </p>
                                </div>
                                <Switch id="published" name="published"
                                    checked={published}
                                    onCheckedChange={setPublished}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select name="category">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Cover Image URL</Label>
                                <Input id="image" name="image" placeholder="https://example.com/image.jpg" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? "Saving..." : "Save Article"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </form>
    )
}
