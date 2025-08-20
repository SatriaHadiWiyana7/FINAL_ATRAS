<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class SampahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');
        
        // Ambil semua user dan kategori yang ada
        $users = DB::table('users')->where('role', 'user')->pluck('id')->toArray();
        $kategoris = DB::table('kategoris')->select('id', 'nama_kategori', 'harga')->get();
        
        if (empty($users)) {
            echo "No users found! Please run UserSeeder first.\n";
            return;
        }
        
        if ($kategoris->isEmpty()) {
            echo "No categories found! Please run KategoriSeeder first.\n";
            return;
        }
        
        $batchSize = 25;
        $totalSampah = 100;
        $batches = ceil($totalSampah / $batchSize);
        $sampahs = [];
        $kategoriUpdates = [];
        
        echo "Generating $totalSampah sampah records...\n";
        
        // Initialize kategori stock tracking
        foreach ($kategoris as $kategori) {
            $kategoriUpdates[$kategori->id] = 0;
        }
        
        for ($batch = 0; $batch < $batches; $batch++) {
            $currentBatchSampahs = [];
            $remainingSampah = min($batchSize, $totalSampah - ($batch * $batchSize));
            
            for ($i = 0; $i < $remainingSampah; $i++) {
                $userId = $faker->randomElement($users);
                $kategori = $faker->randomElement($kategoris);
                
                // Generate realistic sampah amounts based on category
                $totalSampah = $this->generateRealisticAmount($kategori->nama_kategori, $faker);
                
                // Random date within last 2 years, with more recent dates being more likely
                $tanggal = $this->generateWeightedDate($faker);
                
                $sampahData = [
                    'user_id' => $userId,
                    'kategori_id' => $kategori->id,
                    'total_sampah' => $totalSampah,
                    'tanggal' => $tanggal->format('Y-m-d'),
                    'created_at' => $tanggal,
                    'updated_at' => $faker->dateTimeBetween($tanggal, 'now'),
                ];
                
                $currentBatchSampahs[] = $sampahData;
                
                // Track kategori stock updates
                $kategoriUpdates[$kategori->id] += $totalSampah;
            }
            
            // Insert current batch
            DB::table('sampahs')->insert($currentBatchSampahs);
            echo "Batch " . ($batch + 1) . " completed - Inserted $remainingSampah sampah records\n";
        }
        
        // Update kategori jumlah (stock)
        echo "Updating category stock levels...\n";
        foreach ($kategoriUpdates as $kategoriId => $additionalStock) {
            DB::table('kategoris')
                ->where('id', $kategoriId)
                ->increment('jumlah', $additionalStock);
        }
        
        echo "Successfully created $totalSampah sampah records!\n";
        
        // Display summary
        $this->displaySampahSummary();
    }
    
    /**
     * Generate realistic sampah amount based on category type
     */
    private function generateRealisticAmount($namaKategori, $faker)
    {
        $kategoriLower = strtolower($namaKategori);
        
        // High-value items (smaller quantities)
        if (strpos($kategoriLower, 'tembaga') !== false || 
            strpos($kategoriLower, 'emas') !== false ||
            strpos($kategoriLower, 'perak') !== false ||
            strpos($kategoriLower, 'rambut') !== false) {
            return $faker->numberBetween(1, 10);
        }
        
        // Medium-value items 
        if (strpos($kategoriLower, 'aluminium') !== false ||
            strpos($kategoriLower, 'kuningan') !== false ||
            strpos($kategoriLower, 'stainless') !== false ||
            strpos($kategoriLower, 'elektronik') !== false ||
            strpos($kategoriLower, 'handphone') !== false) {
            return $faker->numberBetween(5, 50);
        }
        
        // Electronics and special items (unit-based)
        if (strpos($kategoriLower, 'aki') !== false ||
            strpos($kategoriLower, 'ban') !== false ||
            strpos($kategoriLower, 'komponen') !== false) {
            return $faker->numberBetween(1, 20);
        }
        
        // Liquid items (liters)
        if (strpos($kategoriLower, 'minyak') !== false ||
            strpos($kategoriLower, 'oli') !== false) {
            return $faker->numberBetween(1, 100);
        }
        
        // Common recyclables (larger quantities)
        if (strpos($kategoriLower, 'plastik') !== false ||
            strpos($kategoriLower, 'botol') !== false ||
            strpos($kategoriLower, 'kantong') !== false ||
            strpos($kategoriLower, 'kertas') !== false ||
            strpos($kategoriLower, 'kardus') !== false ||
            strpos($kategoriLower, 'koran') !== false) {
            return $faker->numberBetween(10, 500);
        }
        
        // Metal scraps
        if (strpos($kategoriLower, 'besi') !== false ||
            strpos($kategoriLower, 'kaleng') !== false ||
            strpos($kategoriLower, 'seng') !== false) {
            return $faker->numberBetween(5, 200);
        }
        
        // Glass items
        if (strpos($kategoriLower, 'kaca') !== false ||
            strpos($kategoriLower, 'pecahan') !== false) {
            return $faker->numberBetween(5, 100);
        }
        
        // Textiles and clothing
        if (strpos($kategoriLower, 'pakaian') !== false ||
            strpos($kategoriLower, 'kain') !== false ||
            strpos($kategoriLower, 'tas') !== false ||
            strpos($kategoriLower, 'sepatu') !== false) {
            return $faker->numberBetween(5, 150);
        }
        
        // Default for other items
        return $faker->numberBetween(5, 100);
    }
    
    /**
     * Generate date with weighted probability (more recent dates more likely)
     */
    private function generateWeightedDate($faker)
    {
        $rand = $faker->numberBetween(1, 100);
        
        if ($rand <= 40) {
            // 40% chance for last 3 months
            return $faker->dateTimeBetween('-3 months', 'now');
        } elseif ($rand <= 70) {
            // 30% chance for 3-12 months ago
            return $faker->dateTimeBetween('-12 months', '-3 months');
        } else {
            // 30% chance for 1-2 years ago
            return $faker->dateTimeBetween('-2 years', '-12 months');
        }
    }
    
    /**
     * Display sampah summary statistics
     */
    private function displaySampahSummary()
    {
        echo "\n=== SAMPAH SUMMARY ===\n";
        
        $stats = DB::table('sampahs')
            ->join('kategoris', 'sampahs.kategori_id', '=', 'kategoris.id')
            ->join('users', 'sampahs.user_id', '=', 'users.id')
            ->selectRaw('
                COUNT(*) as total_records,
                COUNT(DISTINCT sampahs.user_id) as unique_users,
                COUNT(DISTINCT sampahs.kategori_id) as unique_categories,
                SUM(sampahs.total_sampah) as total_quantity,
                SUM(sampahs.total_sampah * kategoris.harga) as total_value,
                AVG(sampahs.total_sampah * kategoris.harga) as avg_transaction_value
            ')
            ->first();
        
        echo "Total Records: " . number_format($stats->total_records) . "\n";
        echo "Unique Users: " . $stats->unique_users . "\n";
        echo "Unique Categories: " . $stats->unique_categories . "\n";
        echo "Total Quantity: " . number_format($stats->total_quantity) . " units\n";
        echo "Total Value: Rp " . number_format($stats->total_value) . "\n";
        echo "Average Transaction: Rp " . number_format($stats->avg_transaction_value) . "\n";
        
        // Top categories by quantity
        echo "\nTop 5 Categories by Quantity:\n";
        $topCategories = DB::table('sampahs')
            ->join('kategoris', 'sampahs.kategori_id', '=', 'kategoris.id')
            ->select('kategoris.nama_kategori', DB::raw('SUM(sampahs.total_sampah) as total'))
            ->groupBy('kategoris.id', 'kategoris.nama_kategori')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();
        
        foreach ($topCategories as $index => $category) {
            echo ($index + 1) . ". " . $category->nama_kategori . ": " . number_format($category->total) . " units\n";
        }
        
        echo "===================\n";
    }
}