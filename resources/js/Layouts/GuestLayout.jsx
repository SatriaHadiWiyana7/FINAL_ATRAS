import Button from "@/Components/Button";
import { Link, usePage } from "@inertiajs/react";
import { Leaf, ArrowLeft } from "lucide-react";

export default function Guest({ children }) {
    const { component } = usePage();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-50/50 rounded-full blur-3xl"></div>
            </div>

            {/* Back to Home Button */}
            {component !== "Administrator/Login" && (
                <div className="absolute top-6 left-6 z-[99999] hidden md:block">
                    <Link href="/" className="inline-block">
                        <Button className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm hover:bg-white border border-green-200 !text-green-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-4 py-2 rounded-full">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-medium">Kembali Ke Beranda</span>
                        </Button>
                    </Link>
                </div>
            )}

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
                <div className="w-full max-w-md">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center justify-center space-x-3 mb-2 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                    <Leaf className="w-12 h-12 text-green-500 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300">
                                    SIMBAH
                                </span>
                            </div>
                        </Link>
                        <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto"></div>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
                        {/* Card Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-100/20 rounded-full blur-2xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                            {children}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 text-sm text-gray-600">
                        <p>© 2024 SIMBAH. Menuju lingkungan yang lebih bersih.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
