import { useContext, useState } from "react";
import { BillContext } from "../context/BillContext";

export default function Bills() {

  const { bills, addBill, deleteBill } =
    useContext(BillContext);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  /* ===== ADD BILL ===== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !dueDate) return;

    addBill({
      id: Date.now(),
      name,
      amount: Number(amount),
      dueDate
    });

    setName("");
    setAmount("");
    setDueDate("");
  };

  /* ===== DATE CHECK ===== */
  const getStatus = (date) => {
    const today = new Date();
    const due = new Date(date);

    const diff =
      (due - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) return "overdue";
    if (diff <= 3) return "soon";
    return "ok";
  };

  return (
    <div className="space-y-6">

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="card space-y-3">
        <h3 className="text-lg font-semibold">
          Add Bill Reminder
        </h3>

        <input
          className="input"
          placeholder="Bill Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
        />

        <input
          className="input"
          type="date"
          value={dueDate}
          onChange={(e)=>setDueDate(e.target.value)}
        />

        <button className="primary-btn">
          Add Bill
        </button>
      </form>

      {/* BILL LIST */}
      <div className="grid gap-4">

        {bills.length === 0 ? (
          <p className="text-gray-400">No bills added</p>
        ) : (
          bills.map(bill => {

            const status = getStatus(bill.dueDate);

            return (
              <div key={bill.id} className="card">

                <div className="flex justify-between">
                  <h4 className="font-semibold">
                    {bill.name}
                  </h4>

                  <span>₹{bill.amount}</span>
                </div>

                <p className="text-sm text-gray-500">
                  Due: {bill.dueDate}
                </p>

                {status === "soon" && (
                  <p className="text-yellow-500">
                    ⏰ Due soon!
                  </p>
                )}

                {status === "overdue" && (
                  <p className="text-red-500">
                    ⚠ Overdue bill!
                  </p>
                )}

                <button
                  className="text-red-500 text-sm mt-2"
                  onClick={() => deleteBill(bill.id)}
                >
                  Delete
                </button>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}