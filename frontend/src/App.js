import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/auth";
import ManagementDashboard from "./pages/managementDashboard";
import AccountantDashboard from "./pages/acountantDashbord";
import AddSite from "./pages/addSitePage";
import SiteList from "./pages/siteList";
import SiteDetailsPage from "./pages/siteDetails";
import UpdateSite from "./pages/updateSite";
import Addseller from "./pages/addseller";
import SellerList from "./pages/sellerList";
import SellerDetails from "./pages/sellerDetails";
import AddOrder from "./pages/addOrder";
import PendingOrderList from "./pages/pendingOrderList";
import PendingOrderDetails from "./pages/pendingOrderDetails";

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
          <Route path="/addseller" element={<Addseller />} />
          <Route path="/sellerlist" element={<SellerList />} />
          <Route path="/sellerdetails/:id" element={<SellerDetails />} />
          <Route path="/addorder" element={<AddOrder />} />
          <Route path="/pendingorders" element={<PendingOrderList />} />
          <Route path="/pendingorderdetails/:id" element={<PendingOrderDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
