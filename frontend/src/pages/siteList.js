import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { firebasedb } from "../config/firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

function SiteList() {
  const [siteDetails, setSiteDetails] = useState([]);

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const sitesCollection = collection(firebasedb, "sites");
        const querySnapshot = await getDocs(sitesCollection);
        const siteDetailsArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          siteDetailsArray.push({ id: doc.id, ...data }); // Include document ID
        });

        setSiteDetails(siteDetailsArray);
      } catch (error) {
        console.error("Error fetching site details: ", error);
      }
    };

    fetchSiteDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const siteRef = doc(firebasedb, "sites", id);
      await deleteDoc(siteRef);
      // Remove the deleted site from the state
      setSiteDetails((prevDetails) =>
        prevDetails.filter((site) => site.id !== id)
      );
    } catch (error) {
      console.error("Error deleting site: ", error);
    }
  };

  return (
    <div>
      <h1>Site Details</h1>
      <Link to="/addsite">
        <button>Add Site</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Site Name</th>
            <th>Client Name</th>
            <th>Address</th>
            <th>Total Budget</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {siteDetails.map((site) => (
            <tr key={site.id}>
              <td>{site.siteName}</td>
              <td>{site.clientName}</td>
              <td>{site.address}</td>
              <td>{site.totalBudget}</td>
              <td>
                <Link to={`/sitedetails/${site.id}`}>
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link to={`/updatesite/${site.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button onClick={() => handleDelete(site.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SiteList;
