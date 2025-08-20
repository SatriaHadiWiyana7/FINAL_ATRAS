<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'full_name' => 'Administrator',
            'email' => 'admin@mail.com',
            'phone_number' => null,
            'password' => bcrypt('Admin#1234'),
            'role' => 'admin'
        ]);
    }
}
