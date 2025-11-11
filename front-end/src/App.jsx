import React from "react";
import LogIn from "./auth/LogIn";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./dashboard/pages/Home";
import Assets from "./dashboard/pages/Assets";
import Layout from "./dashboard/Layout";
import Accounts from "./dashboard/pages/Accounts";
import Reports from "./dashboard/pages/Reports";
import DepreciationPage from "./dashboard/pages/reports-page/DepreciationPage";
import InventoryPage from "./dashboard/pages/reports-page/InventoryPage";
import LifecyclePage from "./dashboard/pages/reports-page/LifecyclePage";

const App = () => {
  return (
    <div className="min-h-screen absolute inset-0 bg-gradient-to-br from-gray-300 via-white/10 to-white/5">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/reports" element={<Reports />}>
            <Route path="depreciation" element={<DepreciationPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="lifecycle" element={<LifecyclePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
