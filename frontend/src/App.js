import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/auth";
import ManagementDashboard from "./pages/managementDashboard";
import AccountantDashboard from "./pages/acountantDashbord";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/Mngdashboard" element={<ManagementDashboard />} />
          <Route path="/Accdashboard" element={<AccountantDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
