"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { FormFeedback } from "@/components/feedback/form-feedback"
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")
        const { data, error } = await authClient.signIn.email({
            email: email as string,
            password: password as string,
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

    useEffect(() => {
        return () => {
            setError(null)
            setLoading(false)
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                    </a>
                </div>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    disabled={loading}
                />
            </div>
            <FormFeedback message={error} type="error" />
            <Button className="w-full" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
            </Button>
        </form>
    )
}
