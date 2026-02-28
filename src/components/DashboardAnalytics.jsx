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
} from "recharts";

export default function DashboardAnalytics({ transactions }) {

  // totals
  const income = transactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  // category expenses
  const categoryData = {};

  transactions
    .filter(t => t.type === "Expense")
    .forEach(t => {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + Number(t.amount);
    });

  const pieData = Object.keys(categoryData).map(key => ({
    name: key,
    value: categoryData[key],
  }));

  const COLORS = ["#7c5cff", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

  // monthly summary
  const monthData = {};

  transactions.forEach(t => {
    const month = new Date(t.id).toLocaleString("default", {
      month: "short",
    });

    monthData[month] =
      (monthData[month] || 0) + Number(t.amount);
  });

  const barData = Object.keys(monthData).map(m => ({
    month: m,
    amount: monthData[m],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* PIE CHART */}
      <div className="card">
        <h3>Expense Categories</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="card">
        <h3>Monthly Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#7c5cff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOTAL CARDS */}
      <div className="card">
        <h3>Total Income</h3>
        <h2 style={{color:"#22c55e"}}>₹{income}</h2>
      </div>

      <div className="card">
        <h3>Total Expense</h3>
        <h2 style={{color:"#ef4444"}}>₹{expense}</h2>
      </div>

      <div className="card lg:col-span-2">
        <h3>Current Balance</h3>
        <h2>₹{balance}</h2>
      </div>

    </div>
  );
}