import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function Dashboard() {

  const { transactions } = useContext(TransactionContext);

  /* ================= CALCULATIONS ================= */

  const income = transactions
    .filter(t => t.type.toLowerCase() === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type.toLowerCase() === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  const recentTransactions = [...transactions]
    .reverse()
    .slice(0, 5);

  /* ================= UI ================= */

  return (
    <div className="w-full">

      <p className="text-gray-500 mb-6">
        Track smarter. Spend wiser.
      </p>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* BALANCE */}
        <div className="card">
          <p className="text-gray-500">Total Balance</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{balance}
          </h2>
        </div>

        {/* INCOME */}
        <div className="card">
          <p className="text-gray-500">Income</p>
          <h2 className="text-3xl font-bold text-green-500 mt-2">
            ₹{income}
          </h2>
        </div>

        {/* EXPENSE */}
        <div className="card">
          <p className="text-gray-500">Expense</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            ₹{expense}
          </h2>
        </div>

      </div>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">
          Recent Transactions
        </h3>

        {recentTransactions.length === 0 ? (
          <p className="text-gray-400">
            No transactions yet
          </p>
        ) : (
          recentTransactions.map(t => (
            <div
              key={t.id}
              className="flex justify-between items-center py-3 border-b last:border-none"
            >
              <div>
                <p className="font-medium">{t.category}</p>
                <span className="text-sm text-gray-400 capitalize">
                  {t.type}
                </span>
              </div>

              <p
                className={
                  t.type.toLowerCase() === "income"
                    ? "text-green-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {t.type.toLowerCase() === "income" ? "+" : "-"} ₹{t.amount}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}