<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RegisterBarberoController extends Controller
{
    /**
     * Mostrar vista de registro del barbero.
     */
    public function create()
    {
        return Inertia::render('auth/registerBarbero');
    }

    /**
     * Guardar barbero nuevo.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'telefono' => ['required', 'string', 'max:20'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        // Generar código de barbero único tipo BARB-12345
        do {
            $codigo = 'BARB-' . mt_rand(10000, 99999);
        } while (User::where('codigo_barbero', $codigo)->exists());

        // Generar slug (ej. juan-perez)
        $slug = Str::slug($request->name);

        // Asegurar que el slug sea único
        $baseSlug = $slug;
        $count = 1;
        while (User::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }

        // Crear unique_url (ej. /barberos/juan-perez)
        $uniqueUrl = "/barberos/" . $slug;

        // Crear el barbero
        $barbero = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'telefono' => $request->telefono,
            'codigo_barbero' => $codigo,
            'slug' => $slug,
            'unique_url' => $uniqueUrl,
            'password' => Hash::make($request->password),
            'rol' => 'barbero',
        ]);

        // Iniciar sesión automáticamente
        auth()->login($barbero);

       return redirect()->route('barbero.dashboard', $barbero->slug);

    }
}
