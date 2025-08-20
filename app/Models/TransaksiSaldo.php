<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TransaksiSaldo extends Model
{
    use HasFactory;

    protected $table = 'transaksi_saldo';

    protected $fillable = [
        'user_id',
        'sampah_id',
        'jenis_transaksi',
        'jumlah_saldo',
        'saldo_sebelum',
        'saldo_sesudah',
        'keterangan',
        'status',
        'tanggal_transaksi'
    ];

    protected $casts = [
        'jumlah_saldo' => 'decimal:2',
        'saldo_sebelum' => 'decimal:2',
        'saldo_sesudah' => 'decimal:2',
        'tanggal_transaksi' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Konstanta untuk jenis transaksi
    const JENIS_MASUK = 'masuk';
    const JENIS_KELUAR = 'keluar';

    // Konstanta untuk status
    const STATUS_PENDING = 'pending';
    const STATUS_BERHASIL = 'berhasil';
    const STATUS_GAGAL = 'gagal';

    /**
     * Relasi ke model User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke model Sampah
     */
    public function sampah()
    {
        return $this->belongsTo(Sampah::class);
    }

    /**
     * Scope untuk filter berdasarkan jenis transaksi
     */
    public function scopeMasuk($query)
    {
        return $query->where('jenis_transaksi', self::JENIS_MASUK);
    }

    public function scopeKeluar($query)
    {
        return $query->where('jenis_transaksi', self::JENIS_KELUAR);
    }

    /**
     * Scope untuk filter berdasarkan status
     */
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeBerhasil($query)
    {
        return $query->where('status', self::STATUS_BERHASIL);
    }

    public function scopeGagal($query)
    {
        return $query->where('status', self::STATUS_GAGAL);
    }

    /**
     * Scope untuk filter berdasarkan periode
     */
    public function scopePeriode($query, $start, $end)
    {
        return $query->whereBetween('tanggal_transaksi', [$start, $end]);
    }

    /**
     * Accessor untuk format jumlah saldo
     */
    public function getJumlahSaldoFormattedAttribute()
    {
        return 'Rp ' . number_format($this->jumlah_saldo, 0, ',', '.');
    }

    public function getSaldoSebelumFormattedAttribute()
    {
        return 'Rp ' . number_format($this->saldo_sebelum, 0, ',', '.');
    }

    public function getSaldoSesudahFormattedAttribute()
    {
        return 'Rp ' . number_format($this->saldo_sesudah, 0, ',', '.');
    }

    /**
     * Accessor untuk format jenis transaksi
     */
    public function getJenisTransaksiFormattedAttribute()
    {
        return ucfirst($this->jenis_transaksi);
    }

    /**
     * Accessor untuk format status
     */
    public function getStatusFormattedAttribute()
    {
        return ucfirst($this->status);
    }

    /**
     * Check methods
     */
    public function isMasuk()
    {
        return $this->jenis_transaksi === self::JENIS_MASUK;
    }

    public function isKeluar()
    {
        return $this->jenis_transaksi === self::JENIS_KELUAR;
    }

    public function isPending()
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isBerhasil()
    {
        return $this->status === self::STATUS_BERHASIL;
    }

    public function isGagal()
    {
        return $this->status === self::STATUS_GAGAL;
    }

    /**
     * Static method untuk membuat transaksi
     */
    public static function createTransaksi($userId, $jenisTransaksi, $jumlahSaldo, $keterangan = null, $sampahId = null)
    {
        $user = User::find($userId);
        $saldoSebelum = $user->saldo;
        
        $saldoSesudah = $jenisTransaksi === self::JENIS_MASUK 
            ? $saldoSebelum + $jumlahSaldo 
            : $saldoSebelum - $jumlahSaldo;

        return self::create([
            'user_id' => $userId,
            'sampah_id' => $sampahId,
            'jenis_transaksi' => $jenisTransaksi,
            'jumlah_saldo' => $jumlahSaldo,
            'saldo_sebelum' => $saldoSebelum,
            'saldo_sesudah' => $saldoSesudah,
            'keterangan' => $keterangan,
            'status' => self::STATUS_PENDING,
            'tanggal_transaksi' => now(),
        ]);
    }
}