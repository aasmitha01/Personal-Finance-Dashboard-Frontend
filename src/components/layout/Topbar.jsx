import { Bell, Search, User } from "lucide-react";
import UserMenu from "../UserMenu";

export default function Topbar() {
  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

      {/* Search */}
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-80">
        <Search size={18}/>
        <input
          className="bg-transparent outline-none ml-2 w-full"
          placeholder="Search..."
        />
      </div>

      {/* Right Side */}
    <div className="flex items-center gap-6">
  <Bell className="cursor-pointer text-gray-600" />
  <UserMenu />
</div>

    </div>
  );
}