<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class TransaksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');
        
        // Ambil semua user yang ada
        $users = DB::table('users')->select('id', 'saldo')->get();
        
        // Ambil semua sampah yang ada untuk referensi transaksi masuk
        $sampahs = DB::table('sampahs')
            ->join('kategoris', 'sampahs.kategori_id', '=', 'kategoris.id')
            ->select('sampahs.id', 'sampahs.user_id', 'sampahs.total_sampah', 'sampahs.tanggal', 'kategoris.harga')
            ->get();
        
        $batchSize = 100;
        $transaksi = [];
        $userSaldoUpdate = [];
        
        echo "Creating transactions for " . count($users) . " users...\n";
        
        foreach ($users as $user) {
            // Reset saldo user untuk kalkulasi ulang
            $currentSaldo = 0;
            
            // 1. Generate transaksi masuk dari penjualan sampah
            $userSampahs = $sampahs->where('user_id', $user->id);
            
            foreach ($userSampahs as $sampah) {
                $jumlahSaldo = $sampah->total_sampah * $sampah->harga;
                $saldoSebelum = $currentSaldo;
                $currentSaldo += $jumlahSaldo;
                
                $transaksi[] = [
                    'user_id' => $user->id,
                    'sampah_id' => $sampah->id, // Always use the actual sampah ID
                    'jenis_transaksi' => 'masuk',
                    'jumlah_saldo' => $jumlahSaldo,
                    'saldo_sebelum' => $saldoSebelum,
                    'saldo_sesudah' => $currentSaldo,
                    'keterangan' => 'Penjualan sampah - ' . number_format($sampah->total_sampah) . ' unit',
                    'status' => 'berhasil',
                    'tanggal_transaksi' => $sampah->tanggal . ' ' . $faker->time(),
                    'created_at' => $sampah->tanggal . ' ' . $faker->time(),
                    'updated_at' => now(),
                ];
            }
            
            // 2. Generate transaksi masuk tambahan (bonus, reward, dll)
            // Use random sampah IDs for these transactions instead of null
            $extraTransactions = $faker->numberBetween(0, 5);
            for ($i = 0; $i < $extraTransactions; $i++) {
                $jumlahSaldo = $faker->numberBetween(5000, 100000);
                $saldoSebelum = $currentSaldo;
                $currentSaldo += $jumlahSaldo;
                
                // Get a random sampah ID from any user for bonus transactions
                $randomSampah = $sampahs->random();
                
                $keteranganMasuk = $faker->randomElement([
                    'Bonus referral teman',
                    'Reward aktivitas bulanan',
                    'Bonus sampah terpilah',
                    'Cashback event bank sampah',
                    'Hadiah kompetisi lingkungan'
                ]);
                
                $transaksi[] = [
                    'user_id' => $user->id,
                    'sampah_id' => $randomSampah->id, // Use random sampah ID instead of null
                    'jenis_transaksi' => 'masuk',
                    'jumlah_saldo' => $jumlahSaldo,
                    'saldo_sebelum' => $saldoSebelum,
                    'saldo_sesudah' => $currentSaldo,
                    'keterangan' => $keteranganMasuk,
                    'status' => 'berhasil',
                    'tanggal_transaksi' => $faker->dateTimeBetween('-1 year', 'now'),
                    'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                    'updated_at' => now(),
                ];
            }
            
            // 3. Generate transaksi keluar (penarikan saldo)
            $withdrawalTransactions = $faker->numberBetween(0, 3);
            for ($i = 0; $i < $withdrawalTransactions; $i++) {
                if ($currentSaldo > 50000) { // Hanya jika saldo cukup
                    $maxWithdrawal = min($currentSaldo * 0.8, $faker->numberBetween(25000, 500000));
                    $jumlahSaldo = $faker->numberBetween(25000, $maxWithdrawal);
                    $saldoSebelum = $currentSaldo;
                    $currentSaldo -= $jumlahSaldo;
                    
                    // Get a random sampah ID for withdrawal transactions too
                    $randomSampah = $sampahs->random();
                    
                    $keteranganKeluar = $faker->randomElement([
                        'Penarikan tunai',
                        'Transfer ke rekening bank',
                        'Pembayaran tagihan listrik',
                        'Pembelian voucher pulsa',
                        'Donasi untuk kegiatan lingkungan'
                    ]);
                    
                    $status = $faker->randomElement(['berhasil', 'berhasil', 'berhasil', 'pending', 'gagal']);
                    
                    // Jika gagal, kembalikan saldo
                    if ($status === 'gagal') {
                        $currentSaldo = $saldoSebelum;
                    }
                    
                    $transaksi[] = [
                        'user_id' => $user->id,
                        'sampah_id' => $randomSampah->id, // Use random sampah ID instead of null
                        'jenis_transaksi' => 'keluar',
                        'jumlah_saldo' => $jumlahSaldo,
                        'saldo_sebelum' => $saldoSebelum,
                        'saldo_sesudah' => $status === 'gagal' ? $saldoSebelum : $currentSaldo,
                        'keterangan' => $keteranganKeluar,
                        'status' => $status,
                        'tanggal_transaksi' => $faker->dateTimeBetween('-6 months', 'now'),
                        'created_at' => $faker->dateTimeBetween('-6 months', 'now'),
                        'updated_at' => now(),
                    ];
                }
            }
            
            // Simpan saldo akhir untuk update user
            $userSaldoUpdate[] = [
                'id' => $user->id,
                'saldo' => $currentSaldo
            ];
            
            // Insert batch jika sudah mencapai batchSize
            if (count($transaksi) >= $batchSize) {
                DB::table('transaksi_saldo')->insert($transaksi);
                echo "Inserted " . count($transaksi) . " transactions\n";
                $transaksi = [];
            }
        }
        
        // Insert sisa transaksi
        if (!empty($transaksi)) {
            DB::table('transaksi_saldo')->insert($transaksi);
            echo "Inserted final " . count($transaksi) . " transactions\n";
        }
        
        // Update saldo users
        echo "Updating user balances...\n";
        foreach ($userSaldoUpdate as $userUpdate) {
            DB::table('users')
                ->where('id', $userUpdate['id'])
                ->update(['saldo' => $userUpdate['saldo']]);
        }
        
        // Generate some pending and failed transactions for realism
        $this->generatePendingAndFailedTransactions($faker, $sampahs);
        
        $totalTransactions = DB::table('transaksi_saldo')->count();
        echo "Successfully created $totalTransactions transactions!\n";
        
        // Display summary statistics
        $this->displayStatistics();
    }
    
    /**
     * Generate some pending and failed transactions for realism
     */
    private function generatePendingAndFailedTransactions($faker, $sampahs)
    {
        $users = DB::table('users')->where('saldo', '>', 50000)->take(50)->get();
        $pendingTransactions = [];
        
        foreach ($users as $user) {
            // Generate pending withdrawal
            if ($faker->boolean(30)) { // 30% chance
                $jumlahSaldo = $faker->numberBetween(25000, min($user->saldo * 0.5, 200000));
                $randomSampah = $sampahs->random();
                
                $pendingTransactions[] = [
                    'user_id' => $user->id,
                    'sampah_id' => $randomSampah->id, // Use random sampah ID instead of null
                    'jenis_transaksi' => 'keluar',
                    'jumlah_saldo' => $jumlahSaldo,
                    'saldo_sebelum' => $user->saldo,
                    'saldo_sesudah' => $user->saldo, // Saldo tidak berubah untuk pending
                    'keterangan' => 'Penarikan dalam proses verifikasi',
                    'status' => 'pending',
                    'tanggal_transaksi' => $faker->dateTimeBetween('-7 days', 'now'),
                    'created_at' => $faker->dateTimeBetween('-7 days', 'now'),
                    'updated_at' => now(),
                ];
            }
            
            // Generate failed transaction
            if ($faker->boolean(20)) { // 20% chance
                $jumlahSaldo = $faker->numberBetween(10000, 100000);
                $randomSampah = $sampahs->random();
                
                $pendingTransactions[] = [
                    'user_id' => $user->id,
                    'sampah_id' => $randomSampah->id, // Use random sampah ID instead of null
                    'jenis_transaksi' => 'keluar',
                    'jumlah_saldo' => $jumlahSaldo,
                    'saldo_sebelum' => $user->saldo,
                    'saldo_sesudah' => $user->saldo, // Saldo tidak berubah untuk gagal
                    'keterangan' => 'Penarikan gagal - ' . $faker->randomElement([
                        'Rekening tujuan tidak valid',
                        'Saldo tidak mencukupi',
                        'Sistem maintenance',
                        'Verifikasi identitas diperlukan'
                    ]),
                    'status' => 'gagal',
                    'tanggal_transaksi' => $faker->dateTimeBetween('-30 days', 'now'),
                    'created_at' => $faker->dateTimeBetween('-30 days', 'now'),
                    'updated_at' => now(),
                ];
            }
        }
        
        if (!empty($pendingTransactions)) {
            DB::table('transaksi_saldo')->insert($pendingTransactions);
            echo "Added " . count($pendingTransactions) . " pending/failed transactions\n";
        }
    }
    
    /**
     * Display summary statistics
     */
    private function displayStatistics()
    {
        echo "\n=== TRANSACTION SUMMARY ===\n";
        
        $stats = DB::table('transaksi_saldo')
            ->selectRaw('
                COUNT(*) as total_transactions,
                COUNT(CASE WHEN jenis_transaksi = "masuk" THEN 1 END) as transaksi_masuk,
                COUNT(CASE WHEN jenis_transaksi = "keluar" THEN 1 END) as transaksi_keluar,
                COUNT(CASE WHEN status = "berhasil" THEN 1 END) as berhasil,
                COUNT(CASE WHEN status = "pending" THEN 1 END) as pending,
                COUNT(CASE WHEN status = "gagal" THEN 1 END) as gagal,
                SUM(CASE WHEN jenis_transaksi = "masuk" AND status = "berhasil" THEN jumlah_saldo ELSE 0 END) as total_saldo_masuk,
                SUM(CASE WHEN jenis_transaksi = "keluar" AND status = "berhasil" THEN jumlah_saldo ELSE 0 END) as total_saldo_keluar
            ')
            ->first();
        
        $totalUserBalance = DB::table('users')->sum('saldo');
        
        echo "Total Transactions: " . number_format($stats->total_transactions) . "\n";
        echo "- Transactions In: " . number_format($stats->transaksi_masuk) . "\n";
        echo "- Transactions Out: " . number_format($stats->transaksi_keluar) . "\n";
        echo "- Successful: " . number_format($stats->berhasil) . "\n";
        echo "- Pending: " . number_format($stats->pending) . "\n";
        echo "- Failed: " . number_format($stats->gagal) . "\n";
        echo "\nTotal Money In: Rp " . number_format($stats->total_saldo_masuk) . "\n";
        echo "Total Money Out: Rp " . number_format($stats->total_saldo_keluar) . "\n";
        echo "Current User Balances: Rp " . number_format($totalUserBalance) . "\n";
        echo "=========================\n";
    }
}