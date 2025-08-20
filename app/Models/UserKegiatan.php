<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserKegiatan extends Model
{
    use HasFactory;

    protected $table = 'user_kegiatan';

    protected $fillable = [
        'user_id',
        'konten_id', 
        'status_kehadiran'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Status kehadiran yang valid
    const STATUS_HADIR = 'hadir';
    const STATUS_TIDAK_HADIR = 'tidak hadir';
    const STATUS_PENDING = 'pending';

    /**
     * Relasi ke model User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke model Konten
     */
    public function konten()
    {
        return $this->belongsTo(Konten::class);
    }

    /**
     * Scope untuk filter berdasarkan status kehadiran
     */
    public function scopeHadir($query)
    {
        return $query->where('status_kehadiran', self::STATUS_HADIR);
    }

    public function scopeTidakHadir($query)
    {
        return $query->where('status_kehadiran', self::STATUS_TIDAK_HADIR);
    }

    public function scopePending($query)
    {
        return $query->where('status_kehadiran', self::STATUS_PENDING);
    }

    /**
     * Accessor untuk format status kehadiran
     */
    public function getStatusKehadiranFormattedAttribute()
    {
        return ucfirst(str_replace('_', ' ', $this->status_kehadiran));
    }

    /**
     * Check apakah user hadir
     */
    public function isHadir()
    {
        return $this->status_kehadiran === self::STATUS_HADIR;
    }

    /**
     * Check apakah user tidak hadir
     */
    public function isTidakHadir()
    {
        return $this->status_kehadiran === self::STATUS_TIDAK_HADIR;
    }

    /**
     * Check apakah status masih pending
     */
    public function isPending()
    {
        return $this->status_kehadiran === self::STATUS_PENDING;
    }
}