<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Administrator;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Homepage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('/');

Route::get('/get-konten',[Administrator\KelolaKontenController::class,'get_content'])->name('get-konten');
Route::get('/administrator/login', [Administrator\LoginController::class, 'index'])->middleware('guest');
Route::post('/administrator/login', [Administrator\LoginController::class, 'store'])->name('administrator.login');
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/sort_by_date_nasabah', [Administrator\KelolaSampahController::class, 'sort_by_date_nasabah'])->name('sort_by_date_nasabah');
    Route::get('/total_sampah_nasabah_desc', [Administrator\KelolaSampahController::class, 'total_sampah_nasabah_desc'])->name('total_sampah_nasabah_desc');
    Route::get('/total_sampah_nasabah_asc', [Administrator\KelolaSampahController::class, 'total_sampah_nasabah_asc'])->name('total_sampah_nasabah_asc');
    
    // Profile Routes - moved here to be accessible by all authenticated users
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware([AdminMiddleware::class,'auth'])->group(function () {
    Route::prefix('administrator')->name('administrator.')->group(function () {
        Route::get('/dashboard', [Administrator\DashboardController::class, 'index'])->name('dashboard');
        // Kategori Routes  
        Route::prefix('kategori')->name('kategori.')->group(function () {
            Route::get('/', [Administrator\KategoriController::class, 'index'])->name('index');
            Route::post('/', [Administrator\KategoriController::class, 'store'])->name('store');
            Route::patch('/edit/{kategori}', [Administrator\KategoriController::class, 'update'])->name('update');
            Route::delete('/delete/{kategori}', [Administrator\KategoriController::class, 'destroy'])->name('delete');
        });
        // Nasabah Routes
        Route::prefix('nasabah')->name('nasabah.')->group(function () {
            Route::get('/', [Administrator\NasabahController::class, 'index'])->name('index');
            Route::post('/', [Administrator\NasabahController::class, 'store'])->name('store');
            Route::patch('/edit/{user}', [Administrator\NasabahController::class, 'update'])->name('update');
            Route::delete('/delete/{user}', [Administrator\NasabahController::class, 'destroy'])->name('delete');
        });
        // Kelola Sampah
        Route::prefix('kelola-sampah')->name('kelolaSampah.')->group(function () {
            Route::get('/', [Administrator\KelolaSampahController::class, 'index'])->name('index');
            Route::post('/', [Administrator\KelolaSampahController::class, 'store'])->name('store');
            Route::post('/update/{sampah}', [Administrator\KelolaSampahController::class, 'update'])->name('update');
            Route::delete('/delete/{sampah}', [Administrator\KelolaSampahController::class, 'destroy'])->name('delete');
            Route::get('/sort_by_date', [Administrator\KelolaSampahController::class, 'sort_by_date'])->name('sort_by_date');
            Route::get('/sort_by_nama_nasabah_asc', [Administrator\KelolaSampahController::class, 'sort_by_nama_nasabah_asc'])->name('sort_by_nama_nasabah_asc');
            Route::get('/sort_by_nama_nasabah_desc', [Administrator\KelolaSampahController::class, 'sort_by_nama_nasabah_desc'])->name('sort_by_nama_nasabah_desc');
            Route::get('/total_sampah_desc', [Administrator\KelolaSampahController::class, 'total_sampah_desc'])->name('total_sampah_desc');
            Route::get('/total_sampah_asc', [Administrator\KelolaSampahController::class, 'total_sampah_asc'])->name('total_sampah_asc');
        });
        Route::get('/keuangan', [Administrator\KeuanganController::class, 'index'])->name('keuangan');
        // Kelola Konten
        Route::prefix('kelola-konten')->name('kelola-konten.')->group(function () {
            Route::get('/', [Administrator\KelolaKontenController::class, 'index'])->name('index');
            Route::post('/kelola-konten', [Administrator\KelolaKontenController::class, 'store'])->name('store');
            Route::patch('/kelola-konten/{konten}', [Administrator\KelolaKontenController::class, 'update'])->name('update');
            Route::delete('/kelola-konten/{konten}', [Administrator\KelolaKontenController::class, 'destroy'])->name('delete');
        });
        // Penarikan Saldo
        Route::prefix('penarikan-saldo')->name('penarikan-saldo.')->group(function () {
            Route::get('/', [Administrator\PenarikanSaldoController::class, 'index'])->name('index');
            Route::post('/', [Administrator\PenarikanSaldoController::class, 'store'])->name('store');
        });
        // Logout Route
        Route::post('/logout', [Administrator\LogoutController::class, 'index'])->name('logout');
    });
});


require __DIR__ . '/auth.php';
