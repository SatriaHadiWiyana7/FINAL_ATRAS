<?php

namespace Database\Seeders;

use App\Models\TransaksiSaldo;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;     

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // $this->call(UsersSeeder::class);              
        $this->call(TransaksiSeeder::class);              
        $this->call(KategoriSeeder::class);              
        $this->call(KontenSeeder::class);              
        $this->call(SampahSeeder::class);              
        $this->call(AdminSeeder::class);              
        $this->call(UserProfileSeeder::class);              
        $this->call(UserKegiatanSeeder::class);              
        $this->call(TransaksiSaldoSeeder::class);              
        $this->call(UsersSeeder::class);              
    }
}
