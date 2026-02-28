import api from "./api";

/* ================= GET ================= */
export const getTransactions = async () => {
  const res = await api.get("/transactions");
  return res.data;
};

/* ================= ADD ================= */
export const addTransaction = async (data) => {
  const res = await api.post("/transactions", data);
  return res.data;
};

/* ================= DELETE ================= */
export const deleteTransaction = async (id) => {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
};

/* ================= UPDATE ================= */
export const updateTransaction = async (id, data) => {
  const res = await api.put(`/transactions/${id}`, data);
  return res.data;
};