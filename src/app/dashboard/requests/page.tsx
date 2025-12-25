"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import {
    Loader2,
    CheckCircle2,
    XCircle,
    User,
    Mail,
    Clock,
    FileText,
    ExternalLink,
    Filter,
    Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AuthorRequest {
    id: number
    userId: string
    status: "PENDING" | "APPROVED" | "REJECTED"
    bio: string
    reason: string
    createdAt: string
    user: {
        name: string
        email: string
        image: string | null
    }
}

export default function AuthorRequestsPage() {
    const [requests, setRequests] = useState<AuthorRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [processingId, setProcessingId] = useState<number | null>(null)
    const [filter, setFilter] = useState<string>("ALL")
    const [searchQuery, setSearchQuery] = useState("")

    const fetchRequests = async () => {
        try {
            const response = await fetch("/api/user/author-request")
            const result = await response.json()
            if (response.ok) {
                setRequests(result.data)
            } else {
                toast.error(result.message || "Failed to fetch requests")
            }
        } catch (error) {
            toast.error("Error fetching requests")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    const handleAction = async (requestId: number, status: "APPROVED" | "REJECTED") => {
        setProcessingId(requestId)
        try {
            const response = await fetch("/api/user/author-request", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestId, status }),
            })
            const result = await response.json()
            if (response.ok) {
                toast.success(`Request ${status.toLowerCase()} successfully`)
                setRequests(prev => prev.map(req => req.id === requestId ? { ...req, status } : req))
            } else {
                toast.error(result.message || "Action failed")
            }
        } catch (error) {
            toast.error("Network error")
        } finally {
            setProcessingId(null)
        }
    }

    const filteredRequests = requests.filter(req => {
        const matchesFilter = filter === "ALL" || req.status === filter
        const matchesSearch = req.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.user.email.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    if (loading) {
        return (
            <div className="flex h-100 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        <span className="text-xs font-black uppercase tracking-widest">Management</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Author Applications
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                        Review and manage user applications for author status. Approved users gain publishing privileges.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Card className="border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <CardContent className="p-3 flex items-center gap-6">
                            <div className="text-center px-4 border-r border-slate-100 dark:border-white/5">
                                <div className="text-2xl font-black text-slate-900 dark:text-white">
                                    {requests.filter(r => r.status === "PENDING").length}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Pending</div>
                            </div>
                            <div className="text-center px-4">
                                <div className="text-2xl font-black text-primary">
                                    {requests.filter(r => r.status === "APPROVED").length}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Approved</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Controls Section */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-11 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-xl focus:ring-primary/20 transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
                    {["ALL", "PENDING", "APPROVED", "REJECTED"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all",
                                filter === f
                                    ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Requests List */}
            <div className="grid grid-cols-1 gap-6">
                {filteredRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-slate-50/50 dark:bg-white/2 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                        <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                            <Filter className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No requests found</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xs mt-2">
                            Try adjusting your filters or search query to find what you're looking for.
                        </p>
                    </div>
                ) : (
                    filteredRequests.map((request) => (
                        <Card key={request.id} className="overflow-hidden border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 hover:border-primary/50 transition-all duration-300 group shadow-md hover:shadow-xl">
                            <div className="flex flex-col lg:flex-row">
                                {/* Left: User Info */}
                                <div className="p-6 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/1">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-14 w-14 border-2 border-white dark:border-slate-800 shadow-lg">
                                            <AvatarImage src={request.user.image || ""} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                                {request.user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 flex-1 min-w-0">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white truncate">
                                                {request.user.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                                                <Mail className="h-3.5 w-3.5 shrink-0" />
                                                <span className="truncate">{request.user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wider pt-2">
                                                <Clock className="h-3 w-3" />
                                                Applied on {new Date(request.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {request.status === "PENDING" && (
                                            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Pending Review
                                            </Badge>
                                        )}
                                        {request.status === "APPROVED" && (
                                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Approved
                                            </Badge>
                                        )}
                                        {request.status === "REJECTED" && (
                                            <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Rejected
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Content & Actions */}
                                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                                                <FileText className="h-3 w-3" />
                                                Professional Bio
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-white/2 p-4 rounded-xl border border-slate-100 dark:border-white/5">
                                                {request.bio}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                                                <ExternalLink className="h-3 w-3" />
                                                Reason for Joining
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-white/2 p-4 rounded-xl border border-slate-100 dark:border-white/5">
                                                {request.reason}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                                        {/* Show Reject/Revoke button always unless we are PENDING (where it's 'Reject Application') */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAction(request.id, "REJECTED")}
                                            disabled={processingId !== null || request.status === "REJECTED"}
                                            className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/20 h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest group disabled:opacity-30"
                                        >
                                            {processingId === request.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <XCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                            )}
                                            {request.status === "APPROVED" ? "Revoke Access" : "Reject Application"}
                                        </Button>

                                        {/* Show Approve button */}
                                        <Button
                                            size="sm"
                                            onClick={() => handleAction(request.id, "APPROVED")}
                                            disabled={processingId !== null || request.status === "APPROVED"}
                                            className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest group disabled:opacity-30"
                                        >
                                            {processingId === request.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <CheckCircle2 className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                            )}
                                            {request.status === "REJECTED" ? "Approve Anyway" : "Approve Author"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
