import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firebasedb } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function AddSitePage() {
  const [formData, setFormData] = useState({
    clientName: "",
    siteName: "",
    address: "",
    phone: "",
    totalSquareFeet: "",
    totalBudget: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};

    if (!formData.siteName.trim()) {
      newErrors.siteName = "Site Name is required";
    }

    if (!formData.totalBudget.trim()) {
      newErrors.totalBudget = "Total Budget is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      // Define the Firestore collection where you want to store the data
      const sitesCollection = collection(firebasedb, "sites");

      // Add the form data to the Firestore collection
      const docRef = await addDoc(sitesCollection, formData);

      console.log("Site added with ID: ", docRef.id);

      // Clear the form after successful submission
      setFormData({
        clientName: "",
        siteName: "",
        address: "",
        phone: "",
        totalSquareFeet: "",
        totalBudget: "",
      });
      navigate("/sitelist");
    } catch (error) {
      console.error("Error adding site: ", error);
    }
  };

  return (
    <>
      <div>
        <h1>Add Site</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Client Name:</label>
        <br />
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          placeholder="Insert client name..."
          onChange={handleChange}
        />
        <br />
        <label>Site Name:</label>
        <br />
        <input
          type="text"
          name="siteName"
          value={formData.siteName}
          placeholder="Insert site name..."
          onChange={handleChange}
        />
        <br />
        <label>Address:</label>
        <br />
        <textarea
          name="address"
          value={formData.address}
          placeholder="Insert address..."
          onChange={handleChange}
        ></textarea>
        <br />
        <label>Phone:</label>
        <br />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Insert phone number..."
          onChange={handleChange}
        />
        <br />
        <label>Total Square Feet:</label>
        <br />
        <input
          type="text"
          name="totalSquareFeet"
          value={formData.totalSquareFeet}
          placeholder="Insert size of the site..."
          onChange={handleChange}
        />
        <br />
        <label>Total Budget:</label>
        <br />
        <input
          type="text"
          name="totalBudget"
          value={formData.totalBudget}
          placeholder="Insert budget..."
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddSitePage;
