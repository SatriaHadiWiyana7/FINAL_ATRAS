// File: resources/js/Components/Administrator/ModernSampahTable.jsx

import React, { useState, useEffect } from "react";
import { Edit, Trash2, Filter } from "lucide-react";
import { success, error } from '@/lib/notify';
import { router } from '@inertiajs/react';
import axios from "axios";
import Modal from "../Modal";
import DangerButton from "../DangerButton";
import AddSampahForm from "./AddSampahForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

// FUNGSI BARU UNTUK FORMAT RUPIAH
const formatRupiah = (number) => {
    if (number === null || number === undefined) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};

// FUNGSI BARU UNTUK MENAMPILKAN DATA SEL SECARA DINAMIS
const renderCellContent = (item, key) => {
    const data = item[key];

    switch (key) {
        case "tanggal":
            return new Date(data).toLocaleDateString("id-ID", {
                day: '2-digit', month: 'long', year: 'numeric'
            });
        case "user":
            return data ? data.full_name : "N/A";
        case "kategori":
            return data ? data.nama_kategori : "N/A";
        case "total_sampah":
            return `${data} KG`;
        case "harga_saat_itu":
            return formatRupiah(data);
        case "total_nilai":
            return formatRupiah(data);
        default:
            return data;
    }
};

export default function ModernSampahTable({
    headers,
    rows,
    tableTitle,
    keys,
    dataNasabah,
    dataKategori,
}) {
    // ... (Semua state dan function Anda tetap sama: useState, handleDelete, dll.)
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [id, setId] = useState("");
    const [data, setData] = useState([]);
    const [sortedRows, setSortedRows] = useState(rows);

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
        const routeDelete = `/administrator/kelola-sampah/delete/${id}`;
        router.post(
            routeDelete,
            {_method: "delete",},
            {
                onSuccess: () => {
                    success("Data Berhasil Dihapus!");
                    setDeleteModal(false);
                },
                onError: () => {
                    error("Gagal menghapus data!");
                }
            }
        );
    };

    const handleSortChange = (value) => {
        axios
            .get(route(`administrator.kelolaSampah.${value}`))
            .then((response) => {
                setSortedRows(response.data); // <-- Disederhanakan, asumsi controller mengembalikan array langsung
            })
            .catch((err) => {
                error("Gagal mengurutkan data!");
                console.error(err);
            });
    };

    useEffect(() => {
        setSortedRows(rows);
    }, [rows]);

    return (
        <>
            {/* ... (Kode Modal Delete dan Edit Anda tidak perlu diubah) ... */}
            <Modal show={deleteModal} onClose={() => setDeleteModal(false)}>
                {/* ... Isi Modal ... */}
            </Modal>
            <Modal show={editModal} onClose={() => setEditModal(false)}>
                {/* ... Isi Modal ... */}
            </Modal>

            {/* ... (Kode Header with Sort Filter Anda tidak perlu diubah) ... */}
            <div className="flex items-center justify-between w-full mb-6">
                {/* ... Isi Header ... */}
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
                        {sortedRows.length > 0 ? (
                            sortedRows.map((row, rowIndex) => (
                                <TableRow key={row.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <TableCell className="font-medium text-gray-900">
                                        {rowIndex + 1}
                                    </TableCell>
                                    
                                    {/* LOGIKA TAMPILAN YANG DIPERBARUI */}
                                    {keys?.map((key, cellIndex) => (
                                        <TableCell key={cellIndex} className="text-gray-700">
                                            {renderCellContent(row, key)}
                                        </TableCell>
                                    ))}
                                    
                                    <TableCell>
                                        <div className="flex items-center justify-center space-x-2">
                                            <button onClick={() => editAction(row)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => showDeleteModal(row.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" title="Hapus">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                             <TableRow>
                                <TableCell colSpan={headers.length + 2} className="text-center py-12 text-gray-500">
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Trash2 className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p className="text-lg font-medium">Belum ada data sampah</p>
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