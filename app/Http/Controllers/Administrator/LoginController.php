<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class LoginController extends Controller
{
    public function index(){
        return Inertia::render('Administrator/Login');  
    }
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
    
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $request->session()->regenerate();

            return redirect()->intended('administrator/dashboard');     
        }
        return back()->withErrors([
            'phone' => 'The provided credentials do not match our records.',
        ])->withInput($request->only('email'))->with('error', 'Login Gagal! silahkan cek email atau password anda')  ;
    }
}
