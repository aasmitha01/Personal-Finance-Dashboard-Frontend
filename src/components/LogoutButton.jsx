import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="
        w-full
        mt-6
        py-3
        rounded-xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-red-500
        to-red-600
        hover:from-red-600
        hover:to-red-700
        transition-all
        duration-300
        shadow-md
        hover:shadow-lg
        active:scale-95
      "
    >
      Logout
    </button>
  );
}