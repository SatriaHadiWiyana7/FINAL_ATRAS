import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { success, error } from '@/lib/notify';
import { router } from "@inertiajs/react";
import AddSampahForm from "./AddSampahForm";
import axios from "axios";

import Modal from "../Modal";
import DangerButton from "../DangerButton";
import { Select, MenuItem, FormControl } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function DataTable3({
    headers,
    rows,
    tableTitle,
    keys,
    dataNasabah,
    dataKategori,
}) {
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
            {
                _method: "delete",
            },
            {
                onSuccess: () => {
                    swal({
                        title: "Success",
                        text: "Data Berhasil Dihapus!",
                        icon: "success",
                        buttons: {
                            confirm: {
                                text: "Lanjutkan",
                                className: "bg-primary",
                            },
                        },
                    });
                    setDeleteModal(false);
                },
            }
        );
    };

    const handleSortChange = (event) => {
        axios
            .get(route(`administrator.kelolaSampah.${event.target.value}`))
            .then((response) => {
                setSortedRows(response.data);
            })
            .catch((error) => {
                console.log("Error response:", error);
            });
    };

	useEffect(() => {
		setSortedRows(rows);
	}, [rows])

    console.log(sortedRows);

    return (
        <>
            <Modal show={deleteModal} onClose={() => setDeleteModal(false)}>
                <p className="mb-4 font-semibold text-xl">
                    Apakah Anda yakin Ingin menghapus data ini?, data anda tidak
                    akan bisa dipulihkan!
                </p>
                <DangerButton onClick={handleDelete} className="mt-4 mr-4">
                    Hapus Sekarang
                </DangerButton>
                <button onClick={() => setDeleteModal(false)}>Kembali</button>
            </Modal>
            <Modal show={editModal} onClose={() => setEditModal(false)}>
                <AddSampahForm
                    onClose={() => setEditModal(false)}
                    dataNasabah={dataNasabah}
                    dataKategori={dataKategori}
                    type="edit"
                    dataEdit={data}
                />
            </Modal>
            <div className="flex items-center gap-4 justify-between w-full mb-2">
                <h1 className="text-2xl font-bold mb-6">{tableTitle}</h1>
                <FormControl>
                    <Select
                        defaultValue=""
                        displayEmpty
                        onChange={handleSortChange}
                        sx={{ padding: 0 }}
                    >
                        <MenuItem value="" disabled>
                            Urutkan Data
                        </MenuItem>
                        <MenuItem value="sort_by_date">
                            Tanggal (Terbaru)
                        </MenuItem>
                        <MenuItem value="sort_by_nama_nasabah_asc">
                            Nama Nasabah (A - Z)
                        </MenuItem>
                        <MenuItem value="sort_by_nama_nasabah_desc">
                            Nama Nasabah (Z - A)
                        </MenuItem>
                        <MenuItem value="total_sampah_desc">
                            Total Sampah (Terberat)
                        </MenuItem>
                        <MenuItem value="total_sampah_asc">
                            Total Sampah (Teringan)
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TableContainer sx={{ width: "100%" }} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            {headers.map((header, index) => (
                                <StyledTableCell
                                    key={index}
                                    className="capitalize"
                                >
                                    {formatHeaderName(header)}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.map((row, rowIndex) => (
                            <StyledTableRow key={rowIndex}>
                                <StyledTableCell component="th" scope="row">
                                    {rowIndex + 1}
                                </StyledTableCell>
                                {keys?.map((key, cellIndex) => (
                                    <StyledTableCell key={cellIndex}>
                                        {key === "kategori" && row.kategori
                                            ? row.kategori.nama_kategori
                                            : ""}
                                        {key === "user" && row.user
                                            ? row.user.full_name
                                            : ""}
                                        {key === "total_sampah" &&
                                            row[key] + " Kg"}
                                        {key !== "kategori" &&
                                            key !== "user" &&
                                            key !== "total_sampah" &&
                                            row[key]}
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell>
                                    <div>
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => editAction(row)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() =>
                                                showDeleteModal(row.id)
                                            }
                                        >
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
