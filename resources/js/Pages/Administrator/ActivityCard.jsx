import { useState, useEffect } from "react";
import { Edit2, Trash2, FileText, Calendar, Type } from "lucide-react";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import Button from "@/Components/Button";
import { router} from '@inertiajs/react';
import { success, error } from '@/lib/notify';

export default function ActivityCard({ dataEdit }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        namaKegiatan: "",
        deskripsiKegiatan: "",
        tanggalKegiatan: "",
    });
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        if (dataEdit) {
            setData({
                namaKegiatan: dataEdit.nama_kegiatan,
                deskripsiKegiatan: dataEdit.deskripsi,
                tanggalKegiatan: dataEdit.tanggal_kegiatan,
            });
        }
    }, [dataEdit]);

    const imagePath = '../storage/konten/' + dataEdit.foto_kegiatan;
    function submit(e) {
        e.preventDefault();
        patch(route("administrator.kelola-konten.update", { id: dataEdit.id }), {
            onSuccess: () => {
                success("Data Konten berhasil diupdate!");
                reset();
                setEditModal(false);
            },
            onError: () => {
                error("Gagal mengupdate data konten!");
            }
        });
    }
    const handleDelete = () => {
        router.post(route("administrator.kelola-konten.delete", { id: dataEdit.id }), {
            _method: "delete",
        }, {
            onSuccess: () => {
                success("Data Berhasil Dihapus!");
                setDeleteModal(false);
            },
            onError: () => {
                error("Gagal menghapus data!");
            }
        });
    };
    return (
        <>
            <Modal show={editModal} onClose={(() => setEditModal(false))}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Kegiatan</h2>
                    <form onSubmit={submit} className="space-y-6">
                        {/* Nama Kegiatan Field */}
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
                                    placeholder="Masukkan nama kegiatan"
                                    value={data.namaKegiatan}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                                    autoFocus={true}
                                    onChange={(e) => setData("namaKegiatan", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.namaKegiatan} className="mt-1" />
                        </div>

                        {/* Deskripsi Kegiatan Field */}
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
                                    placeholder="Masukkan deskripsi kegiatan"
                                    value={data.deskripsiKegiatan}
                                    required
                                    rows={4}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-none"
                                    onChange={(e) => setData("deskripsiKegiatan", e.target.value)}
                                />
                            </div>
                            <InputError message={errors.deskripsiKegiatan} className="mt-1" />
                        </div>

                        {/* Tanggal Kegiatan Field */}
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

                        {/* Submit Button */}
                        <Button
                            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                            disabled={processing}
                        >
                            {processing ? 'Mengupdate...' : 'Update Kegiatan'}
                        </Button>
                    </form>
                </div>
            </Modal>
            <Modal show={deleteModal} onClose={() => setDeleteModal(false)}>
                <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                        <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                        Konfirmasi Penghapusan
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        Apakah Anda yakin ingin menghapus kegiatan ini? Data yang sudah dihapus tidak dapat dipulihkan.
                    </p>
                    <div className="flex space-x-3">
                        <DangerButton 
                            onClick={() => handleDelete()} 
                            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300"
                        >
                            Hapus Sekarang
                        </DangerButton>
                        <button 
                            onClick={() => setDeleteModal(false)}
                            className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all duration-300"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="shadow-lg rounded-xl w-full relative overflow-hidden bg-white">
                <div className="absolute top-4 right-4 flex gap-2 items-center z-10">
                    <button 
                        onClick={() => setEditModal(true)} 
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-green-50 hover:text-green-600 transition-all duration-200 shadow-md"
                    >
                        <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setDeleteModal(true)} 
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-md"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
                <img
                    src={imagePath}
                    className="object-cover w-full h-[32rem] rounded-t-xl"
                    alt={dataEdit.nama_kegiatan}
                />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {dataEdit.nama_kegiatan}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {dataEdit.deskripsi}
                    </p>
                    <hr className="border-gray-200 mb-4" />
                    <footer>
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">
                                    Tanggal Mulai Kegiatan
                                </p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {new Date(dataEdit.tanggal_kegiatan).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
