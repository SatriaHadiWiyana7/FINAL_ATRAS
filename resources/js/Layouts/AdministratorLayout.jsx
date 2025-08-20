import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Users, 
    LogOut, 
    Menu, 
    Tag,
    Recycle,
    FileText,
    Leaf,
    DollarSign
} from "lucide-react";
import { Button } from "../Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../Components/ui/sheet";
import { 
    Sidebar, 
    SidebarHeader, 
    SidebarContent, 
    SidebarFooter, 
    SidebarNav, 
    SidebarNavItem 
} from "../Components/ui/sidebar";
import { cn } from "../lib/utils";

export default function AdministratorLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { post } = useForm(); 

    useEffect(() => {
        document.body.classList.add("bg-background");
        document.body.classList.remove("bg-white", "bg-gray-50", "bg-[#F3F4F6]");
    }, []);

    const handleLogout = () => {
        post(route('administrator.logout'), {
            onSuccess: () => {
                window.location.href = '/';
            },
        });
    };

    // Get current path for active state
    const currPath = window.location.pathname;
    const pageName = currPath.split("/").pop().replace("-", " ");

    const menuItems = [
        {
            title: "Dashboard",
            path: "administrator.dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Kategori",
            path: "administrator.kategori.index",
            icon: Tag,
        },
        {
            title: "Nasabah",
            path: "administrator.nasabah.index",
            icon: Users,
        },
        {
            title: "Kelola Sampah",
            path: "administrator.kelolaSampah.index",
            icon: Recycle,
        },
         {
            title: "Penarikan Saldo",
            path: "administrator.penarikan-saldo.index",
            icon: DollarSign,
        },
        {
            title: "Kelola Konten",
            path: "administrator.kelola-konten.index",
            icon: FileText,
        },
    ];

    const isActive = (path) => {
        const currentRoute = route().current();
        return currentRoute === path;
    };

    const SidebarComponent = ({ isMobile = false }) => (
        <Sidebar className={cn(
            "bg-card border-r",
            isMobile ? "w-full max-w-sm" : "w-64"
        )}>
            <SidebarHeader className={cn(isMobile && "pr-12")}>
                <Link href="/" className="flex items-center space-x-2">
                    <Leaf className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold text-foreground">SIMBAH</span>
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">Admin</span>
                </Link>
            </SidebarHeader>
            
            <SidebarContent>
                <SidebarNav>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                href={route(item.path)}
                                className="block"
                                onClick={() => isMobile && setSidebarOpen(false)}
                            >
                                <SidebarNavItem 
                                    active={isActive(item.path)}
                                    className={cn(
                                        "cursor-pointer group",
                                        isActive(item.path) && "bg-accent border-r-2 border-primary"
                                    )}
                                >
                                    <Icon className={cn(
                                        "w-5 h-5",
                                        isActive(item.path) ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                                    )} />
                                    <span>{item.title}</span>
                                </SidebarNavItem>
                            </Link>
                        );
                    })}
                </SidebarNav>
            </SidebarContent>

            <SidebarFooter>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Log Out
                </Button>
            </SidebarFooter>
        </Sidebar>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="p-0 w-80" open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SidebarComponent isMobile={true} />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <SidebarComponent />
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                    <div className="flex items-center justify-between h-16 px-4">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                                <span className="sr-only">Toggle sidebar</span>
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground capitalize">
                                    {pageName || 'Dashboard'}
                                </h1>
                                <div className="w-12 h-1 bg-gradient-to-r from-primary/80 to-primary rounded-full mt-1"></div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                                Admin Panel
                            </span>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
