import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { AlertProvider } from "./context/AlertContext";
import { FinanceProvider } from "./context/FinanceContext";
import { GoalProvider } from "./context/GoalContext";
import { TransactionProvider } from "./context/TransactionContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BudgetProvider } from "./context/BudgetContext";
import { BillProvider } from "./context/BillContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <AlertProvider>
          <FinanceProvider>
            <TransactionProvider>
                <GoalProvider>
                  <BudgetProvider>
                    <BillProvider>
                   <App />
                  <Toaster position="top-right" />
                  </BillProvider>
              </BudgetProvider>
            </GoalProvider>
           </TransactionProvider>
         </FinanceProvider>
        </AlertProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);