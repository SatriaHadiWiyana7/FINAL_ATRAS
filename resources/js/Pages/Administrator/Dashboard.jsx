import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import ModernDataCard from "@/Components/Administrator/ModernDataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Registrasi semua elemen yang dibutuhkan
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend
);

// Helper function untuk format mata uang Rupiah
const formatRupiah = (number) => {
    if (number === null || typeof number === 'undefined') return "Rp 0";
    const roundedNumber = Math.floor(number);
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(roundedNumber);
};


// Terima semua props dari controller
const Dashboard = (props) => {
    const {
        totalSampah, totalNasabah, totalKategori, totalPemasukan, totalPengeluaran,
        grafikSetoranSampah = [],
        grafikPemasukan = [],
        grafikPengeluaran = [],
    } = props;
    
    // --- (Semua logika persiapan data grafik Anda tetap sama) ---
    const allFinancialDates = [...new Set([...grafikPemasukan.map(p => p.date), ...grafikPengeluaran.map(p => p.date)])].sort();
    const financialLabels = allFinancialDates.map(date => new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }));
    
    const lineChartData = {
        labels: financialLabels,
        datasets: [
            {
                label: 'Pemasukan',
                data: allFinancialDates.map(date => (grafikPemasukan.find(p => p.date === date)?.aggregate || 0)),
                borderColor: 'rgb(34, 197, 94)', // Warna hijau
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                tension: 0.3,
            },
            {
                label: 'Pengeluaran',
                data: allFinancialDates.map(date => (grafikPengeluaran.find(p => p.date === date)?.aggregate || 0)),
                borderColor: 'rgb(239, 68, 68)', // Warna merah
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false },
        },
        scales: { y: { beginAtZero: true } }
    };
    
    const barChartData = {
        labels: grafikSetoranSampah.map(value => new Date(value.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })),
        datasets: [
            {
                label: 'Total Sampah (KG)',
                data: grafikSetoranSampah.map(value => value.aggregate),
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Bar putih agar kontras
            }
        ]
    };
    
    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true, ticks: { precision: 0, color: 'white' } },
            x: { ticks: { color: 'white' } }
        }
    };


    return (
        <AdministratorLayout>
            <Head title="Dashboard" />
            <div className="space-y-6 p-4 md:p-6">
                
                {/* === BAGIAN DATA CARDS DENGAN LAYOUT BARU  === */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Kolom Kiri untuk Pemasukan & Pengeluaran */}
                    <div className="lg:col-span-1 space-y-6">
                        <ModernDataCard
                            title="Total Pemasukan"
                            value={formatRupiah(totalPemasukan)}
                            icon="arrow-down-circle"
                            color="green"
                        />
                        <ModernDataCard
                            title="Total Pengeluaran"
                            value={formatRupiah(totalPengeluaran)}
                            icon="arrow-up-circle"
                            color="red"
                        />
                    </div>
                    
                    {/* Kolom Kanan untuk 3 card lainnya */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
                        <div className="sm:col-span-2">
                             <ModernDataCard
                                title="Total Sampah"
                                value={`${totalSampah || 0} KG`}
                                icon="trash"
                                color="gray"
                            />
                        </div>
                        <ModernDataCard 
                            title="Total Nasabah" 
                            value={totalNasabah || 0}
                            icon="users"
                            color="blue"
                        />
                        <ModernDataCard 
                            title="Total Kategori" 
                            value={totalKategori || 0}
                            icon="tag"
                            color="purple"
                        />
                    </div>
                </div>

                {/* === BAGIAN GRAFIK === */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <Card className="shadow-lg border-0">
                        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <CardTitle className="text-xl font-bold">Grafik Penyetoran Sampah</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 bg-green-500">
                           <Bar options={barChartOptions} data={barChartData} />
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardTitle className="text-xl font-bold">Grafik Keuangan</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Line options={lineChartOptions} data={lineChartData} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdministratorLayout>
    );
};

export default Dashboard;