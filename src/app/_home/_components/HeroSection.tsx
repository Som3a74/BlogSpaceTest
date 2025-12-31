import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import Link from 'next/link'

const HeroSection = () => {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden border-b bg-muted/20">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
            <div className="container px-4 md:px-6 relative">
                <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                    <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary animate-in fade-in zoom-in duration-500">
                        <Sparkles className="w-3 h-3 mr-2 inline" />
                        V2.0 is Live
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground pb-2">
                        Stories specific <br className="hidden md:block" />
                        for the <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-500">Curious Minds</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Dive into a world of technology, design, and innovation. We curate the best insights to help you stay ahead in a rapidly evolving digital landscape.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <Button size="lg" className="rounded-full h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" asChild>
                            <Link href="/blog">Start Reading Now</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base border-primary/20 hover:bg-primary/5" asChild>
                            <Link href="#newsletter">Join Newsletter</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection