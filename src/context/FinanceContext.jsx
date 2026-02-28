import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {

  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev =>
      prev.filter(t => t.id !== id)
    );
  };

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);