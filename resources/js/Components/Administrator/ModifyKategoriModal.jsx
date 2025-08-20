import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { success, error } from '@/lib/notify';
import Modal from "../Modal";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import Button from "../Button";
import { Tag, FileText, DollarSign } from "lucide-react";

export default function ModifyKategoriModal({ show, onClose, type, dataEdit }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        namaKategori: "",
        deskripsi: "",
        harga: "",
    });
    useEffect(() => {
        if (dataEdit) {
            setData({
                namaKategori: dataEdit.nama_kategori,
                deskripsi: dataEdit.deskripsi,
                harga: dataEdit.harga,
            });
        }
    }, [dataEdit]);

    const submit = (e) => {
        e.preventDefault();
        if (type === "edit") {
            patch(route("administrator.kategori.update", { id: dataEdit.id }), {
                onSuccess: () => {
                    success("Data Kategori berhasil diupdate!");
                    reset();
                    onClose();
                },
                onError: () => {
                    error("Gagal mengupdate data kategori!");
                }
            });
        } else {
            post(route("administrator.kategori.store"), {
                onSuccess: () => {
                    success("Kategori berhasil ditambahkan!");
                    reset();
                    onClose();
                },
                onError: () => {
                    error("Gagal menambahkan kategori!");
                }
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {type === "edit" ? "Edit Kategori" : "Tambah Kategori"}
                </h2>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <InputLabel 
                            htmlFor="namaKategori" 
                            value="Nama Kategori"
                            className="text-sm font-semibold text-gray-700"
                        />
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="namaKategori"
                                name="namaKategori"
                                type="text"
                                placeholder="Masukkan Nama Kategori"
                                value={data.namaKategori}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                                autoFocus={true}
                                onChange={(e) => setData("namaKategori", e.target.value)}
                            />
                        </div>
                        <InputError message={errors.namaKategori} className="mt-1" />
                    </div>

                    <div className="space-y-2">
                        <InputLabel 
                            htmlFor="deskripsi" 
                            value="Deskripsi"
                            className="text-sm font-semibold text-gray-700"
                        />
                        <div className="relative">
                            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                                id="deskripsi"
                                name="deskripsi"
                                placeholder="Masukkan Deskripsi"
                                value={data.deskripsi}
                                required
                                rows={4}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 resize-none"
                                onChange={(e) => setData("deskripsi", e.target.value)}
                            />
                        </div>
                        <InputError message={errors.deskripsi} className="mt-1" />
                    </div>

                    <div className="space-y-2">
                        <InputLabel 
                            htmlFor="harga" 
                            value="Harga (Rp)"
                            className="text-sm font-semibold text-gray-700"
                        />
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="harga"
                                name="harga"
                                type="number"
                                placeholder="Masukkan Harga"
                                value={data.harga}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                                onChange={(e) => setData("harga", e.target.value)}
                            />
                        </div>
                        <InputError message={errors.harga} className="mt-1" />
                    </div>

                    <Button 
                        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl" 
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : (type === "edit" ? "Edit Kategori" : "Tambah Kategori")}
                    </Button>
                </form>
            </div>
        </Modal>
    );
}
