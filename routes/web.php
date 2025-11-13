<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\Auth\RegisterBarberoController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/barbero/{slug}', function ($slug) {
    $barbero = User::where('slug', $slug)->firstOrFail();

    return Inertia::render('barbero/dashboard', [
        'barbero' => $barbero,
    ]);
})->name('barbero.dashboard');

Route::get('/register/barbero', [RegisterBarberoController::class, 'create'])->name('register.barbero.view');
Route::post('/register/barbero', [RegisterBarberoController::class, 'store'])->name('register.barbero');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
