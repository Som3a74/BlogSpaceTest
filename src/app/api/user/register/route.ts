import { ResponseHelper } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, password, name } = body;

        // Simple validation
        if (!email || !password || !name) {
            const response = ResponseHelper.error({}, "Missing fields", 400, null)
            return NextResponse.json(response, { status: response.status })
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            const response = ResponseHelper.error({}, "User already exists", 409, null)
            return NextResponse.json(response, { status: response.status })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        const response = ResponseHelper.success(userWithoutPassword, "User Registered successfully", 201)
        return NextResponse.json(response, { status: response.status })
    } catch (error) {
        const response = ResponseHelper.error(error, "Internal Server Error", 500, null)
        return NextResponse.json(response, { status: response.status })
    }
}