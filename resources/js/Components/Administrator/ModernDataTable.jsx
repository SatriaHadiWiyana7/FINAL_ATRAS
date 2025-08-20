import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { success, error } from '@/lib/notify';
import { router } from '@inertiajs/react';
import Modal from "../Modal";
import DangerButton from "../DangerButton";
import Button from "../Button";
import ModifyNasabahModal from "./ModifyNasabahModal";
import ModifyKategoriModal from "./ModifyKategoriModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

export default function ModernDataTable({ headers, rows, tableTitle, keys }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [id, setId] = useState('');
    const [data, setData] = useState([]);

    const formatHeaderName = (headerName) =>
        headerName.replace(/([a-z])([A-Z])/g, "$1 $2");

    const showDeleteModal = (id) => {
        setId(id);
        setDeleteModal(true);
    };

    const editAction = (data) => {
        setData(data);
        setEditModal(true);
    };

    const handleDelete = () => {
        const routeDeleteMap = {
            "Data Nasabah": `/administrator/nasabah/delete/${id}`,
            "Data Sampah": `/administrator/kelola-sampah/delete/${id}`,
            "Data Kategori": `/administrator/kategori/delete/${id}`
        };
        const routeDelete = routeDeleteMap[tableTitle];
        router.post(routeDelete, {
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
            {/* Delete Confirmation Modal */}
            <Modal show={deleteModal} onClose={() => setDeleteModal(false)}>
                <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                        <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                        Konfirmasi Penghapusan
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        Apakah Anda yakin ingin menghapus data ini? Data yang sudah dihapus tidak dapat dipulihkan.
                    </p>
                    <div className="flex space-x-3">
                        <DangerButton 
                            onClick={handleDelete} 
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

            {/* Nasabah Modals */}
            {tableTitle === "Data Nasabah" && (
                <>
                    <ModifyNasabahModal 
                        type="edit" 
                        show={editModal} 
                        onClose={() => setEditModal(false)} 
                        dataEdit={data}
                    />
                    <ModifyNasabahModal 
                        type="add" 
                        show={addModal} 
                        onClose={() => setAddModal(false)}
                    />
                </>
            )}

            {/* Kategori Modals */}
            {tableTitle === "Data Kategori" && (
                <>
                    <ModifyKategoriModal 
                        type="edit" 
                        show={editModal} 
                        onClose={() => setEditModal(false)} 
                        dataEdit={data}
                    />
                    <ModifyKategoriModal 
                        type="add" 
                        show={addModal} 
                        onClose={() => setAddModal(false)}
                    />
                </>
            )}

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-6">
                <h1 className='text-2xl font-bold text-gray-800'>{tableTitle}</h1>
                <Button 
                    onClick={() => setAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Data
                </Button>
            </div>

            {/* Modern Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead className="font-semibold text-gray-900 w-16">No</TableHead>
                            {headers.map((header, index) => (
                                <TableHead key={index} className="font-semibold text-gray-900 capitalize">
                                    {formatHeaderName(header)}
                                </TableHead>
                            ))}
                            <TableHead className="font-semibold text-gray-900 text-center w-24">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row, rowIndex) => (
                                <TableRow 
                                    key={rowIndex} 
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <TableCell className="font-medium text-gray-900">
                                        {rowIndex + 1}
                                    </TableCell>
                                    {keys?.map((key, cellIndex) => (
                                        <TableCell key={cellIndex} className="text-gray-700">
                                            {key === 'kategori' && row.kategori ? row.kategori.nama_kategori : ""}
                                            {key === 'user' && row.user ? row.user.full_name : ""}
                                            {key === 'harga' && row[key] ? `Rp ${new Intl.NumberFormat('id-ID').format(row[key])}` : ""}
                                            {key !== 'kategori' && key !== 'user' && key !== 'total_sampah' && key !== 'harga' && row[key]}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <div className="flex items-center justify-center space-x-2">
                                            <button
                                                onClick={() => editAction(row)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => showDeleteModal(row.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell 
                                    colSpan={headers.length + 2} 
                                    className="text-center py-12 text-gray-500"
                                >
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Trash2 className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p className="text-lg font-medium">Belum ada data</p>
                                        <p className="text-sm">Data akan muncul setelah Anda menambahkannya</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
