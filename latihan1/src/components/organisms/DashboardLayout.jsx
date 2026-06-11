import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. Sidebar di sebelah kiri */}
      <aside className="w-64 bg-[#1e293b] text-white hidden md:block">
        <div className="p-6 text-2xl font-bold">Admin</div>
        <nav className="mt-6">{/* Link menu di sini */}</nav>
      </aside>

      {/* 2. Area Konten di sebelah kanan */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow-sm">
          {/* Header/Navbar atas */}
        </header>
        <main className="p-6 flex-grow">
          {children} {/* Di sinilah tabel Mahasiswa akan muncul */}
        </main>
        <Footer /> {/* Footer otomatis di bawah */}
      </div>
    </div>
  );
}
