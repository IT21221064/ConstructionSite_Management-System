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
    items: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleAddItem = () => {
    setFormdata({
      ...formdata,
      items: [...formdata.items, { item: "", price: "" }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...formdata.items];
    updatedItems.splice(index, 1);

    setFormdata({
      ...formdata,
      items: updatedItems,
    });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...formdata.items];
    updatedItems[index][name] = value;

    setFormdata({
      ...formdata,
      items: updatedItems,
    });
  };

  const navigate = useNavigate();
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
        items: [],
      });
      navigate("/sellerlist");
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

        {/* Display the items dynamically */}
        {formdata.items.map((item, index) => (
          <div key={index}>
            <label>Item Code</label>
            <input
              type="text"
              name="itemcode"
              value={item.itemcode}
              onChange={(e) => handleItemChange(e, index)}
            />
            <label>Item Name</label>
            <input
              type="text"
              name="item"
              value={item.item}
              onChange={(e) => handleItemChange(e, index)}
            />
            <label>Item Price</label>
            <input
              type="text"
              name="price"
              value={item.price}
              onChange={(e) => handleItemChange(e, index)}
            />
            <button type="button" onClick={() => handleRemoveItem(index)}>
              Remove Item
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddSeller;
