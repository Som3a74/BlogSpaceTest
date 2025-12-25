"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client";

export function RegisterForm() {
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        const { data, error } = await authClient.signUp.email({
            email: email as string,
            password: password as string,
            name: name as string,
            callbackURL: "/"
        }, {
            onRequest: (ctx) => {
                console.log(ctx);
                setLoading(true)
            },
            onSuccess: (ctx) => {
                console.log(ctx);
                toast.success("Account created successfully" + ctx.data.user.name)
            },
            onError: (ctx) => {
                console.log(ctx);
                toast.error(ctx.error.statusText);
            },
        });
        setLoading(false)
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={loading}
                />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create account
            </Button>
        </form>
    )
}
