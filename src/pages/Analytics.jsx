import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useAIInsights from "../hooks/useAIInsights";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Analytics() {

  /* ================= GLOBAL DATA ================= */

  const { transactions } = useContext(TransactionContext);
  const aiInsights = useAIInsights();

  /* ================= CALCULATIONS ================= */

  const income = transactions
    .filter(t => t.type.toLowerCase() === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type.toLowerCase() === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  /* ================= PIE DATA ================= */

  const categoryMap = {};

  transactions
    .filter(t => t.type.toLowerCase() === "expense")
    .forEach(t => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Number(t.amount);
    });

  const pieData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = [
    "#7c5cff",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
  ];

  /* ================= MONTHLY BAR DATA ================= */

  const monthly = {};

  transactions.forEach(t => {

    // safe date handling
    const transactionDate = t.date
      ? new Date(t.date)
      : new Date(t.id);

    const month = transactionDate.toLocaleString("default", {
      month: "short",
    });

    if (!monthly[month]) {
      monthly[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (t.type.toLowerCase() === "income")
      monthly[month].income += Number(t.amount);
    else
      monthly[month].expense += Number(t.amount);
  });

  const barData = Object.values(monthly);

  /* ================= SMART INSIGHTS ================= */

  const highestCategory =
    pieData.length > 0
      ? pieData.reduce((a, b) => (a.value > b.value ? a : b))
      : null;

  const savingsRate =
    income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  /* ================= UI ================= */

  return (
    <div className="w-full space-y-8">

      <h2 className="text-2xl font-semibold">
        Analytics Overview
      </h2>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="card">
          <p>Total Income</p>
          <h2 className="text-2xl text-green-500 font-bold">
            ₹{income}
          </h2>
        </div>

        <div className="card">
          <p>Total Expense</p>
          <h2 className="text-2xl text-red-500 font-bold">
            ₹{expense}
          </h2>
        </div>

        <div className="card">
          <p>Balance</p>
          <h2 className="text-2xl font-bold">
            ₹{balance}
          </h2>
        </div>

      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PIE */}
        <div className="card">
          <h3 className="mb-4 font-semibold">
            Expense Categories
          </h3>

          {pieData.length === 0 ? (
            <p>No expense data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* BAR */}
        <div className="card">
          <h3 className="mb-4 font-semibold">
            Monthly Income vs Expense
          </h3>

          {barData.length === 0 ? (
            <p>No monthly data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#22c55e" />
                <Bar dataKey="expense" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

      {/* ===== SMART INSIGHTS ===== */}
      <div className="card">
        <h3 className="font-semibold mb-3">
          Smart Insights
        </h3>

        <p>✅ Current balance: ₹{balance}</p>
        <p>💰 Savings rate: {savingsRate}%</p>

        {highestCategory && (
          <p>
            📊 Highest spending category:
            <b> {highestCategory.name}</b>
          </p>
        )}

        {expense > income && (
          <p className="text-red-500">
            ⚠ Expenses are higher than income!
          </p>
        )}

        {balance > 0 && (
          <p className="text-green-500">
            🎉 You are saving money!
          </p>
        )}
      </div>


      {/* ===== AI INSIGHTS ===== */}
<div className="card">
  <h3 className="font-semibold mb-3">
    🤖 AI Financial Insights
  </h3>

  {aiInsights.length === 0 ? (
    <p className="text-gray-400">
      Add more monthly data to generate insights.
    </p>
  ) : (
    aiInsights.map((insight, index) => (
      <p key={index} className="mb-2">
        {insight}
      </p>
    ))
  )}
</div>

    </div>
  );
}