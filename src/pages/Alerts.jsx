import { useFinance } from "../context/FinanceContext";

export default function Alerts() {

  const { transactions } = useFinance();

  /* ================= CALCULATIONS ================= */

  const income = transactions
    .filter(t => t.type === "Income")
    .reduce((s, t) => s + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "Expense")
    .reduce((s, t) => s + Number(t.amount), 0);

  const balance = income - expense;

  /* ================= CATEGORY EXPENSE ================= */

  const categoryMap = {};

  transactions
    .filter(t => t.type === "Expense")
    .forEach(t => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Number(t.amount);
    });

  /* ================= ALERT RULES ================= */

  const alerts = [];

  // Expense higher than income
  if (expense > income) {
    alerts.push({
      type: "danger",
      message: "Expenses are higher than income!"
    });
  }

  // Low balance warning
  if (balance < 1000 && balance > 0) {
    alerts.push({
      type: "warning",
      message: "Your balance is getting low."
    });
  }

  // Negative balance
  if (balance < 0) {
    alerts.push({
      type: "danger",
      message: "Your balance is negative!"
    });
  }

  // High spending category
  Object.entries(categoryMap).forEach(([cat, value]) => {
    if (value > income * 0.4) {
      alerts.push({
        type: "warning",
        message: `High spending detected in ${cat}.`
      });
    }
  });

  /* ================= UI ================= */

  return (
    <div className="w-full">

      <h2 className="text-2xl font-semibold mb-6">
        Alerts & Notifications
      </h2>

      <div className="card">

        {alerts.length === 0 ? (
          <p className="text-green-500">
            ✅ No alerts — your finances look healthy!
          </p>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg mb-3 ${
                alert.type === "danger"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {alert.message}
            </div>
          ))
        )}

      </div>

    </div>
  );
}