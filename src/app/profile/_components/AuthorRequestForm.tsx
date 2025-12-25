"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, PenTool, Lightbulb, Sparkles, CheckCircle2 } from "lucide-react"

interface AuthorRequestFormProps {
    userStatus?: string
}

export function AuthorRequestForm({ userStatus }: AuthorRequestFormProps) {
    const [loading, setLoading] = useState(false)
    const [bio, setBio] = useState("")
    const [reason, setReason] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch("/api/user/author-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bio, reason }),
            })

            const result = await response.json()
            setLoading(false)

            if (response.ok) {
                toast.success("Application dispatched successfully")
                window.location.reload()
            } else {
                toast.error(result.message || "Failed to submit application")
            }
        } catch (error) {
            setLoading(false)
            toast.error("Network error. Please try again.")
        }
    }

    if (userStatus === "PENDING") {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-8 bg-slate-50/50 dark:bg-white/2 rounded-4xl border border-dashed border-slate-200 dark:border-white/10">
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <div className="relative bg-white dark:bg-slate-900 h-20 w-20 rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 dark:border-white/5">
                        <Sparkles className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <div className="space-y-3 max-w-md">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Reviewing Your Dossier</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                        Our curators are currently reviewing your application. You'll receive a notification once your author status is activated.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Application Pending</span>
                </div>
            </div>
        )
    }

    if (userStatus === "AUTHOR") {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6 bg-primary/5 rounded-4xl border border-primary/10">
                <div className="bg-primary h-16 w-16 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Author Identity Active</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-light">Your creative tools are fully unlocked in the dashboard.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl">
            <div className="mb-10 p-6 bg-slate-50 dark:bg-white/2 rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden group">
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 bg-primary/10 rounded-lg flex items-center justify-center">
                            <PenTool className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Elevate to Author</h3>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                        Join our circle of writers. Gain access to publishing tools and reach a global audience.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4 group">
                    <Label htmlFor="bio" className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 px-1 group-focus-within:text-primary transition-colors flex items-center gap-2">
                        Professional Bio
                    </Label>
                    <div className="relative">
                        <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about your background and expertise..."
                            className="min-h-35 p-6 bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 dark:text-white placeholder:font-light"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4 group">
                    <Label htmlFor="reason" className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 px-1 group-focus-within:text-primary transition-colors flex items-center gap-2">
                        Primary Focus
                        <Lightbulb className="h-3 w-3 opacity-50" />
                    </Label>
                    <div className="relative">
                        <Textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="What kind of value will you bring to the BlogSpace community?"
                            className="min-h-35 p-6 bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 dark:text-white placeholder:font-light"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-center sm:justify-start pt-2">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white h-11 px-10 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing
                            </>
                        ) : (
                            "Submit Dossier"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
