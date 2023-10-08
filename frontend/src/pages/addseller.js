import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firebasedb } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function AddSeller() {
  const [formdata, setFormdata] = useState({
    sellername: "",
    phone: "",
    email: "",
    address: "",
    item1: "",
    item2: "",
    item3: "",
    item4: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sellersCollection = collection(firebasedb, "sellers");
      await addDoc(sellersCollection, formdata);

      console.log("Seller added successfully");

      // Clear the form fields after submission
      setFormdata({
        sellername: "",
        phone: "",
        email: "",
        address: "",
        item1: "",
        item2: "",
        item3: "",
        item4: "",
      });
    } catch (err) {
      console.error("Error adding seller: ", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add Seller</h1>
        <label>Seller Name</label>
        <br />
        <input
          type="text"
          name="sellername"
          value={formdata.sellername}
          onChange={handleChange}
        />
        <br />
        <label>Phone Number</label>
        <br />
        <input
          type="text"
          name="phone"
          value={formdata.phone}
          onChange={handleChange}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          value={formdata.email}
          onChange={handleChange}
        />
        <br />
        <label>Address</label>
        <br />
        <input
          type="text"
          name="address"
          value={formdata.address}
          onChange={handleChange}
        />
        <br />
        <label>Supplying Item 1</label>
        <br />
        <input
          type="text"
          name="item1"
          value={formdata.item1}
          onChange={handleChange}
        />
        <br />
        <label>Supplying Item 2</label>
        <br />
        <input
          type="text"
          name="item2"
          value={formdata.item2}
          onChange={handleChange}
        />
        <br />
        <label>Supplying Item 3</label>
        <br />
        <input
          type="text"
          name="item3"
          value={formdata.item3}
          onChange={handleChange}
        />
        <br />
        <label>Supplying Item 4</label>
        <br />
        <input
          type="text"
          name="item4"
          value={formdata.item4}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddSeller;
