import { useState, useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import ElevatedContainer from "@/Components/ElevatedContainer";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import Button from "@/Components/Button";
import { Head } from "@inertiajs/react";
import ActivityCard from "./ActivityCard";
import { Camera, Trash2, Type, FileText, Calendar } from "lucide-react";
import { success, error } from '@/lib/notify';

export default function KelolaKonten(dataKonten) {
    const [previewImage, setPreviewImage] = useState(null); // Hanya satu preview
    const [imageFile, setImageFile] = useState(null); // Hanya satu file
    const rows = dataKonten.konten;
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        namaKegiatan: "",
        deskripsiKegiatan: "",
        tanggalKegiatan: "",
        image: null, // Hanya satu gambar
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Ambil file pertama saja
        setImageFile(file); // Simpan file untuk upload
        setData('image', file); // Set to form data immediately

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Simpan preview
            };
            reader.readAsDataURL(file); // Membuat preview
        }
    };
    const submit = (e) => {
        e.preventDefault();

        post(route("administrator.kelola-konten.store"), {
            forceFormData: true,
            onSuccess: () => {
                success("Data Konten berhasil ditambahkan!");
                reset();
                setPreviewImage(null);
                setImageFile(null);
            },
            onError: (errors) => {
                error("Gagal menambahkan data konten!");
                console.error("Error response:", errors);
            }
        });
    };

    return (
        <>
            <Head title="Kelola Konten" />
            <AdministratorLayout>
                <ElevatedContainer>
                    <h1 className="text-2xl font-bold mb-6">
                        Tambahkan Data Kegiatan Baru
                    </h1>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="namaKegiatan"
                                value="Nama Kegiatan"
                                className="text-sm font-semibold text-gray-700"
                            />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Type className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="namaKegiatan"
                                    name="namaKegiatan"
                                    type="text"
                                    placeholder="Masukkan Nama Kegiatan"
                                    value={data.namaKegiatan}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                                    autoFocus={true}
                                    onChange={(e) => setData("namaKegiatan", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.namaKegiatan} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="deskripsiKegiatan"
                                value="Deskripsi Kegiatan"
                                className="text-sm font-semibold text-gray-700"
                            />
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    id="deskripsiKegiatan"
                                    name="deskripsiKegiatan"
                                    placeholder="Masukkan Deskripsi Kegiatan"
                                    value={data.deskripsiKegiatan}
                                    required
                                    rows={4}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-none"
                                    onChange={(e) => setData("deskripsiKegiatan", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.deskripsiKegiatan} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="tanggalKegiatan"
                                value="Tanggal Kegiatan"
                                className="text-sm font-semibold text-gray-700"
                            />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="tanggalKegiatan"
                                    name="tanggalKegiatan"
                                    type="date"
                                    value={data.tanggalKegiatan}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900"
                                    onChange={(e) => setData("tanggalKegiatan", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.tanggalKegiatan} className="mt-1" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="bannerImage"
                                value="Foto Kegiatan"
                                className="text-sm font-semibold text-gray-700"
                            />
                            <input
                                className="hidden"
                                id="bannerImage"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="bannerImage"
                                className="flex items-center justify-center w-full py-4 px-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-green-400 transition-colors duration-200 text-gray-600 hover:text-green-600"
                            >
                                <Camera className="h-5 w-5 mr-2" />
                                <span className="text-sm font-medium">Tambahkan Foto Kegiatan</span>
                            </label>
                            {progress && (
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div 
                                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress.percentage}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>

                        {previewImage && (
                            <div className="space-y-2">
                                <InputLabel
                                    value="Preview Gambar"
                                    className="text-sm font-semibold text-gray-700"
                                />
                                <div className="relative">
                                    <img
                                        alt="Preview"
                                        src={previewImage}
                                        className="w-full h-48 object-cover rounded-xl border border-gray-300"
                                    />
                                    <button
                                        onClick={() => {
                                            setPreviewImage(null);
                                            setImageFile(null);
                                            setData('image', null);
                                        }}
                                        type="button"
                                        className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <Button
                            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                            disabled={processing}
                        >
                            {processing ? 'Menambahkan...' : 'Tambah Kegiatan'}
                        </Button>
                    </form>
                </ElevatedContainer>
                <ElevatedContainer>
                    <h1 className="text-2xl font-bold mb-6">Daftar Kegiatan</h1>
                    {rows.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6">
                            {rows.map((row, index) => (
                                <ActivityCard key={index} dataEdit={row} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid place-items-center w-full">
                            <h1>Belum ada Kegiatan...</h1>
                        </div>
                    )}
                </ElevatedContainer>
            </AdministratorLayout>
        </>
    );
}
