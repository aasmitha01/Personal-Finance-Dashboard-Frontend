import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function Transactions() {

  // ⭐ get data from Context
  const { transactions, addTransaction } = useContext(TransactionContext);

  // form states
  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category) return;

    addTransaction({
      id: Date.now(),
      type,
      amount: Number(amount),
      category,
      date: new Date()
    });

    // reset fields
    setAmount("");
    setCategory("");
  };

  return (
    <div className="p-5 space-y-5">

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} className="card space-y-3">
        <h3 className="font-semibold text-lg">Add Transaction</h3>

        <select
          className="input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="input"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className="primary-btn">
          Add Transaction
        </button>
      </form>

      {/* ================= LIST ================= */}
      <div>
        <h3 className="font-semibold text-lg mb-3">
          Transaction History
        </h3>

        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className="card flex justify-between items-center mb-2"
            >
              <div>
                <p className="font-medium">{t.category}</p>
                <p className="text-sm text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>

              <p
                className={
                  t.type === "Income"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {t.type === "Income" ? "+" : "-"} ₹{t.amount}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}