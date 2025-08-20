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
        Schema::table('sampahs', function (Blueprint $table) {
        $table->decimal('harga_saat_itu', 15, 2)->default(0)->after('total_sampah');
        $table->decimal('total_nilai', 15, 2)->default(0)->after('harga_saat_itu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sampahs', function (Blueprint $table) {
            $table->dropColumn(['total_nilai', 'harga_saat_itu']);
        });
    }
};
