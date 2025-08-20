<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class KontenSeeder extends Seeder
{
    /**
     * Run the database seeds - Simple version with shorter descriptions
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');
        
        // Simple kegiatan templates with short descriptions
        $kegiatanList = [
            ['nama' => 'Sosialisasi Bank Sampah RT 05', 'deskripsi' => 'Kegiatan sosialisasi program bank sampah kepada warga RT 05'],
            ['nama' => 'Pelatihan Pemilahan Sampah', 'deskripsi' => 'Workshop pelatihan cara memilah sampah organik dan anorganik'],
            ['nama' => 'Lomba Kreativitas Daur Ulang', 'deskripsi' => 'Kompetisi membuat kerajinan dari barang bekas untuk anak-anak'],
            ['nama' => 'Gotong Royong Pembersihan', 'deskripsi' => 'Kegiatan bersih-bersih lingkungan dan pengumpulan sampah'],
            ['nama' => 'Workshop Pengolahan Kompos', 'deskripsi' => 'Pelatihan membuat kompos dari sampah organik rumah tangga'],
            ['nama' => 'Bazar Produk Daur Ulang', 'deskripsi' => 'Pameran dan penjualan produk hasil kerajinan daur ulang'],
            ['nama' => 'Kampanye 3R di Sekolah', 'deskripsi' => 'Kampanye Reduce Reuse Recycle di sekolah-sekolah'],
            ['nama' => 'Penanaman Pohon dari Dana Bank Sampah', 'deskripsi' => 'Program penghijauan menggunakan dana hasil penjualan sampah'],
            ['nama' => 'Training Manajemen Bank Sampah', 'deskripsi' => 'Pelatihan pengelolaan administrasi dan keuangan bank sampah'],
            ['nama' => 'Kunjungan Studi Banding', 'deskripsi' => 'Kunjungan ke bank sampah lain untuk berbagi pengalaman'],
            ['nama' => 'Festival Lingkungan Hidup', 'deskripsi' => 'Festival tahunan dengan tema lingkungan hidup dan daur ulang'],
            ['nama' => 'Edukasi Sampah di SD', 'deskripsi' => 'Program edukasi pengelolaan sampah untuk siswa sekolah dasar'],
            ['nama' => 'Pembagian Bibit Tanaman', 'deskripsi' => 'Distribusi bibit tanaman gratis untuk warga dari dana bank sampah'],
            ['nama' => 'Demo Pengolahan Minyak Jelantah', 'deskripsi' => 'Demonstrasi mengolah minyak jelantah menjadi sabun'],
            ['nama' => 'Rapat Evaluasi Bulanan', 'deskripsi' => 'Rapat rutin evaluasi kinerja dan program bank sampah'],
            ['nama' => 'Aksi Bersih Sungai', 'deskripsi' => 'Kegiatan membersihkan sungai dari sampah plastik'],
            ['nama' => 'Penyuluhan Bahaya Plastik', 'deskripsi' => 'Seminar tentang dampak negatif plastik sekali pakai'],
            ['nama' => 'Pembentukan Bank Sampah Baru', 'deskripsi' => 'Inisiasi pembentukan unit bank sampah di kelurahan tetangga'],
            ['nama' => 'Operasi Penimbangan Rutin', 'deskripsi' => 'Kegiatan rutin penimbangan sampah dari nasabah bank sampah'],
            ['nama' => 'Workshop Craft Plastik', 'deskripsi' => 'Pelatihan membuat kerajinan tas dan dompet dari sampah plastik']
        ];
        
        $kontens = [];
        
        echo "Generating 20 konten kegiatan (simple version)...\n";
        
        for ($i = 0; $i < 20; $i++) {
            $kegiatan = $kegiatanList[$i];
            
            // Simple date generation - only past dates
            $tanggalKegiatan = $faker->dateTimeBetween('-1 year', 'now');
            
            // Simple photo filename
            $fotoKegiatan = 'kegiatan_' . $faker->numberBetween(1000000000, 9999999999) . '.jpg';
            
            $kontens[] = [
                'nama_kegiatan' => $kegiatan['nama'],
                'deskripsi' => $kegiatan['deskripsi'], // Max 255 chars, should be safe
                'tanggal_kegiatan' => $tanggalKegiatan->format('Y-m-d'),
                'foto_kegiatan' => $fotoKegiatan,
                'created_at' => $tanggalKegiatan,
                'updated_at' => now(),
            ];
        }
        
        // Insert all data at once
        DB::table('kontens')->insert($kontens);
        
        echo "Successfully created 20 konten kegiatan!\n";
        
        // Simple summary
        $total = DB::table('kontens')->count();
        echo "Total konten in database: $total\n";
    }
}