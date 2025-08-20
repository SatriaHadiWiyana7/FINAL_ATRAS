import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { 
    LayoutDashboard, 
    User, 
    LogOut, 
    Menu, 
    X,
    Leaf
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

export default function AuthenticatedLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    useEffect(() => {
        document.body.classList.add("bg-background");
        document.body.classList.remove("bg-white", "bg-gray-50");
    }, []);

    // Get current path for active state
    const currPath = window.location.pathname;
    const pageName = currPath.split("/").pop().replace("-", " ");

    const menuItems = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Profile",
            path: "/profile",
            icon: User,
        },
    ];

    const isActive = (path) => currPath === path;

    const SidebarComponent = ({ isMobile = false }) => (
        <Sidebar className={cn(
            "bg-card border-r",
            isMobile ? "w-full max-w-sm" : "w-64"
        )}>
            <SidebarHeader className={cn(isMobile && "pr-12")}>
                <Link href="/" className="flex items-center space-x-2">
                    <Leaf className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold text-foreground">SIMBAH</span>
                </Link>
            </SidebarHeader>
            
            <SidebarContent>
                <SidebarNav>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
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
                <Link
                    method="post"
                    href={route("logout")}
                    as="button"
                    className="block w-full"
                >
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Log Out
                    </Button>
                </Link>
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
                            <h1 className="text-2xl font-bold text-foreground capitalize">
                                {pageName || 'Dashboard'}
                            </h1>
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
