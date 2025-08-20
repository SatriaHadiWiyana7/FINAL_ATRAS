<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_kegiatan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('konten_id')->constrained('kontens')->onDelete('cascade');
            $table->enum('status_kehadiran', ['hadir', 'tidak hadir', 'pending'])->default('pending');
            $table->timestamps();
            
            $table->unique(['user_id', 'konten_id']); // Mencegah duplikasi
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_kegiatan');
    }
};
