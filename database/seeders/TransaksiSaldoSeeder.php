<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Sampah;
use App\Models\TransaksiSaldo;
use Faker\Factory as Faker;

class TransaksiSaldoSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('id_ID');
        $users = User::all();
        $sampahs = Sampah::all();

        if ($users->count() == 0) {
            $this->command->warn('Tidak ada user di database.');
            return;
        }

        for ($i = 1; $i <= 50; $i++) {
            $user = $users->random();
            $jenisTransaksi = $faker->randomElement(['masuk', 'keluar']);
            $jumlahSaldo = $faker->randomFloat(2, 5000, 500000);
            $saldoSebelum = $faker->randomFloat(2, 0, 1000000);
            
            // Hitung saldo sesudah berdasarkan jenis transaksi
            $saldoSesudah = $jenisTransaksi === 'masuk' 
                ? $saldoSebelum + $jumlahSaldo 
                : max(0, $saldoSebelum - $jumlahSaldo);

            TransaksiSaldo::create([
                'user_id' => $user->id,
                'sampah_id' => $sampahs->count() > 0 ? $sampahs->random()->id : null,
                'jenis_transaksi' => $jenisTransaksi,
                'jumlah_saldo' => $jumlahSaldo,
                'saldo_sebelum' => $saldoSebelum,
                'saldo_sesudah' => $saldoSesudah,
                'keterangan' => $faker->randomElement([
                    'Penjualan sampah plastik',
                    'Penjualan sampah kertas', 
                    'Penarikan saldo',
                    'Bonus kegiatan lingkungan',
                    'Penjualan sampah organik',
                    'Transfer ke rekening'
                ]),
                'status' => $faker->randomElement(['pending', 'berhasil', 'gagal']),
                'tanggal_transaksi' => $faker->dateTimeBetween('-6 months', 'now'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('50 Transaksi Saldo berhasil dibuat.');
    }
}