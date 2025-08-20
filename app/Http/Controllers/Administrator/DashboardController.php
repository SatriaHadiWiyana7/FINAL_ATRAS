<?php

namespace App\Http\Controllers\Administrator;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Sampah;
use App\Models\Kategori;
use App\Models\TransaksiSaldo;
use Flowframe\Trend\Trend;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // --- DATA UNTUK CARD ---
        $totalNasabah = User::where('role', 'user')->count();
        $totalKategori = Kategori::count();
        $totalSampah = Sampah::sum('total_sampah');
        $totalPemasukan = TransaksiSaldo::where('jenis_transaksi', 'masuk')->sum('jumlah_saldo');
        $totalPengeluaran = TransaksiSaldo::where('jenis_transaksi', 'keluar')->sum('jumlah_saldo');

        // --- DATA UNTUK GRAFIK ---
        $endDate = now()->endOfDay();
        $startDate = now()->subDays(30)->startOfDay(); // Ambil data 30 hari terakhir

        // 1. Data untuk Grafik Setoran Sampah (Bar Chart)
        $grafikSetoranSampah = Trend::model(Sampah::class)
            ->between(start: $startDate, end: $endDate)
            ->perDay()
            ->sum('total_sampah');

        // 2. Data untuk Grafik Keuangan (Line Chart)
        $grafikPemasukan = Trend::query(TransaksiSaldo::where('jenis_transaksi', 'masuk'))
            ->between(start: $startDate, end: $endDate)
            ->perDay()
            ->sum('jumlah_saldo');

        $grafikPengeluaran = Trend::query(TransaksiSaldo::where('jenis_transaksi', 'keluar'))
            ->between(start: $startDate, end: $endDate)
            ->perDay()
            ->sum('jumlah_saldo');

        // 3. Kirim semua data ke Inertia
        return Inertia::render('Administrator/Dashboard', [
            // Data Card
            'totalNasabah' => $totalNasabah,
            'totalKategori' => $totalKategori,
            'totalSampah' => $totalSampah,
            'totalPemasukan' => $totalPemasukan,
            'totalPengeluaran' => $totalPengeluaran,
            
            // Data untuk kedua grafik
            'grafikSetoranSampah' => $grafikSetoranSampah, // <-- DATA BARU
            'grafikPemasukan' => $grafikPemasukan,
            'grafikPengeluaran' => $grafikPengeluaran,
        ]);
    }
}