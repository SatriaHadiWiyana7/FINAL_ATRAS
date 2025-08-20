import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/Button';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { success, error } from '@/lib/notify';
import { User, Phone, CheckCircle } from 'lucide-react';

export default function UpdateProfileInformation({className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        full_name: user.full_name,
        phone_number: user.phone_number,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => {
                success("Profile berhasil diperbarui!");
            },
            onError: (errors) => {
                error("Profile gagal diperbarui!");
            }
        });
    };
    

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                    <InputLabel htmlFor="full_name" value="Nama Lengkap" className="text-sm font-semibold text-gray-700" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="full_name"
                            type="text"
                            name="full_name"
                            placeholder="Masukkan nama lengkap"
                            value={data.full_name}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                            autoComplete="name"
                            autoFocus={true}
                            onChange={(e) => setData('full_name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.full_name} className="mt-1" />
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
                            autoComplete="tel"
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.phone_number} className="mt-1" />
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4">
                    <Button 
                        disabled={processing}
                        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 transform scale-95"
                        enterTo="opacity-100 transform scale-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 transform scale-100"
                        leaveTo="opacity-0 transform scale-95"
                    >
                        <div className="flex items-center text-sm text-green-600 font-medium">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Tersimpan
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
