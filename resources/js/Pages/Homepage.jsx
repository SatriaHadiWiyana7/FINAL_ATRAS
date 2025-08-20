import React, { useState, useEffect } from "react";
import {
    Leaf,
    ChevronDown,
    Recycle,
    Users,
    Sprout,
    Heart,
    Handshake,
    Lightbulb,
    Shield,
    Calendar,
    Trash2,
    Eye,
    Target,
    Check,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    MapPin,
    Phone,
    Mail,
    ChevronUp,
    Menu,
    X,
} from "lucide-react";
import logo from "/public/assets/logoHorizontaL.png";
import heroVideo from "/public/assets/hero-video.mp4"; 
const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [kontens, setKontens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setShowBackToTop(window.pageYOffset > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fetch kontens data from backend
    useEffect(() => {
        const fetchKontens = async () => {
            try {
                const response = await fetch("/get-konten");
                const data = await response.json();
                setKontens(data.slice(0, 6)); // Limit to 6 items for display
                setLoading(false);
            } catch (error) {
                console.error("Error fetching kontens:", error);
                setLoading(false);
            }
        };

        fetchKontens();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/90 shadow-lg"
                        : "bg-white/95 shadow-md"
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="logo" className="w-16 h-16" />
                            <span className="text-xl font-bold text-gray-800">
                                ATRAS
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={() => scrollToSection("beranda")}
                                className="text-gray-700 hover:text-green-500 transition-colors duration-300 relative group"
                            >
                                Beranda
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection("tentang")}
                                className="text-gray-700 hover:text-green-500 transition-colors duration-300 relative group"
                            >
                                Tentang Kami
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection("statistik")}
                                className="text-gray-700 hover:text-green-500 transition-colors duration-300 relative group"
                            >
                                Statistik
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection("bantuan")}
                                className="text-gray-700 hover:text-green-500 transition-colors duration-300 relative group"
                            >
                                Bantuan
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <div className="flex space-x-3">
                                <a
                                    href="/login"
                                    className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-50 transition-colors duration-300"
                                >
                                    Masuk
                                </a>
                                <a
                                    href="/register"
                                    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                                >
                                    Daftar
                                </a>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2"
                        >
                            {isMenuOpen ? (
                                <X className="text-gray-700" />
                            ) : (
                                <Menu className="text-gray-700" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200">
                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={() => scrollToSection("beranda")}
                                    className="text-gray-700 hover:text-green-500 transition-colors duration-300 text-left"
                                >
                                    Beranda
                                </button>
                                <button
                                    onClick={() => scrollToSection("tentang")}
                                    className="text-gray-700 hover:text-green-500 transition-colors duration-300 text-left"
                                >
                                    Tentang Kami
                                </button>
                                <button
                                    onClick={() => scrollToSection("statistik")}
                                    className="text-gray-700 hover:text-green-500 transition-colors duration-300 text-left"
                                >
                                    Statistik
                                </button>
                                <button
                                    onClick={() => scrollToSection("bantuan")}
                                    className="text-gray-700 hover:text-green-500 transition-colors duration-300 text-left"
                                >
                                    Bantuan
                                </button>
                                <div className="flex space-x-3 pt-4">
                                    <a
                                        href="/login"
                                        className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-50 transition-colors duration-300"
                                    >
                                        Masuk
                                    </a>
                                    <a
                                        href="/register"
                                        className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                                    >
                                        Daftar
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section
                id="beranda"
                className="bg-gradient-to-br max-md:from-green-600 max-md:to-green-700 py-4 max-md:mt-24 md:min-h-screen flex items-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br md:min-h-screen ">
					<video autoPlay muted loop id="myVideo" className="md:min-h-screen">
                    <source src={heroVideo} type="video/mp4" />
                </video>
				</div>
                <div className="container mx-auto px-4 relative z-10 max-md:pt-36">
                    <div className="flex flex-col text-center gap-8 items-center">
                        <div className="text-white">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Bersama Membangun
                                <span className="text-green-200 block">
                                    Masa Depan
                                </span>
                                yang Bersih
                            </h1>
                            <p className="text-lg md:text-xl mb-8 text-white/90">
                                Mari bergabung dalam gerakan lingkungan bersih
                                untuk Indonesia yang lebih hijau dan
                                berkelanjutan
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/login"
                                    className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Gabung Sekarang
                                </a>
                                <button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:-translate-y-1">
                                    Pelajari Lebih Lanjut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                    <ChevronDown className="text-2xl" />
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="/assets/2.jpg"
                                alt="People Recycling"
                                className="w-full rounded-3xl shadow-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                                Yuk, bersama kita bersihkan Indonesia!
                                <span className="text-green-500 block">
                                    Jadilah bagian dari solusi
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Ayo bergabung di Gerakan ATRAS untuk menciptakan
                                lingkungan yang bersih dan sehat. Setiap langkah
                                kecil yang kita ambil hari ini akan memberikan
                                dampak besar untuk masa depan.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center space-x-4">
                                    <Recycle className="text-green-500 text-xl" />
                                    <span className="text-lg font-medium text-gray-700">
                                        Program Daur Ulang Terpadu
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Users className="text-green-500 text-xl" />
                                    <span className="text-lg font-medium text-gray-700">
                                        Komunitas Peduli Lingkungan
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Sprout className="text-green-500 text-xl" />
                                    <span className="text-lg font-medium text-gray-700">
                                        Edukasi Lingkungan Berkelanjutan
                                    </span>
                                </div>
                            </div>
                            <a
                                href="/login"
                                className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold text-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Gabung Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="tentang" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Tentang Kami
                        </h2>
                        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-4 text-center">
                            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="w-24 h-24"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                ATRAS
                            </h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                ATRAS hadir sebagai solusi inovatif dalam
                                pengelolaan sampah di desa Triharjo, Sleman,
                                Yogyakarta. Dengan semangat mengajak masyarakat
                                lingkungan yang berkelanjutan, kami berkomitmen
                                untuk mengubah sampah menjadi sumber daya yang
                                bermanfaat.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Melalui proses pengelolaan yang modern dan ramah
                                lingkungan, kami mengubah sampah menjadi sumber
                                daya yang berharga. ATRAS tidak hanya sekadar
                                dengan pengelolaan sampah, tetapi juga turut
                                serta membangun kesadaran masyarakat akan
                                pentingnya menjaga lingkungan untuk generasi
                                mendatang.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Heart className="text-green-500" />
                                    <span className="font-semibold text-gray-700">
                                        Peduli Lingkungan
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Handshake className="text-green-500" />
                                    <span className="font-semibold text-gray-700">
                                        Kolaborasi Komunitas
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Lightbulb className="text-green-500" />
                                    <span className="font-semibold text-gray-700">
                                        Inovasi Berkelanjutan
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Shield className="text-green-500" />
                                    <span className="font-semibold text-gray-700">
                                        Komitmen Kualitas
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section
                id="statistik"
                className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Statistik
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Berikut adalah rekor data sampah yang berhasil kami
                            tangani
                        </p>
                        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-4"></div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        <StatCard
                            icon={
                                <Calendar className="text-2xl text-green-500" />
                            }
                            number="15"
                            label="Bulan Beroperasi"
                        />
                        <StatCard
                            icon={<Users className="text-2xl text-green-500" />}
                            number="12"
                            label="Anggota Aktif"
                        />
                        <StatCard
                            icon={
                                <Trash2 className="text-2xl text-green-500" />
                            }
                            number="839"
                            label="Kg Sampah Terkumpul"
                        />
                        <StatCard
                            icon={
                                <Recycle className="text-2xl text-green-500" />
                            }
                            number="45"
                            label="Produk Daur Ulang"
                        />
                    </div>
                </div>
            </section>

            {/* Movement Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Gerakan Bebas Sampah
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Bergabunglah dalam berbagai gerakan bebas sampah
                            yang kami adakan di Yogyakarta
                        </p>
                        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-4"></div>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
                                >
                                    <div className="w-full h-64 bg-gray-300"></div>
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-300 rounded mb-3"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                                        <div className="h-10 bg-gray-300 rounded-full w-24"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {kontens.length > 0 ? (
                                kontens.map((konten) => (
                                    <MovementCard
                                        key={konten.id}
                                        image={`/storage/${konten.foto_kegiatan}`}
                                        title={konten.nama_kegiatan}
                                        description={konten.deskripsi}
                                        date={new Date(
                                            konten.tanggal_kegiatan
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    />
                                ))
                            ) : (
                                // Fallback static content if no data
                                <>
                                    <MovementCard
                                        image="/assets/p.jpg"
                                        title="Pembersihan Pantai"
                                        description="Aksi bersih-bersih pantai untuk menjaga ekosistem laut"
                                        date="Kegiatan Mendatang"
                                    />
                                    <MovementCard
                                        image="/assets/k.jpg"
                                        title="Bersih Taman Kota"
                                        description="Menjaga kebersihan taman untuk ruang hijau yang nyaman"
                                        date="Kegiatan Mendatang"
                                    />
                                    <MovementCard
                                        image="/assets/s.jpg"
                                        title="Pembersihan Sungai"
                                        description="Menjaga kebersihan sungai untuk air yang lebih bersih"
                                        date="Kegiatan Mendatang"
                                    />
                                </>
                            )}
                        </div>
                    )}

                    {kontens.length > 6 && (
                        <div className="text-center mt-12">
                            <button className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1">
                                Lihat Semua Kegiatan
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Vision Mission Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Visi dan Misi ATRAS
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Berikut Komitmen yang kami buat untuk menciptakan
                            lingkungan Bebas Sampah!
                        </p>
                        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-4"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="/assets/3.jpg"
                                alt="Team Photo"
                                className="w-full rounded-3xl shadow-lg"
                            />
                        </div>
                        <div>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-green-500 mb-4 flex items-center">
                                    <Eye className="mr-3" />
                                    Visi
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Menjadi organisasi terdepan dalam
                                    pengelolaan sampah berkelanjutan di
                                    Yogyakarta dan sekitarnya, menciptakan
                                    lingkungan yang bersih dan sehat untuk
                                    generasi mendatang.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-green-500 mb-4 flex items-center">
                                    <Target className="mr-3" />
                                    Misi
                                </h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <Check className="text-green-500 mr-3 mt-1" />
                                        <span>
                                            Mengembangkan sistem pengelolaan
                                            sampah yang inovatif dan
                                            berkelanjutan
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="text-green-500 mr-3 mt-1" />
                                        <span>
                                            Meningkatkan kesadaran masyarakat
                                            tentang pentingnya pengelolaan
                                            sampah
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="text-green-500 mr-3 mt-1" />
                                        <span>
                                            Membangun komunitas yang peduli
                                            lingkungan dan berkelanjutan
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="text-green-500 mr-3 mt-1" />
                                        <span>
                                            Menciptakan solusi daur ulang yang
                                            memberikan nilai ekonomis
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="bantuan" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Bantuan
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Apakah Anda memiliki pertanyaan? Berikut beberapa
                            yang sering ditanyakan pada kami
                        </p>
                        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-4"></div>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-xl font-bold">ATRAS</span>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Gerakan lingkungan bersih untuk Indonesia yang
                                lebih hijau dan berkelanjutan.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                                >
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">
                                Tautan Cepat
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors duration-300"
                                    >
                                        Beranda
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors duration-300"
                                    >
                                        Tentang Kami
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors duration-300"
                                    >
                                        Program
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors duration-300"
                                    >
                                        Kontak
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Program</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors duration-300"
                                    >
                                        Daur Ulang
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Lokasi</h4>
                            <div className="space-y-2 text-gray-300">
                                <p className="flex items-center">
                                    <MapPin className="mr-2 w-4 h-4" />
                                    Sleman, Yogyakarta, Indonesia
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ATRAS. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 transform hover:scale-110 shadow-lg z-50"
                >
                    <ChevronUp className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, number, label }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    const target = parseInt(number);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        const element = document.getElementById(`stat-${label}`);
        if (element) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [number, label, isVisible]);

    return (
        <div
            id={`stat-${label}`}
            className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {icon}
            </div>
            <div className="text-4xl font-bold text-green-500 mb-2">
                {count}
            </div>
            <div className="text-gray-600 font-medium">{label}</div>
        </div>
    );
};

// Movement Card Component
const MovementCard = ({ image, title, description, date }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                        e.target.src = "/assets/default-activity.jpg"; // Fallback image
                    }}
                />
                {date && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {date}
                    </div>
                )}
            </div>
            <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {title}
                </h4>
                <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
            </div>
        </div>
    );
};

// FAQ Accordion Component
const FAQAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Apa itu ATRAS?",
            answer: "ATRAS adalah gerakan lingkungan bersih yang bertujuan untuk menciptakan Indonesia yang lebih hijau dan berkelanjutan melalui program pengelolaan sampah yang inovatif.",
        },
        {
            question: "Bagaimana cara bergabung dengan ATRAS?",
            answer: "Anda dapat bergabung dengan ATRAS melalui website ini atau mengunjungi kantor pusat kami di Yogyakarta. Tim kami akan membantu Anda untuk mulai berkontribusi dalam gerakan lingkungan bersih.",
        },
        {
            question: "Apa saja program yang tersedia di ATRAS?",
            answer: "ATRAS memiliki berbagai program seperti daur ulang terpadu, edukasi lingkungan, pembersihan pantai, bersih taman kota, dan pembersihan sungai.",
        },
        {
            question: "Apakah ada biaya untuk bergabung?",
            answer: "Tidak ada biaya untuk bergabung dengan ATRAS. Kami adalah organisasi nirlaba yang terbuka untuk semua orang yang peduli dengan lingkungan.",
        },
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                    <button
                        onClick={() => toggleAccordion(index)}
                        className={`w-full px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-300 ${
                            activeIndex === index
                                ? "bg-green-50 text-green-600"
                                : ""
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span>{faq.question}</span>
                            <ChevronDown
                                className={`transition-transform duration-300 ${
                                    activeIndex === index ? "rotate-180" : ""
                                }`}
                            />
                        </div>
                    </button>
                    {activeIndex === index && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default App;
