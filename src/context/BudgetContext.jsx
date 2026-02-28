import { createContext, useState, useEffect } from "react";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {

  /* ================= LOAD FROM LOCAL STORAGE ================= */

  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem("budgets");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading budgets:", error);
      return [];
    }
  });

  /* ================= ADD BUDGET ================= */

  const addBudget = (budget) => {
    setBudgets(prev => [...prev, budget]);
  };

  /* ================= DELETE BUDGET ================= */

  const deleteBudget = (id) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  /* ================= UPDATE / EDIT BUDGET ================= */

  const updateBudget = (updatedBudget) => {
    setBudgets(prev =>
      prev.map(b =>
        b.id === updatedBudget.id ? updatedBudget : b
      )
    );
  };

  /* ================= SAVE TO LOCAL STORAGE ================= */

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  /* ================= PROVIDER ================= */

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        deleteBudget,
        updateBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};