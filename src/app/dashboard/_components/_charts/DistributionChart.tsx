"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryData {
    name: string
    count: number
}

interface DistributionChartProps {
    data: CategoryData[]
}

const COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
    'hsl(var(--primary))',
];

export function DistributionChart({ data }: DistributionChartProps) {
    return (
        <Card className="col-span-3 border-none shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">Content Distribution</CardTitle>
                <CardDescription>Articles per category</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-75 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="count"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    borderColor: '#e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    color: '#0f172a'
                                }}
                                itemStyle={{ color: 'inherit' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
