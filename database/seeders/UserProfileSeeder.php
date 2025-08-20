<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProfile;
use Faker\Factory as Faker;

class UserProfileSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('id_ID');
        
        // Ambil semua user yang belum memiliki profile menggunakan subquery
        $existingProfileUserIds = UserProfile::pluck('user_id')->toArray();
        $usersWithoutProfile = User::whereNotIn('id', $existingProfileUserIds)->get();
        
        if ($usersWithoutProfile->count() == 0) {
            $this->command->info('Semua user sudah memiliki profile.');
            return;
        }

        foreach ($usersWithoutProfile as $user) {
            UserProfile::create([
                'user_id' => $user->id,
                'alamat' => $faker->address,
                'foto_profil' => 'profile_photos/' . $faker->uuid . '.jpg',
                'jenis_kelamin' => $faker->randomElement(['laki-laki', 'perempuan']),
                'tanggal_lahir' => $faker->dateTimeBetween('-60 years', '-17 years')->format('Y-m-d'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $totalCreated = $usersWithoutProfile->count();
        $this->command->info("{$totalCreated} User Profiles berhasil dibuat untuk semua user.");
    }
}