export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white fixed">
      <div className="p-6 text-xl font-bold">Admin</div>

      <nav>
        <div className="px-6 py-3 hover:bg-blue-700 cursor-pointer">
          Dashboard
        </div>
        <div className="px-6 py-3 bg-blue-700 cursor-pointer">Mahasiswa</div>
      </nav>
    </div>
  );
}
