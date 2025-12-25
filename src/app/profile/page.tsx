import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./_components/ProfileForm";
import { AuthorRequestForm } from "./_components/AuthorRequestForm";
import { User, ShieldCheck, Calendar, Settings2, PenLine, ChevronRight, LayoutGrid, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/auth/login");
    }

    const userRequest = await prisma.authorRequest.findUnique({
        where: { userId: session.user.id }
    });
    console.log(userRequest)

    return (
        <div className="min-h-screen bg-slate-50/40 dark:bg-[#050505]">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">

                    {/* Left: Quick Profile Card */}
                    <div className="w-full lg:w-80 space-y-8 lg:sticky lg:top-32 animate-in fade-in slide-in-from-left-4 duration-700 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="space-y-6 flex flex-col items-center lg:items-start">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-linear-to-tr from-primary/20 to-primary/0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Avatar className="h-24 w-24 ring-2 ring-white dark:ring-slate-900 border border-slate-200 dark:border-white/5 shadow-sm transition-all duration-500 group-hover:scale-[1.02] relative z-10 mx-auto lg:mx-0">
                                    <AvatarImage className="object-cover" src={session.user.image || ""} />
                                    <AvatarFallback className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-xl font-bold text-primary">
                                        {session.user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-4 border-white dark:border-[#050505] z-20 shadow-sm" />
                            </div>
                            <div className="space-y-1.5 px-1">
                                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">{session.user.name}</h2>
                                <p className="text-sm text-slate-500 font-medium truncate max-w-70">{session.user.email}</p>
                            </div>

                            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest pt-2 w-full max-w-50 lg:max-w-none">
                                <span className="text-slate-400">Account Role</span>
                                <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                    {session.user.role}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/5 space-y-2.5 relative overflow-hidden group">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Platform Note</p>
                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                                Your profile data captures your identity across the BlogSpace community.
                            </p>
                        </div>
                    </div>

                    {/* Right: Main Content Hub */}
                    <div className="flex-1 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        <Tabs defaultValue="profile" className="space-y-10">
                            <div className="flex justify-center lg:justify-start w-full overflow-x-auto pb-2 scrollbar-hide">
                                <TabsList className="bg-slate-100 dark:bg-slate-900/80 p-1.5 h-auto rounded-full border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                                    <TabsTrigger
                                        value="profile"
                                        className="rounded-full px-6 md:px-10 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 font-bold text-sm flex items-center gap-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap"
                                    >
                                        <Settings2 className="h-4 w-4" />
                                        Account Settings
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="author"
                                        className="rounded-full px-6 md:px-10 py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 font-bold text-sm flex items-center gap-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap"
                                    >
                                        <PenLine className="h-4 w-4" />
                                        Author Hub
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="pt-2">
                                <TabsContent value="profile" className="focus-visible:ring-0 outline-none">
                                    <ProfileForm user={session.user} />
                                </TabsContent>

                                <TabsContent value="author" className="focus-visible:ring-0 outline-none">
                                    {session.user.role === "AUTHOR" || session.user.role === "ADMIN" ? (
                                        <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 text-center space-y-8 shadow-sm relative overflow-hidden group">
                                            <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                <ShieldCheck className="h-10 w-10 text-primary" />
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Editorial Privilege Active</h3>
                                                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-sm mx-auto">
                                                    Your account has verified publishing rights. You can contribute, edit, and manage high-quality content.
                                                </p>
                                            </div>
                                            <Link href="/dashboard" className="inline-flex items-center gap-3 text-sm font-black text-primary hover:opacity-70 transition-all group/btn">
                                                Enter Author Dashboard <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    ) : userRequest?.status === "PENDING" ? (
                                        <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 text-center space-y-10 shadow-sm relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-3xl flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-900/30">
                                                <Calendar className="h-10 w-10 text-amber-600 dark:text-amber-500" />
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Status: Review in Progress</h3>
                                                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-sm mx-auto">
                                                    Applied on {userRequest.createdAt.toLocaleDateString()}. Our curation team typically responds within 3-5 business days.
                                                </p>
                                            </div>
                                            <div className="pt-2">
                                                <span className="px-6 py-2.5 rounded-full bg-amber-100/50 dark:bg-amber-500/10 text-[10px] font-black uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20">
                                                    Application PENDING
                                                </span>
                                            </div>
                                        </div>
                                    ) : userRequest?.status === "REJECTED" ? (
                                        <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 text-center space-y-10 shadow-sm relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                            <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-3xl flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-900/30">
                                                <XCircle className="h-10 w-10 text-rose-600 dark:text-rose-500" />
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Application Restricted</h3>
                                                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-sm mx-auto">
                                                    Unfortunately, your application for author status was not approved at this time.
                                                </p>
                                            </div>
                                            <div className="pt-2">
                                                <span className="px-6 py-2.5 rounded-full bg-rose-100/50 dark:bg-rose-500/10 text-[10px] font-black uppercase tracking-[0.25em] text-rose-700 dark:text-rose-400 border border-rose-200/50 dark:border-rose-500/20">
                                                    Status: Rejected
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <AuthorRequestForm />
                                    )}
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
