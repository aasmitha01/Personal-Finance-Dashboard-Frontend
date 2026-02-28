import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Settings() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">
        Profile Settings
      </h1>

      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
    </div>
  );
}