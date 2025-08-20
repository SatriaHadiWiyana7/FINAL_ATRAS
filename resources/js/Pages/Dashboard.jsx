import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Wallet, Recycle, BarChart3 } from 'lucide-react';

// Komponen Card
const DataCard = ({ title, value, subtext, icon: Icon }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        </CardContent>
    </Card>
);

// Helper function untuk format Rupiah
const formatRupiah = (number) => {
    if (number === null || typeof number === 'undefined') return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Math.floor(number));
};

export default function Dashboard({ auth, totalSampah, totalSetoran, saldo, riwayatTransaksi }) {
    
    const [filter, setFilter] = useState('semua'); 

    const filteredHistory = useMemo(() => {
        if (filter === 'setoran') {
            return riwayatTransaksi.filter(item => item.jenis_transaksi === 'masuk');
        }
        if (filter === 'penarikan') {
            return riwayatTransaksi.filter(item => item.jenis_transaksi === 'keluar');
        }
        return riwayatTransaksi;
    }, [filter, riwayatTransaksi]);

    const numericTotalSampah = parseFloat(totalSampah || 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-2">
                            <DataCard
                                title="Jumlah Saldo Anda"
                                value={formatRupiah(saldo)}
                                subtext="Total saldo yang dapat ditarik"
                                icon={Wallet}
                            />
                        </div>
                        <DataCard
                            title="Total Sampah"
                            // Gunakan variabel angka yang sudah dikonversi
                            value={`${numericTotalSampah.toFixed(2)} KG`}
                            subtext="Total sampah yang dikumpulkan"
                            icon={Recycle}
                        />
                        <DataCard
                            title="Total Setoran"
                            value={totalSetoran || 0}
                            subtext="Jumlah pencatatan sampah"
                            icon={BarChart3}
                        />
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Histori Transaksi Anda</CardTitle>
                                <div className="flex space-x-2">
                                    <Button variant={filter === 'semua' ? 'default' : 'outline'} onClick={() => setFilter('semua')}>Semua</Button>
                                    <Button variant={filter === 'setoran' ? 'default' : 'outline'} onClick={() => setFilter('setoran')}>Setoran</Button>
                                    <Button variant={filter === 'penarikan' ? 'default' : 'outline'} onClick={() => setFilter('penarikan')}>Penarikan</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Jenis Transaksi</TableHead>
                                        <TableHead>Keterangan</TableHead>
                                        <TableHead className="text-right">Jumlah</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredHistory.length > 0 ? (
                                        filteredHistory.map(item => (
                                            <TableRow key={item.id}>
                                                <TableCell>{new Date(item.tanggal_transaksi).toLocaleDateString('id-ID')}</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        item.jenis_transaksi === 'masuk' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {item.jenis_transaksi === 'masuk' ? 'Setoran' : 'Penarikan'}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {item.jenis_transaksi === 'masuk' && item.sampah ? 
                                                        `Setoran ${item.sampah.kategori?.nama_kategori || ''} (${item.sampah.total_sampah} KG)` 
                                                        : item.keterangan
                                                    }
                                                </TableCell>
                                                <TableCell className={`text-right font-medium ${item.jenis_transaksi === 'masuk' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {formatRupiah(item.jumlah_saldo)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan="4" className="text-center py-10">Belum ada data transaksi.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}