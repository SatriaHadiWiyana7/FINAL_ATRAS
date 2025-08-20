<?php

namespace App\Http\Controllers\Administrator;

use Inertia\Inertia;
use App\Models\Konten;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class KelolaKontenController extends Controller
{
    public function index()
    {
        $konten = Konten::all();
        return Inertia::render('Administrator/KelolaKonten', compact('konten'));
    }
    public function get_content(){
        $konten = Konten::all();
        return json_encode($konten);
    } 
    public function store(Request $request)
    {
        $request->validate([
            'namaKegiatan' => 'required|string',
            'deskripsiKegiatan' => 'required|string',
            'tanggalKegiatan' => 'required|date',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = [
            'nama_kegiatan' => $request->namaKegiatan,
            'deskripsi' => $request->deskripsiKegiatan,
            'tanggal_kegiatan' => $request->tanggalKegiatan,
        ];

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->file('image')->storeAs('public/konten', $imageName);
            $data['foto_kegiatan'] = $imageName;
        }
        Konten::create($data);
        return redirect()->back()->with('message', 'Kegiatan berhasil disimpan');
    }
    public function update(Request $request, Konten $konten) {
        $request->validate([
            'namaKegiatan' => 'required|string',
            'deskripsiKegiatan' => 'required|string',
            'tanggalKegiatan' => 'required|date',
        ]);

        $data = [
            'nama_kegiatan' => $request->namaKegiatan,
            'deskripsi' => $request->deskripsiKegiatan,
            'tanggal_kegiatan' => $request->tanggalKegiatan,
        ];
        $konten->update($data);
        return back()->with('message', 'Kegiatan berhasil diupdate');
    }

    public function destroy(Konten $konten)
    {
        $konten->delete();
        return back()->with('message', 'Kegiatan berhasil dihapus');
    }
}
