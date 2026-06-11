import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";
import Footer from "../components/organisms/Footer";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ title = "" }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col ml-64">
        <Header
          title={title}
          rightContent={
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          }
        />

        <div className="p-6 flex-1 overflow-auto">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}
