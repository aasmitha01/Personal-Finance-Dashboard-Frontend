import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function useAIInsights() {

  const { transactions } = useContext(TransactionContext);

  if (transactions.length === 0) return [];

  /* ================= GROUP BY MONTH ================= */

  const monthly = {};

  transactions.forEach(t => {

    const date = t.date ? new Date(t.date) : new Date(t.id);

    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!monthly[key]) {
      monthly[key] = { income: 0, expense: 0, categories: {} };
    }

    if (t.type.toLowerCase() === "income") {
      monthly[key].income += Number(t.amount);
    } else {
      monthly[key].expense += Number(t.amount);

      monthly[key].categories[t.category] =
        (monthly[key].categories[t.category] || 0)
        + Number(t.amount);
    }
  });

  const months = Object.keys(monthly).sort();

  if (months.length < 2) return [];

  const current = monthly[months[months.length - 1]];
  const previous = monthly[months[months.length - 2]];

  const insights = [];

  /* ================= EXPENSE CHANGE ================= */

  if (current.expense > previous.expense) {
    const diff = (
      ((current.expense - previous.expense) / previous.expense) * 100
    ).toFixed(1);

    insights.push(`⚠ Expenses increased by ${diff}% compared to last month.`);
  }

  /* ================= SAVINGS IMPROVEMENT ================= */

  const currentSavings = current.income - current.expense;
  const previousSavings = previous.income - previous.expense;

  if (currentSavings > previousSavings) {
    insights.push("🎉 Your savings improved this month!");
  }

  /* ================= TOP SPENDING CATEGORY ================= */

  const highestCategory = Object.entries(current.categories)
    .sort((a, b) => b[1] - a[1])[0];

  if (highestCategory) {
    insights.push(
      `💡 You spent most on ${highestCategory[0]}. Consider optimizing this category.`
    );
  }

  /* ================= LOW SAVINGS WARNING ================= */

  if (current.income > 0 &&
      currentSavings / current.income < 0.2) {
    insights.push(
      "⚠ Savings rate is below 20%. Try reducing non-essential expenses."
    );
  }

  return insights;
}