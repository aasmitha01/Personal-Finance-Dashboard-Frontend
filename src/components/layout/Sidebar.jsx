import { NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import { useFinance } from "../../context/FinanceContext";

import {
  LayoutDashboard,
  Receipt,
  Target,
  Wallet,
  BarChart3,
  Bell,
  FileText
} from "lucide-react";

export default function Sidebar() {

  /* ================= GLOBAL DATA ================= */

  const { transactions } = useFinance();

  /* ================= ALERT COUNT ================= */

  const income = transactions
    .filter(t => t.type === "Income")
    .reduce((s, t) => s + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "Expense")
    .reduce((s, t) => s + Number(t.amount), 0);

  const balance = income - expense;

  let alertCount = 0;

  // Expense > Income
  if (expense > income) alertCount++;

  // Negative balance
  if (balance < 0) alertCount++;

  // Low balance warning
  if (balance > 0 && balance < 1000) alertCount++;

  /* ================= STYLES ================= */

  const linkStyle =
    "flex items-center justify-between p-3 rounded-lg transition-all";

  const active =
    "bg-purple-100 text-purple-600 font-semibold dark:bg-purple-900";

  const normal =
    "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";

  /* ================= MENU ================= */

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: Receipt },
    { name: "Goals", path: "/goals", icon: Target },
    { name: "Budget", path: "/budget", icon: Wallet },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Alerts", path: "/alerts", icon: Bell },
    { name: "Bills", path: "/bills", icon: FileText }, // ⭐ ADDED
  ];

  /* ================= UI ================= */

  return (
    <div className="w-64 bg-white dark:bg-gray-900 shadow-lg p-6 flex flex-col justify-between">

      {/* ===== TOP ===== */}
      <div>

        <h1 className="text-2xl font-bold text-purple-600 mb-10">
          SpendSense
        </h1>

        <nav className="flex flex-col gap-2">

          {menu.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? active : normal}`
                }
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  {item.name}
                </div>

                {/* ALERT BADGE */}
                {item.name === "Alerts" && alertCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {alertCount}
                  </span>
                )}

              </NavLink>
            );
          })}

        </nav>
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="space-y-4">

        <ThemeToggle />

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}