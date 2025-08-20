import React, { useState, useEffect } from "react";
import { Filter, Calendar, Weight, BarChart3 } from "lucide-react";
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

export default function ModernUserTable({ headers, rows, tableTitle, keys }) {
    const [sortedRows, setSortedRows] = useState(rows);
    const [isLoading, setIsLoading] = useState(false);

    // Update sortedRows when rows prop changes
    useEffect(() => {
        setSortedRows(rows);
    }, [rows]);

    const formatHeaderName = (headerName) =>
        headerName.replace(/([a-z])([A-Z])/g, "$1 $2");

    const handleSortChange = async (value) => {
        setIsLoading(true);
        
        try {
            // Build the URL - handle both route() function and manual URL construction
            let url;
            try {
                url = route(value);
            } catch (error) {
                // Fallback to manual URL construction if route() function fails
                url = `/${value}`;
            }
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Now the controller returns proper JSON, no need to parse
            setSortedRows(data);
        } catch (error) {
            console.error("Error sorting data:", error);
            // Keep the original data if sorting fails
            setSortedRows(rows);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Header with Sort Filter */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">{tableTitle}</h1>
                <div className="flex items-center space-x-3">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <Select onValueChange={handleSortChange} disabled={isLoading}>
                        <SelectTrigger className="w-48 md:w-64">
                            <SelectValue placeholder={isLoading ? "Memuat..." : "Urutkan Data"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sort_by_date_nasabah">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Tanggal (Terbaru)</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="total_sampah_nasabah_desc">
                                <div className="flex items-center space-x-2">
                                    <Weight className="w-4 h-4" />
                                    <span>Total Sampah (Terberat)</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="total_sampah_nasabah_asc">
                                <div className="flex items-center space-x-2">
                                    <Weight className="w-4 h-4" />
                                    <span>Total Sampah (Teringan)</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Modern Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
                            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <span className="text-green-600 font-medium ml-2">Memuat...</span>
                        </div>
                    </div>
                )}
                <div className="overflow-x-auto relative">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-50 hover:to-green-100">
                                <TableHead className="font-semibold text-green-800 w-16">
                                    <div className="flex items-center space-x-1">
                                        <BarChart3 className="w-4 h-4" />
                                        <span>No</span>
                                    </div>
                                </TableHead>
                                {headers.map((header, index) => (
                                    <TableHead key={index} className="font-semibold text-green-800 capitalize">
                                        {formatHeaderName(header)}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedRows && sortedRows.length > 0 ? (
                                sortedRows.map((row, rowIndex) => (
                                    <TableRow 
                                        key={rowIndex} 
                                        className="hover:bg-green-50 transition-colors duration-200 border-b border-gray-100"
                                    >
                                        <TableCell className="font-medium text-gray-900">
                                            <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                                {rowIndex + 1}
                                            </div>
                                        </TableCell>
                                        {keys?.map((key, cellIndex) => (
                                            <TableCell key={cellIndex} className="text-gray-700">
                                                {key === 'kategori' && row.kategori && (
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        <span className="font-medium">{row.kategori.nama_kategori}</span>
                                                    </div>
                                                )}
                                                {key === 'user' && row.user && (
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                            {row.user.full_name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium">{row.user.full_name}</span>
                                                    </div>
                                                )}
                                                {key === 'total_sampah' && (
                                                    <div className="flex items-center space-x-2">
                                                        <Weight className="w-4 h-4 text-green-600" />
                                                        <span className="font-semibold text-green-700">{row[key]} KG</span>
                                                    </div>
                                                )}
                                                {key === 'tanggal' && (
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-gray-500" />
                                                        <span>{row[key]}</span>
                                                    </div>
                                                )}
                                                {key !== 'kategori' && key !== 'user' && key !== 'total_sampah' && key !== 'tanggal' && row[key]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell 
                                        colSpan={headers.length + 1} 
                                        className="text-center py-12 text-gray-500"
                                    >
                                        <div className="flex flex-col items-center space-y-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                <BarChart3 className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-lg font-medium text-gray-700">Belum ada data sampah</p>
                                                <p className="text-sm text-gray-500">Mulai kumpulkan sampah untuk melihat histori Anda</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                {/* Mobile scroll hint */}
                <div className="md:hidden bg-gray-50 px-4 py-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        💡 Geser ke samping untuk melihat lebih banyak data
                    </p>
                </div>
            </div>
        </>
    );
}
