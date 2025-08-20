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
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|min:3',
            'phone_number' => 'required|string|max:16|unique:'.User::class,
            'password' => ['required','min:8', 'confirmed', Rules\Password::defaults()],
        ],[
            'name.required' => 'Silahkan isi nama lengkap anda',
            'name.min' => 'Nama minimal 3 Karakter',
            'phone_number' => "Silahkan isi no handphone anda",
            'phone_number.unique' => "No handphone anda sudah digunakan, silahkan login",
            'phone_number.max' => "No handphone maksimal 16 digit",
            'password.required' => "Silahkan isi password anda",
            'password.confirmed' => "Password anda tidak cocok dengan konfirmasi password",
            "password.min" => "Password minimal 8 karakter"
        ]
    );     
    
        try {
            $user = User::create([
                'full_name' => $request->name,
                'phone_number' => $request->phone_number,
                'password' => Hash::make($request->password),
            ]);
            event(new Registered($user));
    
            Auth::login($user);
    
            return redirect()->route('dashboard')->with('success', 'Registration successful!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()])->withInput($request->only('name', 'phone_number'))->with('error', 'Registrasi gagal. Silahkan coba lagi.');
        }
    }
}
