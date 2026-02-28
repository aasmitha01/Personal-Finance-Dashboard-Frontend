import { createContext, useState, useEffect } from "react";

export const BillContext = createContext();

export const BillProvider = ({ children }) => {

  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem("bills");
    return saved ? JSON.parse(saved) : [];
  });

  /* ===== ADD BILL ===== */
  const addBill = (bill) => {
    setBills(prev => [...prev, bill]);
  };

  /* ===== DELETE ===== */
  const deleteBill = (id) => {
    setBills(prev => prev.filter(b => b.id !== id));
  };

  /* ===== UPDATE ===== */
  const updateBill = (updatedBill) => {
    setBills(prev =>
      prev.map(b =>
        b.id === updatedBill.id ? updatedBill : b
      )
    );
  };

  /* ===== SAVE ===== */
  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

  return (
    <BillContext.Provider
      value={{ bills, addBill, deleteBill, updateBill }}
    >
      {children}
    </BillContext.Provider>
  );
};