import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firebasedb } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

function SiteDetailsPage() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [siteDetails, setSiteDetails] = useState(null);

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
      } catch (error) {
        console.error("Error fetching site details: ", error);
      }
    };

    // Call the fetchSiteDetails function
    fetchSiteDetails();
  }, [id]); // Include 'id' as a dependency to re-fetch when the URL parameter changes

  if (!siteDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Site Details</h1>
      <h2>{siteDetails.siteName}</h2>
      <p>Client Name: {siteDetails.clientName}</p>
      <p>Address: {siteDetails.address}</p>
      <p>Phone: {siteDetails.phone}</p>
      <p>Total Square Feet: {siteDetails.totalSquareFeet}</p>
      <p>Total Budget: {siteDetails.totalBudget}</p>
    </div>
  );
}

export default SiteDetailsPage;
