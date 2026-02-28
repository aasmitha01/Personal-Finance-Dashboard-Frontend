import { useState } from "react";
import api from "../services/api"

export default function AddTransaction({ addTransaction }) {

  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category) return;

    // ✅ THIS IS THE IMPORTANT PART
    addTransaction({
      id: Date.now(),
      type,
      amount: Number(amount),
      category,
      date: new Date()
    });

    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <select
        className="input"
        value={type}
        onChange={(e)=>setType(e.target.value)}
      >
        <option>Income</option>
        <option>Expense</option>
      </select>

      <input
        className="input"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />

      <input
        className="input"
        placeholder="Category"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
      />

      <button className="primary-btn">
        Add
      </button>
    </form>
  );
}