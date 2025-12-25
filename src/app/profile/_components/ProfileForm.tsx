"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UploadButton } from "@/utils/uploadthing"
import { toast } from "sonner"
import { Loader2, Camera, ShieldCheck, Mail, User as UserIcon } from "lucide-react"

interface ProfileFormProps {
    user: {
        id: string
        name: string
        email: string
        image?: string | null
        role?: string | null
    }
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(user.name)
    const [image, setImage] = useState(user.image || "")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, image }),
            })

            const result = await response.json()
            setLoading(false)

            if (response.ok) {
                toast.success("Identity updated successfully")
                window.location.reload()
            } else {
                toast.error(result.message || "Failed to update profile")
            }
        } catch (error) {
            setLoading(false)
            toast.error("Network error. Please try again.")
        }
    }

    return (
        <div className="space-y-12">
            <form onSubmit={handleSubmit} className="space-y-12">
                {/* Photo Section */}
                <div className="flex flex-col sm:flex-row items-center gap-10 pb-12 border-b border-slate-200/60 dark:border-white/5">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-tr from-primary to-primary/30 rounded-full blur-sm opacity-25 group-hover:opacity-100 transition-opacity duration-500" />
                        <Avatar className="h-32 w-32 ring-4 ring-white dark:ring-[#050505] border border-slate-200 dark:border-white/5 shadow-2xl relative z-10">
                            <AvatarImage src={image} className="object-cover" />
                            <AvatarFallback className="bg-slate-50 dark:bg-slate-900 text-4xl font-black text-primary">
                                {name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 transition-all flex items-center justify-center z-20 pointer-events-none">
                            <Camera className="text-white opacity-0 group-hover:opacity-100 h-7 w-7 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300" />
                        </div>
                    </div>
                    <div className="space-y-4 text-center sm:text-left">
                        <div className="space-y-1">
                            <h4 className="text-lg font-black text-slate-900 dark:text-white">Profile Identity</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Update your public presence.</p>
                        </div>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                setImage(res[0].ufsUrl)
                            }}
                            onUploadError={(error) => {
                                toast.error(`Upload failed: ${error.message}`)
                            }}
                            appearance={{
                                button: "bg-primary text-white h-10 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all hover:shadow-lg active:scale-95",
                                allowedContent: "hidden"
                            }}
                        />
                    </div>
                </div>

                {/* Form Fields Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-4 group">
                        <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 px-1 group-focus-within:text-primary transition-colors">Digital Signature</Label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Display Name"
                                className="h-14 pl-12 bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-900 dark:text-white placeholder:font-light"
                                required
                            />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium px-1">Your public name displayed to the BlogSpace community.</p>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 px-1">Secure Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                            <Input
                                id="email"
                                value={user.email}
                                disabled
                                className="h-14 pl-12 bg-slate-50/80 dark:bg-white/5 border-slate-100 dark:border-white/5 rounded-2xl font-medium text-slate-400 cursor-not-allowed shadow-inner"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <ShieldCheck className="h-4 w-4 text-primary opacity-40" />
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium px-1">System email is protected and cannot be changed here.</p>
                    </div>
                </div>

                <div className="flex justify-center sm:justify-start pt-6">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white h-11 px-10 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
