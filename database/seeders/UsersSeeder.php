<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID'); // Menggunakan locale Indonesia
        $batchSize = 100; // Insert data dalam batch untuk optimasi
        $totalUsers = 1500;
        $batches = ceil($totalUsers / $batchSize);
        
        // Daftar nama depan dan belakang Indonesia
        $namaDepan = [
            'Adi', 'Agus', 'Ahmad', 'Bambang', 'Budi', 'Dedi', 'Eko', 'Farid', 'Gunawan', 'Hadi',
            'Indra', 'Joko', 'Kohar', 'Luki', 'Made', 'Nardi', 'Oka', 'Putu', 'Rudi', 'Sari',
            'Toni', 'Usman', 'Veri', 'Wahyu', 'Yudi', 'Zainal', 'Ayu', 'Dewi', 'Fitri', 'Ika',
            'Lestari', 'Maya', 'Nita', 'Putri', 'Ratna', 'Sinta', 'Tari', 'Umi', 'Vina', 'Wati'
        ];
        
        $namaBelakang = [
            'Santoso', 'Wijaya', 'Kurniawan', 'Sari', 'Pratama', 'Utama', 'Putra', 'Putri', 'Wardani',
            'Susanto', 'Handoko', 'Permana', 'Setiawan', 'Rahayu', 'Lestari', 'Safitri', 'Maharani',
            'Purnama', 'Saputra', 'Saputri', 'Wibowo', 'Nugroho', 'Suryadi', 'Kusuma', 'Indah',
            'Ayu', 'Fitriani', 'Anggraini', 'Pertiwi', 'Ningrum'
        ];
        
        echo "Generating $totalUsers users in $batches batches...\n";
        
        for ($batch = 0; $batch < $batches; $batch++) {
            $users = [];
            $remainingUsers = min($batchSize, $totalUsers - ($batch * $batchSize));
            
            for ($i = 0; $i < $remainingUsers; $i++) {
                $phoneNumber = $this->generateUniquePhoneNumber($faker);
                $fullName = $faker->randomElement($namaDepan) . ' ' . $faker->randomElement($namaBelakang);
                $role = $faker->randomElement(['user', 'user', 'user', 'user', 'admin']); // 80% user, 20% admin
                $saldo = $faker->randomFloat(2, 0, 5000000); // Saldo random 0 - 5 juta
                
                $users[] = [
                    'full_name' => $fullName,
                    'email' => $faker->unique()->safeEmail,
                    'phone_number' => $phoneNumber,
                    'password' => Hash::make('password'), // Default password untuk semua user
                    'role' => $role,
                    'saldo' => $saldo,
                    'created_at' => $faker->dateTimeBetween('-2 years', 'now'),
                    'updated_at' => now(),
                ];
            }
            
            DB::table('users')->insert($users);
            echo "Batch " . ($batch + 1) . " completed - Inserted $remainingUsers users\n";
        }
        
        echo "Successfully created $totalUsers users!\n";
    }
    
    /**
     * Generate unique Indonesian phone number
     *
     * @param \Faker\Generator $faker
     * @return string
     */
    private function generateUniquePhoneNumber($faker)
    {
        // Prefix operator Indonesia
        $prefixes = ['0811', '0812', '0813', '0814', '0815', '0816', '0817', '0818', '0819',
                    '0821', '0822', '0823', '0852', '0853', '0851', '0857', '0858'];
        
        $prefix = $faker->randomElement($prefixes);
        $suffix = $faker->numerify('########'); // 8 digit random
        
        return $prefix . $suffix;
    }
}