import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function Dashboard() {
  const mahasiswaData = [
    { jurusan: "Informatika", jumlah: 120 },
    { jurusan: "Sistem Informasi", jumlah: 90 },
    { jurusan: "Teknik Komputer", jumlah: 60 },
  ];

  const userData = [
    { bulan: "Jan", jumlah: 10 },
    { bulan: "Feb", jumlah: 15 },
    { bulan: "Mar", jumlah: 22 },
    { bulan: "Apr", jumlah: 28 },
    { bulan: "Mei", jumlah: 35 },
  ];

  const roleData = [
    { name: "Admin", value: 2 },
    { name: "User", value: 8 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* CARD */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-500">Total Mahasiswa</h2>
          <p className="text-3xl font-bold">270</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-500">Total Dosen</h2>
          <p className="text-3xl font-bold">35</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-500">Total Mata Kuliah</h2>
          <p className="text-3xl font-bold">25</p>
        </div>
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-4">Mahasiswa per Jurusan</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mahasiswaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jurusan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jumlah" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-4">Role User</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART */}
        <div className="bg-white p-4 rounded shadow lg:col-span-2">
          <h2 className="font-bold mb-4">Pertumbuhan User</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="jumlah" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
