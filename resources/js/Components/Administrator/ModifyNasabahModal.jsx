import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { success, error } from '@/lib/notify';
import Modal from "../Modal";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import Button from "../Button";
import { Phone, User, Lock, Eye, EyeOff } from "lucide-react";

export default function ModifyNasabahModal({ show, onClose, type, dataEdit }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        phoneNumber: "",
        fullName: "",
        password: "",
    });

    useEffect(() => {
        if (dataEdit) {
            setData({
				fullName : dataEdit.full_name,
				phoneNumber : dataEdit.phone_number
			});
        }
    }, [dataEdit]);

    const submit = (e) => {
        e.preventDefault();
        if (type === "edit") {
          patch(route("administrator.nasabah.update", { id: dataEdit.id }), {
            onSuccess: () => {
              success("Nasabah berhasil diupdate!").then(() => {
                reset();
                onClose();
              });
            },
            onError: () => {
              error("Gagal mengupdate data nasabah!");
            }
          });
        } else {
          post(route("administrator.nasabah.store"), {
            onSuccess: () => {
              success("Nasabah berhasil ditambahkan!").then(() => {
                reset();
                onClose();
              });
            },
            onError: () => {
              error("Gagal menambahkan data nasabah!");
            }
          });
        }
      };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {type === "edit" ? "Edit Nasabah" : "Tambah Nasabah"}
                </h2>
                <form onSubmit={submit} className="space-y-6">
                    {/* Phone Number Field */}
                    <div className="space-y-2">
                        <InputLabel htmlFor="phoneNumber" value="No Telepon" className="text-sm font-semibold text-gray-700" />
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="phoneNumber"
                                type="tel"
                                name="phone_number"
                                placeholder="Masukkan nomor telepon nasabah"
                                value={data.phoneNumber}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                                autoFocus={true}
                                onChange={(e) => setData("phoneNumber", e.target.value)}
                            />
                        </div>
                        <InputError message={errors.phoneNumber} className="mt-1" />
                    </div>

                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <InputLabel htmlFor="fullName" value="Nama Lengkap" className="text-sm font-semibold text-gray-700" />
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="fullName"
                                name="full_name"
                                placeholder="Masukkan nama lengkap nasabah"
                                value={data.fullName}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                                onChange={(e) => setData("fullName", e.target.value)}
                            />
                        </div>
                        <InputError message={errors.fullName} className="mt-1" />
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
                                placeholder="Masukkan password nasabah"
                                value={data.password}
                                required={type !== "edit"}
                                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                                onChange={(e) => setData("password", e.target.value)}
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

                    <Button 
                        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl" 
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : (type === "edit" ? "Edit Nasabah" : "Tambah Nasabah")}
                    </Button>
                </form>
            </div>
        </Modal>
    );
}
