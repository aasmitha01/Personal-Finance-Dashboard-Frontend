import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const token = localStorage.getItem("token");

  // 🔔 fetch alerts
  const fetchAlerts = async () => {
    try {
      const res = await axios.get(
        "/api/alerts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlerts(res.data);
    } catch (err) {
      console.log("Alert fetch error", err);
    }
  };

  // auto load
  useEffect(() => {
    if (token) fetchAlerts();
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, fetchAlerts }}>
      {children}
    </AlertContext.Provider>
  );
}