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
import { registerSchema } from "@/lib/validations/api-schemas"
import { z } from "zod"
import { useRouter } from "next/navigation"


type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: RegisterFormValues) => {
        await authClient.signUp.email({ email: values.email, password: values.password, name: values.name, callbackURL: "/" }, {
            onRequest: () => {
                setLoading(true)
            },
            onSuccess: (ctx) => {
                toast.success("Account created successfully, welcome " + ctx.data.user.name)
                router.push("/")
                router.refresh()
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "Something went wrong");
                setLoading(false)
            },
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    disabled={loading}
                    className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
            </div>
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
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    disabled={loading}
                    placeholder="* * * * * * * *"
                    className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create account
            </Button>
        </form>
    )
}
