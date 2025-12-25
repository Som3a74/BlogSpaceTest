import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ResponseHelper } from "@/lib/api-response";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const authorRequests = await prisma.authorRequest.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(ResponseHelper.success(authorRequests, "Requests fetched successfully"));
    } catch (error) {
        console.error(error);
        return NextResponse.json(ResponseHelper.error(error, "Internal Server Error"), { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { bio, reason } = await req.json();

        // Check if a request already exists
        const existingRequest = await prisma.authorRequest.findUnique({
            where: { userId: session.user.id }
        });

        if (existingRequest) {
            return NextResponse.json(ResponseHelper.error(null, "You have already submitted a request"), { status: 400 });
        }

        const authorRequest = await prisma.authorRequest.create({
            data: {
                userId: session.user.id,
                bio,
                reason,
                status: "PENDING"
            }
        });

        return NextResponse.json(ResponseHelper.success(authorRequest, "Application submitted successfully"));
    } catch (error) {
        console.error(error);
        return NextResponse.json(ResponseHelper.error(error, "Internal Server Error"), { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { requestId, status } = await req.json();

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return NextResponse.json(ResponseHelper.error(null, "Invalid status"), { status: 400 });
        }

        const authorRequest = await prisma.authorRequest.findUnique({
            where: { id: requestId },
            include: { user: true }
        });

        if (!authorRequest) {
            return NextResponse.json(ResponseHelper.error(null, "Request not found"), { status: 404 });
        }

        const updatedRequest = await prisma.$transaction(async (tx) => {
            const request = await tx.authorRequest.update({
                where: { id: requestId },
                data: { status }
            });

            if (status === "APPROVED") {
                await tx.user.update({
                    where: { id: authorRequest.userId },
                    data: { role: "AUTHOR" }
                });
            } else if (status === "REJECTED") {
                await tx.user.update({
                    where: { id: authorRequest.userId },
                    data: { role: "USER" }
                });
            }

            return request;
        });

        return NextResponse.json(ResponseHelper.success(updatedRequest, `Request ${status.toLowerCase()} successfully`));
    } catch (error) {
        console.error(error);
        return NextResponse.json(ResponseHelper.error(error, "Internal Server Error"), { status: 500 });
    }
}
