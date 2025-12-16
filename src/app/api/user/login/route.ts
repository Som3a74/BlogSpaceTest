import { ResponseHelper } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const { email, password } = body

    if (!email || !password) {
        const response = ResponseHelper.error(null, "Email and password are required", 400, null)
        return NextResponse.json(response, { status: response.status })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        const response = ResponseHelper.error(null, "User not found", 404, null)
        return NextResponse.json(response, { status: response.status })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!)
    if (!isPasswordValid) {
        const response = ResponseHelper.error(null, "Invalid password", 401, null)
        return NextResponse.json(response, { status: response.status })
    }

    try {
        const response = ResponseHelper.success(user, "User logged in successfully", 200)
        return NextResponse.json(response, { status: response.status })
    } catch (error) {
        const response = ResponseHelper.error(error, "Internal Server Error", 500, null)
        return NextResponse.json(response, { status: response.status })
    }
}