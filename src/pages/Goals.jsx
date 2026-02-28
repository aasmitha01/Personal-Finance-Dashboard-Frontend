import { useContext, useState } from "react";
import { GoalContext } from "../context/GoalContext";
import { TransactionContext } from "../context/TransactionContext";

export default function Goals() {

  /* ================= CONTEXT ================= */

  const {
    goals,
    addGoal,
    deleteGoal,
    updateGoal
  } = useContext(GoalContext);

  const { transactions } = useContext(TransactionContext);

  /* ================= FORM STATE ================= */

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  /* ================= SAVINGS CALCULATION ================= */

  // total savings = income - expense
  const savedAmount = transactions.reduce((total, t) => {
    return t.type.toLowerCase() === "income"
      ? total + Number(t.amount)
      : total - Number(t.amount);
  }, 0);

  /* ================= ADD GOAL ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !target) return;

    addGoal({
      id: Date.now(),
      title,
      target: Number(target),
    });

    setTitle("");
    setTarget("");
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">

      {/* ===== ADD GOAL FORM ===== */}
      <form onSubmit={handleSubmit} className="card space-y-3">
        <h3 className="font-semibold text-lg">Create Goal</h3>

        <input
          className="input"
          placeholder="Goal name (Laptop, Bike...)"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Target Amount"
          value={target}
          onChange={(e)=>setTarget(e.target.value)}
        />

        <button className="primary-btn">
          Add Goal
        </button>
      </form>

      {/* ===== GOALS LIST ===== */}
      <div className="grid gap-4">

        {goals.length === 0 ? (
          <p className="text-gray-400">No goals added</p>
        ) : (
          goals.map(goal => {

            /* progress calculation */
            const progress = Math.min(
              (savedAmount / goal.target) * 100,
              100
            );

            const completed = progress >= 100;

            return (
              <div key={goal.id} className="card">

                {/* TITLE + VALUES */}
                <div className="flex justify-between mb-2">
                  <h4 className="font-semibold">
                    {goal.title}
                  </h4>

                  <span>
                    ₹{savedAmount} / ₹{goal.target}
                  </span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      completed
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* STATUS */}
                <p className="text-sm text-gray-500 mt-2">
                  {completed
                    ? "🎉 Goal Completed!"
                    : `${progress.toFixed(1)}% completed`}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 mt-3">

                  {/* EDIT */}
                  <button
                    className="text-blue-500 text-sm"
                    onClick={() => {
                      const newTarget = prompt(
                        "Enter new target",
                        goal.target
                      );

                      if (newTarget) {
                        updateGoal({
                          ...goal,
                          target: Number(newTarget)
                        });
                      }
                    }}
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => deleteGoal(goal.id)}
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
