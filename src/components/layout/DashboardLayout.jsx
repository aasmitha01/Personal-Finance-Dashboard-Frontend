import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto px-8 py-6 w-full">
          <Outlet />
        </main>

      </div>

    </div>
  );
}