import React from 'react';
import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import InputError from '@/Components/InputError';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import ElevatedContainer from '@/Components/ElevatedContainer';
import { NumericFormat } from 'react-number-format';

// Komponen Form Penarikan terpisah agar lebih rapi
const FormPenarikan = ({ nasabah }) => {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        nasabah_id: '',
        jumlah_penarikan: '',
        keterangan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('administrator.penarikan-saldo.store'), {
            onSuccess: () => reset(),
        });
    };

    const formatRupiah = (number) => {
        if (number === null || typeof number === 'undefined') return "Rp 0";
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Math.floor(number));
    };

    return (
        <>
            {recentlySuccessful && (
                <div className="mb-4 p-4 text-sm text-green-800 bg-green-100 rounded-lg">
                    Penarikan saldo berhasil dicatat!
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="nasabah" className="block text-sm font-medium text-gray-700 mb-2">Pilih Nasabah</label>
                    <select
                        id="nasabah"
                        value={data.nasabah_id}
                        onChange={(e) => setData('nasabah_id', e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">-- Pilih Nama Nasabah --</option>
                        {nasabah.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.full_name} (Saldo: {formatRupiah(item.saldo)})
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.nasabah_id} className="mt-2" />
                </div>
                
                <div>
                    <label htmlFor="jumlah_penarikan" className="block text-sm font-medium text-gray-700 mb-2">Jumlah Penarikan (Rp)</label>
                    <NumericFormat
                        id="jumlah_penarikan"
                        value={data.jumlah_penarikan}
                        onValueChange={(values) => {
                            setData('jumlah_penarikan', values.value);
                        }}
                        thousandSeparator="."
                        decimalSeparator=","
                        customInput={Input}
                        placeholder="Contoh: 50.000"
                    />
                    <InputError message={errors.jumlah_penarikan} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-2">Keterangan (Opsional)</label>
                    <Textarea
                        id="keterangan"
                        value={data.keterangan}
                        onChange={(e) => setData('keterangan', e.target.value)}
                        placeholder="Contoh: Penarikan untuk biaya sekolah"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.keterangan} className="mt-2" />
                </div>

                <div className="pt-4">
                    <Button 
                        type="submit" 
                        disabled={processing} 
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg text-base"
                    >
                        {processing ? 'Memproses...' : 'Tarik Saldo'}
                    </Button>
                </div>
            </form>
        </>
    );
};

// Komponen Tabel Riwayat terpisah
const TabelRiwayat = ({ riwayatPenarikan }) => {
    const formatRupiah = (number) => {
        if (number === null || typeof number === 'undefined') return "Rp 0";
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Math.floor(number));
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Nama Nasabah</TableHead>
                    <TableHead>Jumlah Penarikan</TableHead>
                    <TableHead>Keterangan</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {riwayatPenarikan && riwayatPenarikan.length > 0 ? (
                    riwayatPenarikan.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{new Date(item.tanggal_transaksi).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</TableCell>
                            <TableCell>{item.user ? item.user.full_name : 'N/A'}</TableCell>
                            <TableCell>{formatRupiah(item.jumlah_saldo)}</TableCell>
                            <TableCell>{item.keterangan}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan="5" className="text-center text-gray-500 py-8">
                            Belum ada riwayat penarikan saldo.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

// Komponen Halaman Utama
export default function PenarikanSaldo({ nasabah, riwayatPenarikan = [] }) {
    return (
        <AdministratorLayout>
            <Head title="Penarikan Saldo" />
            
            <ElevatedContainer>
                <h1 className="text-2xl font-bold mb-6">
                    Lakukan Penarikan Saldo
                </h1>
                <FormPenarikan nasabah={nasabah} />
            </ElevatedContainer>
            
            <div className="mt-16">
                <ElevatedContainer>
                    <h1 className="text-2xl font-bold mb-6">Riwayat Penarikan Saldo</h1>
                    <TabelRiwayat riwayatPenarikan={riwayatPenarikan} />
                </ElevatedContainer>
            </div>
            
        </AdministratorLayout>
    );
}