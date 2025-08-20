import { useForm } from "@inertiajs/react";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import Button from "../Button";
import { useEffect } from "react";
import { success, error } from '@/lib/notify';
import { User, Tag, Scale, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { router } from "@inertiajs/react";

export default function AddSampahForm({ dataNasabah, dataKategori, dataEdit, onClose}) {
    const { data, setData, post, processing, errors,  reset } = useForm({
        nasabah: "",
        kategori: "",
        totalSampah: "",
    });

	const sortedNasabah = dataNasabah.sort((a, b) => (a.full_name > b.full_name))
	const sortedKategori = dataKategori.sort((a, b) => (a.nama_kategori > b.nama_kategori))

	useEffect(() => {
        if (dataEdit) {
            setData({
				nasabah : dataEdit.user.id,
				kategori : dataEdit.kategori.id,
				totalSampah : dataEdit.total_sampah
			});
        }
    }, [dataEdit]);
    const submit = (e) => {
        e.preventDefault();
        if (dataEdit) {
            post(route("administrator.kelolaSampah.update", { id: dataEdit.id }), {
                onError: () => {
                    error("Data Gagal DiUpdate! Cek koneksimu atau coba ulang menambahkan data");
                },
                onSuccess: () => {
                    success("Data Berhasil DiUpdate!");
                    onClose();
                },
            });
        } else {
            post(route("administrator.kelolaSampah.store"), {
                onError: () => {
                    error("Data Gagal Ditambahkan! Cek koneksimu atau coba ulang menambahkan data");
                },
                onSuccess: () => {
                    setData(prevData => ({
                        ...prevData,
                        totalSampah: "",
                        kategori: "",
                    }));
                    success("Data Berhasil Ditambahkan!");
                },
            });
        }
    }

    return (
        <>
            <form onSubmit={submit} className="w-full space-y-6">
                <div className="space-y-2">
                    <InputLabel value="Pilih Nasabah" className="text-sm font-semibold text-gray-700" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Select value={data.nasabah} onValueChange={(value) => setData("nasabah", value)}>
                            <SelectTrigger className="pl-10">
                                <SelectValue 
                                    placeholder="Masukkan Nasabah" 
                                    options={sortedNasabah?.map((nasabah) => ({
                                        value: nasabah.id,
                                        label: nasabah.full_name
                                    }))}
                                    value={data.nasabah}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {sortedNasabah?.map((nasabah) => (
                                    <SelectItem 
                                        key={nasabah.id} 
                                        value={nasabah.id}
                                        onValueChange={(value) => setData("nasabah", value)}
                                        currentValue={data.nasabah}
                                    >
                                        {nasabah.full_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <InputError message={errors.nasabah} />
                </div>

                <div className="space-y-2">
                    <InputLabel value="Pilih Kategori Sampah" className="text-sm font-semibold text-gray-700" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <Tag className="h-5 w-5 text-gray-400" />
                        </div>
                        <Select value={data.kategori} onValueChange={(value) => setData("kategori", value)}>
                            <SelectTrigger className="pl-10">
                                <SelectValue 
                                    placeholder="Masukkan Kategori Sampah" 
                                    options={sortedKategori?.map((kategori) => ({
                                        value: kategori.id,
                                        label: kategori.nama_kategori
                                    }))}
                                    value={data.kategori}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {sortedKategori?.map((kategori) => (
                                    <SelectItem 
                                        key={kategori.id} 
                                        value={kategori.id}
                                        onValueChange={(value) => setData("kategori", value)}
                                        currentValue={data.kategori}
                                    >
                                        {kategori.nama_kategori}
                                    </SelectItem>
                                ))}
                                <div className="px-3 py-2">
                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('administrator.kategori.index'))}
                                        className="flex items-center w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Tambah Kategori Baru
                                    </button>
                                </div>
                            </SelectContent>
                        </Select>
                    </div>
                    <InputError message={errors.kategori} />
                </div>

                <div className="space-y-2">
                    <InputLabel htmlFor="totalSampah" value="Total Sampah (Kg)" className="text-sm font-semibold text-gray-700" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Scale className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="totalSampah"
                            name="totalSampah"
                            type="number"
                            placeholder="Masukkan Total Berat Sampah (Kg)"
                            value={data.totalSampah}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                            onChange={(e) => setData("totalSampah", e.target.value)}
                        />
                    </div>
                    <InputError message={errors.totalSampah} className="mt-1" />
                </div>

                <Button 
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl" 
                    disabled={processing}
                >
                    {processing ? 'Memproses...' : (dataEdit ? "Edit Data Sampah" : "Tambah Data Sampah")}
                </Button>
            </form>
        </>
    );

}
