import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import { TransactionContext } from "../context/TransactionContext";

export default function Budget() {

  /* ================= CONTEXT ================= */

  const {
    budgets,
    addBudget,
    deleteBudget,
    updateBudget
  } = useContext(BudgetContext);

  const { transactions } = useContext(TransactionContext);

  /* ================= FORM STATE ================= */

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  /* ================= ADD BUDGET ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !limit) return;

    addBudget({
      id: Date.now(),
      category,
      limit: Number(limit)
    });

    setCategory("");
    setLimit("");
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">

      {/* ===== ADD FORM ===== */}
      <form onSubmit={handleSubmit} className="card space-y-3">
        <h3 className="text-lg font-semibold">Create Budget</h3>

        <input
          className="input"
          placeholder="Category (Food, Travel...)"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Budget Limit"
          value={limit}
          onChange={(e)=>setLimit(e.target.value)}
        />

        <button className="primary-btn">
          Add Budget
        </button>
      </form>

      {/* ===== BUDGET LIST ===== */}
      <div className="grid gap-4">

        {budgets.length === 0 ? (
          <p className="text-gray-400">No budgets created</p>
        ) : (
          budgets.map(budget => {

            /* ===== SPENT CALCULATION ===== */
            const spent = transactions
              .filter(t =>
                t.type.toLowerCase() === "expense" &&
                t.category.toLowerCase() ===
                budget.category.toLowerCase()
              )
              .reduce((sum, t) => sum + Number(t.amount), 0);

            const remaining = budget.limit - spent;

            const progress = Math.min(
              (spent / budget.limit) * 100,
              100
            );

            const overSpent = spent > budget.limit;

            return (
              <div key={budget.id} className="card">

                {/* HEADER */}
                <div className="flex justify-between mb-2">
                  <h4 className="font-semibold">
                    {budget.category}
                  </h4>

                  <span>
                    ₹{spent} / ₹{budget.limit}
                  </span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      overSpent
                        ? "bg-red-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* STATUS */}
                <p
                  className={`text-sm mt-2 ${
                    overSpent
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {overSpent
                    ? "⚠ Budget exceeded!"
                    : `Remaining ₹${remaining}`}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 mt-3">

                  {/* EDIT */}
                  <button
                    className="text-blue-500 text-sm"
                    onClick={() => {
                      const newLimit = prompt(
                        "Enter new budget limit",
                        budget.limit
                      );

                      if (newLimit) {
                        updateBudget({
                          ...budget,
                          limit: Number(newLimit)
                        });
                      }
                    }}
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    className="text-red-500 text-sm"
                    onClick={() =>
                      deleteBudget(budget.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}