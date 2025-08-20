import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import ModernDataTable from "@/Components/Administrator/ModernDataTable";
import ElevatedContainer from "@/Components/ElevatedContainer";

const Nasabah = (nasabah) => {
    const keys = ["full_name", "phone_number", "formatted_created_at"];
    const headers = ["Nama", "No Telepon", "Tanggal Bergabung"];
    return (
        <>
            <Head title="Nasabah" />
            <AdministratorLayout>
                <ElevatedContainer>
                    <ModernDataTable
                        headers={headers}
                        rows={nasabah.nasabah}
                        keys={keys}
                        tableTitle="Data Nasabah"
                    />
                </ElevatedContainer>
            </AdministratorLayout>
        </>
    );
};

export default Nasabah;
