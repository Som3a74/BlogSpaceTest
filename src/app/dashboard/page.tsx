import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from "react";
import { DashboardStats } from "./_components/DashboardStats";
import { PopularCategories } from "./_components/PopularCategories";
import { StatsSkeleton, CategoriesSkeleton } from "./_components/DashboardSkeletons";

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Coming soon: Live activity feed.
                        </p>
                    </CardContent>
                </Card>

                <Suspense fallback={<CategoriesSkeleton />}>
                    <PopularCategories />
                </Suspense>
            </div>
        </div>
    );
}
