import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="text-gray-800 font-medium">{label}</p>
                <p className="text-green-600 font-semibold">
                    {`${payload[0].value} KG`}
                </p>
            </div>
        );
    }
    return null;
};

export default function ModernBarChart({ data }) {
    // Transform the data to match recharts format
    const chartData = data.labels.map((label, index) => ({
        name: label,
        value: data.data[index]
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={chartData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barCategoryGap="20%"
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                />
                <Bar 
                    dataKey="value" 
                    fill="url(#colorGradient)" 
                    radius={[4, 4, 0, 0]}
                    name="Berat Sampah (KG)"
                />
                <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#059669" stopOpacity={0.6}/>
                    </linearGradient>
                </defs>
            </BarChart>
        </ResponsiveContainer>
    );
}