import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { User, Lock } from 'lucide-react';

export default function Edit({ auth, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />
            
            {/* Welcome Section */}
            <div className="mb-8">
                <div className="text-left">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Kelola Profil Anda
                    </h1>
                    <p className="text-gray-600">
                        Perbarui informasi profil dan password Anda untuk menjaga keamanan akun
                    </p>
                </div>
            </div>
            
            <div className="w-full space-y-6">
                <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Informasi Profil
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-600 mb-4">
                            Perbarui nama lengkap dan nomor telepon Anda
                        </p>
                        <UpdateProfileInformationForm
                            status={status}
                            className="w-full"
                        />
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            Keamanan Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-600 mb-4">
                            Pastikan password Anda aman dan random untuk menjaga akun tetap aman
                        </p>
                        <UpdatePasswordForm className="w-full" />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
