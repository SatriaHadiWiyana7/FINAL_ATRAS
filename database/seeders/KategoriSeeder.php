<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');
        
        // Kategori sampah yang umum di Indonesia dengan harga realistis
        $kategoriSampah = [
            // Kategori Plastik
            ['nama' => 'Botol Plastik PET', 'deskripsi' => 'Botol minuman plastik bening', 'harga' => [3000, 5000], 'satuan' => 'kg'],
            ['nama' => 'Kantong Plastik', 'deskripsi' => 'Kantong belanja plastik berbagai ukuran', 'harga' => [2000, 3500], 'satuan' => 'kg'],
            ['nama' => 'Gelas Plastik', 'deskripsi' => 'Gelas sekali pakai plastik', 'harga' => [2500, 4000], 'satuan' => 'kg'],
            ['nama' => 'Ember Plastik', 'deskripsi' => 'Ember bekas kondisi baik', 'harga' => [1500, 2500], 'satuan' => 'kg'],
            ['nama' => 'Mainan Plastik', 'deskripsi' => 'Mainan anak-anak dari plastik', 'harga' => [1000, 2000], 'satuan' => 'kg'],
            ['nama' => 'Tutup Botol Plastik', 'deskripsi' => 'Tutup botol berbagai warna', 'harga' => [4000, 6000], 'satuan' => 'kg'],
            ['nama' => 'Jerigen Plastik', 'deskripsi' => 'Jerigen bekas air mineral', 'harga' => [2000, 3000], 'satuan' => 'kg'],
            ['nama' => 'Pipa PVC', 'deskripsi' => 'Pipa PVC bekas bangunan', 'harga' => [3500, 5500], 'satuan' => 'kg'],
            
            // Kategori Kertas
            ['nama' => 'Kertas Koran', 'deskripsi' => 'Koran bekas kondisi bersih', 'harga' => [1500, 2500], 'satuan' => 'kg'],
            ['nama' => 'Kertas HVS', 'deskripsi' => 'Kertas putih kantor bekas', 'harga' => [2000, 3500], 'satuan' => 'kg'],
            ['nama' => 'Kardus', 'deskripsi' => 'Kardus bekas berbagai ukuran', 'harga' => [2500, 4000], 'satuan' => 'kg'],
            ['nama' => 'Majalah', 'deskripsi' => 'Majalah bekas kondisi baik', 'harga' => [1000, 2000], 'satuan' => 'kg'],
            ['nama' => 'Buku Tulis', 'deskripsi' => 'Buku tulis bekas sekolah', 'harga' => [1500, 2500], 'satuan' => 'kg'],
            ['nama' => 'Kertas Duplex', 'deskripsi' => 'Kertas tebal dari kemasan', 'harga' => [2000, 3000], 'satuan' => 'kg'],
            ['nama' => 'Kertas Kado', 'deskripsi' => 'Kertas pembungkus kado bekas', 'harga' => [500, 1500], 'satuan' => 'kg'],
            
            // Kategori Logam
            ['nama' => 'Besi Tua', 'deskripsi' => 'Scrap besi berbagai bentuk', 'harga' => [4000, 6000], 'satuan' => 'kg'],
            ['nama' => 'Aluminium', 'deskripsi' => 'Kaleng aluminium dan profil', 'harga' => [12000, 18000], 'satuan' => 'kg'],
            ['nama' => 'Tembaga', 'deskripsi' => 'Kabel tembaga dan pipa bekas', 'harga' => [50000, 80000], 'satuan' => 'kg'],
            ['nama' => 'Kuningan', 'deskripsi' => 'Barang-barang kuningan bekas', 'harga' => [35000, 50000], 'satuan' => 'kg'],
            ['nama' => 'Kaleng Bekas', 'deskripsi' => 'Kaleng makanan dan minuman', 'harga' => [3000, 5000], 'satuan' => 'kg'],
            ['nama' => 'Seng', 'deskripsi' => 'Lembaran seng bekas atap', 'harga' => [8000, 12000], 'satuan' => 'kg'],
            ['nama' => 'Stainless Steel', 'deskripsi' => 'Barang stainless steel bekas', 'harga' => [15000, 25000], 'satuan' => 'kg'],
            
            // Kategori Kaca
            ['nama' => 'Botol Kaca Bening', 'deskripsi' => 'Botol kaca bening kondisi utuh', 'harga' => [1000, 2000], 'satuan' => 'kg'],
            ['nama' => 'Botol Kaca Warna', 'deskripsi' => 'Botol kaca berwarna kondisi utuh', 'harga' => [800, 1500], 'satuan' => 'kg'],
            ['nama' => 'Pecahan Kaca', 'deskripsi' => 'Pecahan kaca untuk daur ulang', 'harga' => [500, 1000], 'satuan' => 'kg'],
            ['nama' => 'Kaca Jendela', 'deskripsi' => 'Kaca jendela bekas bangunan', 'harga' => [2000, 3500], 'satuan' => 'kg'],
            
            // Kategori Elektronik
            ['nama' => 'Komponen Elektronik', 'deskripsi' => 'PCB dan komponen elektronik', 'harga' => [8000, 15000], 'satuan' => 'kg'],
            ['nama' => 'Kabel Listrik', 'deskripsi' => 'Kabel listrik berbagai ukuran', 'harga' => [25000, 40000], 'satuan' => 'kg'],
            ['nama' => 'Baterai Bekas', 'deskripsi' => 'Baterai kering bekas', 'harga' => [5000, 8000], 'satuan' => 'kg'],
            ['nama' => 'Handphone Rusak', 'deskripsi' => 'HP rusak untuk spare part', 'harga' => [15000, 30000], 'satuan' => 'unit'],
            
            // Kategori Lainnya
            ['nama' => 'Ban Bekas', 'deskripsi' => 'Ban kendaraan bekas', 'harga' => [8000, 15000], 'satuan' => 'kg'],
            ['nama' => 'Sandal Jepit', 'deskripsi' => 'Sandal jepit bekas', 'harga' => [500, 1000], 'satuan' => 'kg'],
            ['nama' => 'Rambut Manusia', 'deskripsi' => 'Rambut asli untuk wig', 'harga' => [50000, 150000], 'satuan' => 'kg'],
            ['nama' => 'Tulang Sapi', 'deskripsi' => 'Tulang sapi kering', 'harga' => [3000, 5000], 'satuan' => 'kg'],
            ['nama' => 'Minyak Jelantah', 'deskripsi' => 'Minyak goreng bekas', 'harga' => [2000, 4000], 'satuan' => 'liter'],
            ['nama' => 'Aki Bekas', 'deskripsi' => 'Aki kendaraan bekas', 'harga' => [12000, 20000], 'satuan' => 'kg'],
            ['nama' => 'Kayu Bekas', 'deskripsi' => 'Kayu bekas bangunan', 'harga' => [1000, 2500], 'satuan' => 'kg'],
            ['nama' => 'Genteng Bekas', 'deskripsi' => 'Genteng tanah liat bekas', 'harga' => [500, 1500], 'satuan' => 'kg'],
            ['nama' => 'Serbuk Gergaji', 'deskripsi' => 'Limbah serbuk gergaji kayu', 'harga' => [500, 1000], 'satuan' => 'kg'],
            ['nama' => 'Kapas Bekas', 'deskripsi' => 'Kapas dari industri tekstil', 'harga' => [2000, 4000], 'satuan' => 'kg'],
            ['nama' => 'Karet Bekas', 'deskripsi' => 'Potongan karet berbagai jenis', 'harga' => [3000, 6000], 'satuan' => 'kg'],
            ['nama' => 'Styrofoam', 'deskripsi' => 'Styrofoam kemasan bekas', 'harga' => [1000, 2000], 'satuan' => 'kg'],
            ['nama' => 'CD/DVD Bekas', 'deskripsi' => 'Compact disk bekas', 'harga' => [2000, 4000], 'satuan' => 'kg'],
            ['nama' => 'Sepatu Bekas', 'deskripsi' => 'Sepatu bekas kondisi layak pakai', 'harga' => [1000, 3000], 'satuan' => 'kg'],
            ['nama' => 'Tas Bekas', 'deskripsi' => 'Tas dan ransel bekas', 'harga' => [2000, 5000], 'satuan' => 'kg'],
            ['nama' => 'Pakaian Bekas', 'deskripsi' => 'Pakaian layak pakai', 'harga' => [3000, 8000], 'satuan' => 'kg'],
            ['nama' => 'Karpet Bekas', 'deskripsi' => 'Karpet kondisi masih bagus', 'harga' => [2000, 4000], 'satuan' => 'kg'],
            ['nama' => 'Boneka Bekas', 'deskripsi' => 'Boneka dan mainan soft', 'harga' => [1500, 3000], 'satuan' => 'kg'],
            ['nama' => 'Bulu Angsa', 'deskripsi' => 'Bulu angsa untuk isian', 'harga' => [25000, 50000], 'satuan' => 'kg'],
            ['nama' => 'Kain Perca', 'deskripsi' => 'Potongan kain dari konveksi', 'harga' => [2000, 5000], 'satuan' => 'kg'],
            ['nama' => 'Oli Bekas', 'deskripsi' => 'Oli mesin bekas kendaraan', 'harga' => [1000, 2000], 'satuan' => 'liter']
        ];
        
        $kategoris = [];
        
        echo "Generating 50 kategori sampah...\n";
        
        // Shuffle array untuk mendapatkan 50 kategori random
        shuffle($kategoriSampah);
        $selectedKategoris = array_slice($kategoriSampah, 0, 50);
        
        foreach ($selectedKategoris as $index => $kategori) {
            $harga = $faker->numberBetween($kategori['harga'][0], $kategori['harga'][1]);
            $jumlah = $faker->numberBetween(0, 10000); // Stok awal
            
            $kategoris[] = [
                'nama_kategori' => $kategori['nama'],
                'deskripsi' => $kategori['deskripsi'] . ' (per ' . $kategori['satuan'] . ')',
                'harga' => $harga,
                'jumlah' => $jumlah,
                'created_at' => $faker->dateTimeBetween('-2 years', '-1 month'),
                'updated_at' => $faker->dateTimeBetween('-1 month', 'now'),
            ];
        }
        
        // Insert data dalam batch
        DB::table('kategoris')->insert($kategoris);
        
        echo "Successfully created 50 categories!\n";
        
        // Display summary
        $this->displayKategoriSummary();
    }
    
    /**
     * Display kategori summary statistics
     */
    private function displayKategoriSummary()
    {
        echo "\n=== KATEGORI SUMMARY ===\n";
        
        $stats = DB::table('kategoris')
            ->selectRaw('
                COUNT(*) as total_kategori,
                AVG(harga) as avg_harga,
                MIN(harga) as min_harga,
                MAX(harga) as max_harga,
                SUM(jumlah) as total_stok
            ')
            ->first();
        
        echo "Total Categories: " . $stats->total_kategori . "\n";
        echo "Average Price: Rp " . number_format($stats->avg_harga, 0) . "\n";
        echo "Price Range: Rp " . number_format($stats->min_harga) . " - Rp " . number_format($stats->max_harga) . "\n";
        echo "Total Stock: " . number_format($stats->total_stok) . " units\n";
        echo "========================\n";
    }
}