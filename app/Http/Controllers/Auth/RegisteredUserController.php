<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:'.User::class,
        'telefono' => 'required|string|max:20',
        'codigo_barbero' => 'required|string|exists:users,codigo_barbero',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    // Buscar al barbero por su código
    $barbero = User::where('codigo_barbero', $request->codigo_barbero)->where('rol', 'barbero')->first();

    if (! $barbero) {
        // Esto debería estar cubierto por la regla exists, pero cheque extra por seguridad.
        return back()->withErrors(['codigo_barbero' => 'Código de barbero inválido'])->withInput();
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'telefono' => $request->telefono,
        'rol' => 'usuario',
        'barbero_id' => $barbero->id,
        'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    Auth::login($user);

    return to_route('dashboard');
}
}
