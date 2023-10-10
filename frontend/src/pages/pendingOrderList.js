import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { firebasedb } from "../config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

function PendingOrderList() {
  const [pendingOrderDetails, setPendingOrderDetails] = useState([]);
  const [sites, setSites] = useState([]); // State to store the available sites
  const [selectedSite, setSelectedSite] = useState(""); // State to store the selected site

  useEffect(() => {
    const fetchPendingOrderDetails = async () => {
      try {
        const pendingOrderCollection = collection(firebasedb, "pendingOrders");
        let querySnapshot;

        if (selectedSite) {
          // If a site is selected, filter orders based on the site
          const q = query(
            pendingOrderCollection,
            where("site", "==", selectedSite)
          );
          querySnapshot = await getDocs(q);
        } else {
          // If no site is selected, fetch all pending orders
          querySnapshot = await getDocs(pendingOrderCollection);
        }

        const pendingOrderDetailsArray = [];
        const uniqueSites = new Set(); // Use Set to ensure unique site values

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const site = data.site;
          uniqueSites.add(site); // Add the site to the Set
          pendingOrderDetailsArray.push({ id: doc.id, ...data });
        });

        setSites(Array.from(uniqueSites)); // Convert Set to an array and set it as available sites
        setPendingOrderDetails(pendingOrderDetailsArray);
      } catch (error) {
        console.error("Error fetching pending order details: ", error);
      }
    };
    fetchPendingOrderDetails();
  }, [selectedSite]);

  const handleSiteChange = (e) => {
    const site = e.target.value;
    setSelectedSite(site);
  };

  return (
    <div>
      <h1>Pending Order List</h1>
      {/* Dropdown to select a site */}
      <label>Select a Site: </label>
      <select onChange={handleSiteChange} value={selectedSite}>
        <option value="">All Sites</option>
        {sites.map((site) => (
          <option key={site} value={site}>
            {site}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Seller Name</th>
            <th>Date</th>
            <th>Site</th>
            <th>Site Manager</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrderDetails.map((porder) => (
            <tr key={porder.id}>
              <td>{porder.ponumber}</td>
              <td>{porder.sellername}</td>
              <td>{porder.pdate}</td>
              <td>{porder.site}</td>
              <td>{porder.sitemanager}</td>
              <td>{porder.totalPurchasePrice}</td>
              <td>{porder.status}</td>

              <td>
                <Link to={`/pendingorderdetails/${porder.id}`}>
                  <FontAwesomeIcon icon={faEye} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingOrderList;
