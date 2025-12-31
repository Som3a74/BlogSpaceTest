import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from "react";
import { DashboardStats } from "./_components/DashboardStats";
import { DashboardCharts } from "./_components/DashboardCharts";
import { StatsSkeleton, ChartsSkeleton } from "./_components/DashboardSkeletons";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || (session.user.role !== "AUTHOR" && session.user.role !== "ADMIN")) {
        redirect("/");
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your blog performance.</p>
            </div>

            <Suspense fallback={<StatsSkeleton />}>
                <DashboardStats userId={session.user.id} />
            </Suspense>

            <Suspense fallback={<ChartsSkeleton />}>
                <DashboardCharts userId={session.user.id} />
            </Suspense>
        </div>
    );
}
