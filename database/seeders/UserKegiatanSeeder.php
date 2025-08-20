<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Konten;
use App\Models\UserKegiatan;
use Faker\Factory as Faker;

class UserKegiatanSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('id_ID');
        $users = User::all();
        $kontens = Konten::all();

        if ($users->count() == 0 || $kontens->count() == 0) {
            $this->command->warn('Tidak ada user atau konten di database.');
            return;
        }

        $createdCount = 0;
        $attempts = 0;
        $maxAttempts = 200; // Batasi percobaan untuk menghindari infinite loop

        while ($createdCount < 50 && $attempts < $maxAttempts) {
            $user = $users->random();
            $konten = $kontens->random();
            
            // Cek apakah kombinasi user_id dan konten_id sudah ada
            $exists = UserKegiatan::where('user_id', $user->id)
                                 ->where('konten_id', $konten->id)
                                 ->exists();
            
            if (!$exists) {
                UserKegiatan::create([
                    'user_id' => $user->id,
                    'konten_id' => $konten->id,
                    'status_kehadiran' => $faker->randomElement(['hadir', 'tidak hadir', 'pending']),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $createdCount++;
            }
            
            $attempts++;
        }

        $this->command->info("{$createdCount} User Kegiatan berhasil dibuat dari {$attempts} percobaan.");
    }
}