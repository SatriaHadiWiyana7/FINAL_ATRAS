<?php

namespace App\Http\Controllers\Administrator;

use App\Models\Sampah;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Kategori;
use App\Models\TransaksiSaldo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class KelolaSampahController extends Controller
{
    public function index()
    {
        $kategori = Kategori::all();
        $nasabah = User::where('role', 'user')->orderBy('full_name', 'asc')->get();
        $sampah = Sampah::with(['user', 'kategori'])->orderBy('id', 'desc')->get();
        return Inertia::render('Administrator/KelolaSampah', compact('kategori', 'nasabah', 'sampah'));
    }
    public function sort_by_date()
    {
        $sampah = Sampah::with(['user', 'kategori'])->orderBy('tanggal', 'desc')->get();
        return json_encode($sampah);
    }
    public function sort_by_date_nasabah()
    {
        $sampah = Sampah::with(['user', 'kategori'])->where('user_id', Auth::user()->id)->orderBy('tanggal', 'desc')->get();
        return response()->json($sampah);
    }
    public function sort_by_nama_nasabah_asc()
    {
        $sampah = Sampah::with(['user', 'kategori'])
            ->join('users', 'sampahs.user_id', '=', 'users.id')
            ->orderBy('users.full_name', 'asc')
            ->get(['sampahs.*']);
        return json_encode($sampah);
    }
    public function sort_by_nama_nasabah_desc()
    {
        $sampah = Sampah::with(['user', 'kategori'])
            ->join('users', 'sampahs.user_id', '=', 'users.id')
            ->orderBy('users.full_name', 'desc')
            ->get(['sampahs.*']);
        return json_encode($sampah);
    }
    public function total_sampah_desc(){
        $sampah = Sampah::with(['user', 'kategori'])->orderBy('total_sampah', 'desc')->get();
        return json_encode($sampah);
    } 
    public function total_sampah_nasabah_desc(){
        $sampah = Sampah::with(['user', 'kategori'])->where('user_id', Auth::user()->id)->orderBy('total_sampah', 'desc')->get();
        return response()->json($sampah);
    } 
    public function total_sampah_asc(){
        $sampah = Sampah::with(['user', 'kategori'])->orderBy('total_sampah', 'asc')->get();
        return response()->json($sampah);    
    } 
    public function total_sampah_nasabah_asc(){
        $sampah = Sampah::with(['user', 'kategori'])->where('user_id', Auth::user()->id)->orderBy('total_sampah', 'asc')->get();
        return response()->json($sampah);    
    } 

    public function store(Request $request)
    {
        $request->validate([
            'nasabah' => 'required|exists:users,id',
            'kategori' => 'required|exists:kategoris,id',
            'totalSampah' => 'required|numeric|min:0.1',
        ]);

        // Membungkus semua operasi database dalam satu transaksi
        // Jika salah satu gagal, semua akan dibatalkan (rollback)
        DB::transaction(function () use ($request) {
            // 1. Ambil data penting
            $kategori = Kategori::findOrFail($request->kategori);
            $user = User::findOrFail($request->nasabah);
            $harga_saat_itu = $kategori->harga;
            $berat = $request->totalSampah;
            
            // 2. Hitung total nilai transaksi
            $total_nilai = $harga_saat_itu * $berat;

            // 3. Simpan data ke tabel 'sampahs' dengan detail finansial
            $sampah = Sampah::create([
                'user_id' => $user->id,
                'kategori_id' => $kategori->id,
                'total_sampah' => $berat,
                'harga_saat_itu' => $harga_saat_itu,
                'total_nilai' => $total_nilai,
                'tanggal' => now()
            ]);

            // 4. Catat transaksi di 'transaksi_saldo'
            $saldo_sebelum = $user->saldo;
            TransaksiSaldo::create([
                'user_id' => $user->id,
                'sampah_id' => $sampah->id, // Tautkan ke ID sampah yang baru dibuat
                'jenis_transaksi' => 'masuk',
                'jumlah_saldo' => $total_nilai,
                'saldo_sebelum' => $saldo_sebelum,
                'saldo_sesudah' => $saldo_sebelum + $total_nilai,
                'keterangan' => 'Pemasukan dari setoran: ' . $kategori->nama_kategori,
                'status' => 'berhasil',
                'tanggal_transaksi' => now(),
            ]);

            // 5. Update saldo utama nasabah
            $user->update(['saldo' => $saldo_sebelum + $total_nilai]);
        });

        return redirect()->back()->with('message', 'Setoran sampah berhasil disimpan!');
    }

    public function destroy(Sampah $sampah)
    {
        DB::transaction(function () use ($sampah) {
            // 1. Cari transaksi saldo yang berhubungan dengan sampah ini
            $transaksi = TransaksiSaldo::where('sampah_id', $sampah->id)->first();
            
            if ($transaksi) {
                $user = User::findOrFail($sampah->user_id);
                $nilai_transaksi = $transaksi->jumlah_saldo;

                // 2. Kembalikan saldo user
                $user->update(['saldo' => $user->saldo - $nilai_transaksi]);

                // 3. Hapus catatan transaksi saldonya
                $transaksi->delete();
            }

            // 4. Hapus data sampahnya
            $sampah->delete();
        });
        
        return back()->with('message', 'Data sampah berhasil dihapus dan saldo telah dikembalikan.');
    }

    public function update(Request $request, Sampah $sampah)
    {
        // Untuk menjaga keamanan data, fungsi edit dinonaktifkan.
        // Silakan hapus dan buat ulang data jika ada kesalahan.
        return redirect()->back()->withErrors(['error' => 'Fungsi update tidak diizinkan untuk menjaga integritas data keuangan.']);
    }
}
