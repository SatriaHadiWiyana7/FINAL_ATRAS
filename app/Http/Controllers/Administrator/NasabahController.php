<?php

namespace App\Http\Controllers\Administrator;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class NasabahController extends Controller
{
    public function index()
    {
        $nasabah = User::where('role', 'user')->get()->map(function ($user) {
            $user->formatted_created_at = Carbon::parse($user->created_at)->format('Y-m-d');
            return $user;
        });

        return Inertia::render('Administrator/Nasabah', [
            'nasabah' => $nasabah
        ]);
    }
    

    public function store(Request $request)
    {
        $request->validate([
            'phoneNumber' => 'required|min:8|unique:users,phone_number',
            'fullName' => 'required|min:3',
            'password' => 'required|min:8'
        ], [
            'phoneNumber.required' => 'No handphone harus diisi',
            'phoneNumber.min' => 'Minimal 8 karakter',
            'fullName.required' => 'Nama harus diisi',
            'fullName.min' => 'Minimal 3 karakter',
            'phoneNumber.unique' => "No handphone anda sudah digunakan, silahkan login",
            'password.required' => 'Password harus diisi',
            'password.min' => 'Password minimal 8 karakter',

        ]);
        User::create([
            'full_name' => $request->fullName,
            'phone_number' => $request->phoneNumber,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('message', 'Nasabah berhasil ditambahkan');
    }
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'phoneNumber' => [
                'required',
                'min:8',
                function ($attribute, $value, $fail) use ($user) {
                    if ($value !== $user->phone_number && User::where('phone_number', $value)->exists()) {
                        $fail('No handphone sudah digunakan,');
                    }
                },
            ],
            'fullName' => 'required|min:3',
            'password' => [
                'nullable',
                'min:8',
                function ($attribute, $value, $fail) use ($user) {
                    if ($value && User::where('password', Hash::make($value))->where('id', '!=', $user->id)->exists()) {
                        $fail('Password harus unik.');
                    }
                },
            ],
        ], [
            'phoneNumber.required' => 'No handphone harus diisi',
            'phoneNumber.min' => 'Minimal 8 karakter',
            'fullName.required' => 'Nama harus diisi',
            'fullName.min' => 'Minimal 3 karakter',
            'password.required' => 'Password harus diisi',
            'password.min' => 'Password minimal 8 karakter',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $data = [
            'full_name' => $request->fullName,
            'phone_number' => $request->phoneNumber,
        ];
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }
        $user->update($data);
        return redirect()->back()->with('message', 'Nasabah berhasil diupdate');
    }
    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('message', 'Nasabah berhasil dihapus');
    }
}
