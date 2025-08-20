<?php

namespace App\Http\Controllers;

use App\Models\Sampah;
use App\Models\TransaksiSaldo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        // Data untuk Card
        $totalSampah = Sampah::where('user_id', $user->id)->sum('total_sampah');
        $totalSetoran = Sampah::where('user_id', $user->id)->count();
        $saldo = $user->saldo;

        // Ambil semua riwayat transaksi (gabungan setoran dan penarikan)
        $riwayatTransaksi = TransaksiSaldo::with('sampah.kategori')
            ->where('user_id', $user->id)
            ->latest('tanggal_transaksi')
            ->get();

        return Inertia::render('Dashboard', [
            'totalSampah' => $totalSampah,
            'totalSetoran' => $totalSetoran,
            'saldo' => $saldo,
            'riwayatTransaksi' => $riwayatTransaksi,
        ]);
    }
}