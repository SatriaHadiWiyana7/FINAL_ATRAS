import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { User, Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const { flash } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");                     
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onError: () => {
                setData('password', '');
                setData('password_confirmation', '');
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar - SIMBAH" />
            
            {/* Welcome Section */}
            <div className="text-center mb-8 mt-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Bergabunglah dengan Kami!
                </h1>
                <p className="text-gray-600">
                    Daftar sekarang untuk memulai perjalanan menuju lingkungan yang lebih bersih bersama SIMBAH
                </p>
            </div>

            {/* Flash Messages */}
            {flash.message && (
                <div className="flex items-center p-4 mb-6 text-sm rounded-lg bg-green-50 border border-green-200 text-green-800" role="alert">
                    <CheckCircle className="flex-shrink-0 inline w-5 h-5 me-3 text-green-500" />
                    <div className="font-medium">{flash.message}</div>
                </div>
            )}
            
            {flash.error && (
                <div className="flex items-center p-4 mb-6 text-sm rounded-lg bg-red-50 border border-red-200 text-red-800" role="alert">
                    <AlertCircle className="flex-shrink-0 inline w-5 h-5 me-3 text-red-500" />
                    <div className="font-medium">{flash.error}</div>
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-sm font-semibold text-gray-700" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Masukkan nama lengkap"
                            value={data.name}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                            autoComplete="name"
                            autoFocus={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1" />
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                    <InputLabel htmlFor="phone_number" value="No Handphone" className="text-sm font-semibold text-gray-700" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="phone_number"
                            type="tel"
                            name="phone_number"
                            placeholder="Masukkan nomor handphone"
                            value={data.phone_number}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                            autoComplete="phone_number"
                            onChange={(e) => setData("phone_number", e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.phone_number} className="mt-1" />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <InputLabel htmlFor="password" value="Password" className="text-sm font-semibold text-gray-700" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Minimal 8 karakter"
                            value={data.password}
                            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                            autoComplete="new-password"
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Password Confirmation Field */}
                <div className="space-y-2">
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" className="text-sm font-semibold text-gray-700" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password_confirmation"
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            name="password_confirmation"
                            placeholder="Ulangi password"
                            value={data.password_confirmation}
                            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                            autoComplete="new-password"
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                        >
                            {showPasswordConfirmation ? (
                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                {/* Submit Button */}
                <Button 
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl" 
                    disabled={processing}
                >
                    {processing ? 'Sedang mendaftar...' : 'Daftar'}
                </Button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link
                            href={route('login')}
                            className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
                        >
                            Masuk sekarang
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
