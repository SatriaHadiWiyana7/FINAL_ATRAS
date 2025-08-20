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
        // Membuat tabel transaksi_saldo
        Schema::create('transaksi_saldo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('sampah_id')->nullable()->constrained('sampahs')->onDelete('set null');
            $table->enum('jenis_transaksi', ['masuk', 'keluar']);
            $table->decimal('jumlah_saldo', 15, 2);
            $table->decimal('saldo_sebelum', 15, 2)->default(0);
            $table->decimal('saldo_sesudah', 15, 2)->default(0);
            $table->string('keterangan')->nullable();
            $table->enum('status', ['pending', 'berhasil', 'gagal'])->default('pending');
            $table->datetime('tanggal_transaksi')->useCurrent();
            $table->timestamps();
            
            // Indexes untuk optimasi query
            $table->index('jenis_transaksi');
            $table->index('status');
            $table->index('tanggal_transaksi');
        });
        
        // Menambahkan kolom saldo ke tabel users
        Schema::table('users', function (Blueprint $table) {
            $table->decimal('saldo', 15, 2)->default(0)->after('role');
            $table->index('saldo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_saldo');
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['saldo']);
            $table->dropColumn('saldo');
        });
    }
};