import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import AddSampahForm from "@/Components/Administrator/AddSampahForm";
import ElevatedContainer from "@/Components/ElevatedContainer";
import ModernSampahTable from "@/Components/Administrator/ModernSampahTable";

    const headers = [
        "Tanggal",
        "Nama Nasabah",
        "Kategori",
        "Total Sampah",
        "Harga / KG",
        "Total Nilai",
    ];
    
    const keys = [
        "tanggal",
        "user",
        "kategori",
        "total_sampah",
        "harga_saat_itu", 
        "total_nilai",    
    ];

const KelolaSampah = (data) => {
    const sampah = data.sampah;
    const kategori = data.kategori;
    const nasabah = data.nasabah;
    return (
        <>
            <Head title="Kelola Sampah" />
            <AdministratorLayout>
                <ElevatedContainer>
                    <h1 className="text-2xl font-bold mb-6">
                        Tambahkan Data Sampah Baru
                    </h1>
                    <AddSampahForm
                        dataKategori={kategori}
                        dataNasabah={nasabah}
                    />
                </ElevatedContainer>			
                <div className="mt-16">
                    <ElevatedContainer>
                        <ModernSampahTable
                            headers={headers}
                            rows={sampah}
                            keys={keys}
                            tableTitle={"Data Sampah"}
                            dataKategori={kategori}
                            dataNasabah={nasabah}
                        />
                    </ElevatedContainer>
                </div>				
            </AdministratorLayout>
        </>
    );
};

export default KelolaSampah;
