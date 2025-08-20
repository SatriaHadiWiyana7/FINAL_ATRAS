import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/Button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { flash } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        phone_number: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onError: () => {
                setData('password', '');
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk - SIMBAH" />
            
            {/* Welcome Section */}
            <div className="text-center mb-8 mt-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Selamat Datang Kembali!
                </h1>
                <p className="text-gray-600">
                    Masuk ke akun Anda untuk melanjutkan perjalanan menuju lingkungan yang lebih bersih
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
                            autoFocus={true}
                            onChange={(e) => setData('phone_number', e.target.value)}
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
                            placeholder="Masukkan password"
                            value={data.password}
                            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
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

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                    </label>
                    
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                {/* Submit Button */}
                <Button 
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl" 
                    disabled={processing}
                >
                    {processing ? 'Sedang masuk...' : 'Masuk'}
                </Button>

                {/* Register Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Belum punya akun?{' '}
                        <Link
                            href={route('register')}
                            className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
                        >
                            Daftar sekarang
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
