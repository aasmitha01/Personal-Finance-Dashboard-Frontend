import { createContext, useState, useEffect } from "react";

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {

  /* ===== LOAD FROM LOCAL STORAGE ===== */

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  /* ===== ADD GOAL ===== */

  const addGoal = (goal) => {
    setGoals(prev => [...prev, goal]);
  };

  /* ===== DELETE GOAL (IMPORTANT) ===== */

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  /* ===== UPDATE GOAL ===== */

  const updateGoal = (updatedGoal) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === updatedGoal.id ? updatedGoal : g
      )
    );
  };

  /* ===== SAVE TO LOCAL STORAGE ===== */

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        deleteGoal,
        updateGoal
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};