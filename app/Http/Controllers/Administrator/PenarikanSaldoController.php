<?php

namespace App\Http\Controllers\Administrator;

use App\Models\User;
use App\Models\TransaksiSaldo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PenarikanSaldoController extends Controller
{
    /**
     * Menampilkan halaman form penarikan saldo.
     */
    public function index()
    {
        // 1. Ambil semua nasabah untuk ditampilkan di dropdown
        $nasabah = User::where('role', 'user')->orderBy('full_name', 'asc')->get();
        
        // 2. Ambil riwayat penarikan
        $riwayatPenarikan = TransaksiSaldo::with('user')
            ->where('jenis_transaksi', 'keluar')
            ->orderBy('tanggal_transaksi', 'desc')
            ->get();
        
        // 3. Kirim SEMUA data dalam satu perintah return
        return Inertia::render('Administrator/PenarikanSaldo', [
            'nasabah' => $nasabah,
            'riwayatPenarikan' => $riwayatPenarikan
        ]);
    }

    /**
     * Memproses dan menyimpan data penarikan saldo.
     */
   public function store(Request $request)
{
    // 1. Tambahkan validasi untuk keterangan
    $request->validate([
        'nasabah_id' => 'required|exists:users,id',
        'jumlah_penarikan' => 'required|numeric|min:1000',
        'keterangan' => 'nullable|string|max:255',
    ], [
        'nasabah_id.required' => 'Nasabah harus dipilih.',
        'jumlah_penarikan.required' => 'Jumlah penarikan harus diisi.',
        'jumlah_penarikan.min' => 'Jumlah penarikan minimal Rp 1.000.',
    ]);

    $user = User::findOrFail($request->nasabah_id);
    $jumlahPenarikan = $request->jumlah_penarikan;

    // 2. Cek apakah saldo mencukupi
    if ($user->saldo < $jumlahPenarikan) {
        return redirect()->back()->withErrors(['jumlah_penarikan' => 'Saldo nasabah tidak mencukupi.']);
    }

    // 3. Lakukan operasi dalam satu transaksi database
    DB::transaction(function () use ($user, $jumlahPenarikan, $request) {
        $saldo_sebelum = $user->saldo;
        $saldo_sesudah = $saldo_sebelum - $jumlahPenarikan;

        // Buat catatan di tabel transaksi_saldo
        TransaksiSaldo::create([
            'user_id' => $user->id,
            'jenis_transaksi' => 'keluar',
            'jumlah_saldo' => $jumlahPenarikan,
            'saldo_sebelum' => $saldo_sebelum,
            'saldo_sesudah' => $saldo_sesudah,
             // 4. Ambil keterangan dari request, atau gunakan default
            'keterangan' => $request->keterangan ?: 'Penarikan saldo tunai',
            'status' => 'berhasil',
            'tanggal_transaksi' => now(),
        ]);

        // Kurangi saldo utama di tabel users
        $user->update(['saldo' => $saldo_sesudah]);
    });

    return redirect()->back()->with('message', 'Penarikan saldo berhasil dicatat.');
    }
}