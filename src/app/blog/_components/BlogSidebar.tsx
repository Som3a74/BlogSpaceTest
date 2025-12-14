import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { getCategories } from '@/lib/data/categories'

const BlogSidebar = async () => {

    const categories = await getCategories()

    const sidebarData = [
        {
            title: "Latest Article",
            id: "latest",
            posts: []
        },
        {
            title: "Popular Article",
            id: "popular",
            posts: []
        }
    ]

    return (
        <aside className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>

            {/* Filters */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 sticky top-24">
                <div className="flex items-center gap-2 font-semibold mb-4">
                    <Filter className="h-4 w-4" /> Filters
                </div>
                <Accordion type="single" collapsible className="w-full" defaultValue="categories">
                    <AccordionItem value="categories">
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-2">
                                {categories.data.map((cat: any) => (
                                    <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                        {cat.name}
                                    </label>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="state">
                        <AccordionTrigger>States</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-wrap gap-2">
                                {sidebarData.map((ele: any) => (
                                    <Badge key={ele.id} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                                        {ele.title}
                                    </Badge>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </aside>
    )
}

export default BlogSidebar