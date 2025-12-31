"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ArticleViewsData {
    name: string
    views: number
}

interface PerformanceChartProps {
    data: ArticleViewsData[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
    return (
        <Card className="col-span-4 border-none shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">Article Performance</CardTitle>
                <CardDescription>Views across your top published articles</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-75 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis
                                dataKey="name"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    borderColor: '#e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    color: '#0f172a'
                                }}
                                itemStyle={{ color: '#8b5cf6' }}
                                cursor={{ fill: '#8b5cf6', opacity: 0.1 }}
                            />
                            <Bar
                                dataKey="views"
                                fill="#8b5cf6"
                                radius={[6, 6, 0, 0]}
                                opacity={0.8}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
