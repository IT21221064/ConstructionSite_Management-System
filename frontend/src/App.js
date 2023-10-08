import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/auth";
import ManagementDashboard from "./pages/managementDashboard";
import AccountantDashboard from "./pages/acountantDashbord";
import AddSite from "./pages/addSitePage";
import SiteList from "./pages/siteList";
import SiteDetailsPage from "./pages/siteDetails";
import UpdateSite from "./pages/updateSite"
import Addseller from "./pages/addseller";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/Mngdashboard" element={<ManagementDashboard />} />
          <Route path="/Accdashboard" element={<AccountantDashboard />} />
          <Route path="/addsite" element={<AddSite />} />
          <Route path="/sitelist" element={<SiteList />} />
          <Route path="/sitedetails/:id" element={<SiteDetailsPage />} />
          <Route path="/updatesite/:id" element={<UpdateSite />} />
          <Route path="/addseller" element={<Addseller/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
