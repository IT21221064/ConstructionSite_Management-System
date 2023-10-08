import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firebasedb } from "../config/firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function UpdateSite() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [siteDetails, setSiteDetails] = useState(null);
  const [editedSiteDetails, setEditedSiteDetails] = useState({
    siteName: "",
    clientName: "",
    address: "",
    phone: "",
    totalSquareFeet: "",
    totalBudget: "",
  });

  useEffect(() => {
    // Function to fetch site details from Firestore
    const fetchSiteDetails = async () => {
      try {
        const sitesCollection = collection(firebasedb, "sites");
        const querySnapshot = await getDocs(sitesCollection);

        const site = querySnapshot.docs
          .map((doc) => {
            // Get site details from each document
            const data = doc.data();
            return { id: doc.id, ...data };
          })
          .find((site) => site.id === id); // Find the site with matching 'id'

        setSiteDetails(site);
        setEditedSiteDetails(site); // Set initial values for the edited site
      } catch (error) {
        console.error("Error fetching site details: ", error);
      }
    };

    // Call the fetchSiteDetails function
    fetchSiteDetails();
  }, [id]); // Include 'id' as a dependency to re-fetch when the URL parameter changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSiteDetails({
      ...editedSiteDetails,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const siteRef = doc(firebasedb, "sites", id);
      await updateDoc(siteRef, editedSiteDetails);
      console.log("Site details updated successfully!");
      navigate("/sitelist");
    } catch (error) {
      console.error("Error updating site details: ", error);
    }
  };

  if (!siteDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Site Details</h1>
      <h2>{siteDetails.siteName}</h2>
      <form onSubmit={handleSubmit}>
        <label>Client Name:</label>
        <br />
        <input
          type="text"
          name="clientName"
          value={editedSiteDetails.clientName}
          onChange={handleChange}
        />
        <br />
        <label>Site Name:</label>
        <br />
        <input
          type="text"
          name="siteName"
          value={editedSiteDetails.siteName}
          onChange={handleChange}
        />
        <br />
        <label>Address:</label>
        <br />
        <textarea
          name="address"
          value={editedSiteDetails.address}
          onChange={handleChange}
        ></textarea>
        <br />
        <label>Phone:</label>
        <br />
        <input
          type="text"
          name="phone"
          value={editedSiteDetails.phone}
          onChange={handleChange}
        />
        <br />
        <label>Total Square Feet:</label>
        <br />
        <input
          type="text"
          name="totalSquareFeet"
          value={editedSiteDetails.totalSquareFeet}
          onChange={handleChange}
        />
        <br />
        <label>Total Budget:</label>
        <br />
        <input
          type="text"
          name="totalBudget"
          value={editedSiteDetails.totalBudget}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Update Site Details</button>
      </form>
    </div>
  );
}

export default UpdateSite;
