import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      {/* AVATAR BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <span className="hidden md:block font-medium">
          {user?.name}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="
          absolute right-0 mt-3 w-48
          bg-white dark:bg-gray-800
          rounded-xl shadow-lg p-2
        ">

          <Link
            to="/settings"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <User size={18}/> Profile
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Settings size={18}/> Settings
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full p-2 text-red-500 hover:bg-red-50 rounded"
          >
            <LogOut size={18}/> Logout
          </button>

        </div>
      )}
    </div>
  );
}