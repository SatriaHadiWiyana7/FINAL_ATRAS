import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { TrendingUp, Users, Trash2, Tag, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const iconMap = {
    trash: Trash2,
    users: Users,
    tag: Tag,
    'arrow-down-circle': ArrowDownCircle,
    'arrow-up-circle': ArrowUpCircle,
};

export default function ModernDataCard({ title, value, icon, color = "gray" }) {

    const getColorClasses = () => {
        switch (color) {
            case 'blue':
                return { cardBg: 'bg-blue-500', iconBg: 'bg-blue-400' };
            case 'purple':
                return { cardBg: 'bg-purple-500', iconBg: 'bg-purple-400' };
            case 'red':
                return { cardBg: 'bg-red-500', iconBg: 'bg-red-400' };
            case 'green':
                return { cardBg: 'bg-green-500', iconBg: 'bg-green-400' };
            case 'gray':
            default:
                return { cardBg: 'bg-gray-700', iconBg: 'bg-gray-600' };
        }
    };

    const valueAsString = String(value);
    const fontSizeClass = valueAsString.length > 10 ? 'text-2xl' : 'text-3xl';
    const theme = getColorClasses();
    const IconComponent = iconMap[icon] || TrendingUp;

    return (
        <Card className={`${theme.cardBg} text-white shadow-lg rounded-2xl border-0`}>
            <CardContent className="p-5">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-white/80 text-sm font-medium">
                            {title}
                        </p>
                        <span className={`block font-bold ${fontSizeClass}`}>
                            {value}
                        </span>
                    </div>
                    
                    {/* --- PERUBAHAN DI SINI --- */}
                    {/* Tampilkan ikon HANYA jika prop 'icon' ada isinya */}
                    {icon && (
                        <div className={`flex items-center justify-center p-3 rounded-xl ${theme.iconBg}`}>
                            <IconComponent className="h-6 w-6" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}