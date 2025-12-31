"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validations/api-schemas"
import { z } from "zod"

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({ email: values.email, password: values.password, callbackURL: "/" }, {
            onRequest: () => {
                setLoading(true)
            },
            onSuccess: (ctx) => {
                toast.success("Welcome back, " + ctx.data.user.name)
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "Invalid credentials");
                setLoading(false)
            },
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                    disabled={loading}
                    className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
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
                    placeholder="* * * * * * * *"
                    {...register("password")}
                    disabled={loading}
                    className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
            </Button>
        </form>
    )
}
