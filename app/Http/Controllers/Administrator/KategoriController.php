<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        $kategoris = Kategori::all();
        return Inertia::render('Administrator/Kategori', ['kategoris' => $kategoris]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'namaKategori' => 'required|min:3',
            'deskripsi' => 'required|min:3|max:255',
            'harga' => 'required|numeric',
        ], [
            'namaKategori.required' => 'Nama Kategori harus diisi',
            'namaKategori.min' => 'Minimal 3 karakter',
            'deskripsi.required' => 'Deskripsi harus diisi',
            'deskripsi.min' => 'Minimal 3 karakter',
            'deskripsi.max' => 'Maksimal 255 karakter',
            'harga.required' => 'Harga harus diisi',
            'harga.numeric' => 'Harga harus angka',
        ]);

        Kategori::create([
            'nama_kategori' => $request->namaKategori,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
        ]);
        return redirect()->back()->with('message', 'Kategori berhasil disimpan');
    }
    public function update(Request $request, Kategori $kategori)
    {
        $request->validate([
            'namaKategori' => 'required|min:3',
            'deskripsi' => 'required|min:3|max:255',
            'harga' => 'required|numeric',
        ], [
            'namaKategori.required' => 'Nama Kategori harus diisi',
            'namaKategori.min' => 'Minimal 3 karakter',
            'deskripsi.required' => 'Deskripsi harus diisi',
            'deskripsi.min' => 'Minimal 3 karakter',
            'deskripsi.max' => 'Maksimal 255 karakter',
            'harga.required' => 'Harga harus diisi',
            'harga.numeric' => 'Harga harus angka',
        ]);
        $kategori->update([
            'nama_kategori' => $request->namaKategori,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
        ]);
        return back()->with('message', 'Kategori berhasil diupdate');
    }
    public function destroy(Kategori $kategori)
    {
        $kategori->delete();
        return back()->with('message', 'Kategori berhasil dihapus');
    }
}
