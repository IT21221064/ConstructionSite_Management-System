import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { firebasedb } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const [orderDetails, setOrderDetails] = useState({
    ponumber: "",
    pdate: "",
    sellername: "",
    selleraddress: "",
    selleremail: "",
    sellerphone: "",
    company: "",
    site: "",
    sitemanager: "",
    siteemail: "",
    items: [], // Array to hold selected items
  });

  const [sellers, setSellers] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]); // Items supplied by the selected seller
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedItemPrice, setSelectedItemPrice] = useState("");
  const [selectedItemQuantity, setSelectedItemQuantity] = useState(""); // Quantity of the selected item
  const [additionalItems, setAdditionalItems] = useState([]); // Additional items selected
  const navigate = useNavigate();

  // Function to calculate the total price for an item
  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const removeItem = (index) => {
    const updatedItems = [...additionalItems];
    updatedItems.splice(index, 1);
    setAdditionalItems(updatedItems);
  };

  const totalpurchaseprice = () => {
    let totalPrice = 0;
    additionalItems.forEach((item) => {
      totalPrice += item.totalPrice;
    });
    return totalPrice.toFixed(2); // Return total price rounded to 2 decimal places
  };

  useEffect(() => {
    // Fetch the list of sellers from Firestore
    const fetchSellers = async () => {
      const sellersCollection = collection(firebasedb, "sellers");
      const sellersSnapshot = await getDocs(sellersCollection);
      const sellersList = sellersSnapshot.docs.map(
        (doc) => doc.data().sellername
      );
      setSellers(sellersList);
    };

    fetchSellers();
  }, []);

  const handleSellerSelect = async (e) => {
    const sellerName = e.target.value;
    if (sellerName === "") {
      setOrderDetails({
        ...orderDetails,
        sellername: "",
        selleraddress: "",
        selleremail: "",
        sellerphone: "",
      });
      setSupplierItems([]); // Clear the supplierItems when no seller is selected
    } else {
      // Fetch the seller's details from Firestore based on the selected seller's name
      const sellersCollection = collection(firebasedb, "sellers");
      const q = query(sellersCollection, where("sellername", "==", sellerName));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const sellerData = querySnapshot.docs[0].data();
        setOrderDetails({
          ...orderDetails,
          sellername: sellerData.sellername,
          selleraddress: sellerData.address,
          selleremail: sellerData.email,
          sellerphone: sellerData.phone,
        });

        // Set the supplierItems to the items supplied by the selected seller
        setSupplierItems(sellerData.items || []);
      }
    }
  };

  const handleSelectedItemChange = (e) => {
    const selectedItemName = e.target.value;
    setSelectedItemName(selectedItemName);

    // Find the price corresponding to the selected item
    const selectedItem = supplierItems.find(
      (item) => item.item === selectedItemName
    );
    if (selectedItem) {
      setSelectedItemPrice(selectedItem.price);
    } else {
      setSelectedItemPrice(""); // Reset price if item not found
    }
  };

  const handleAddItem = () => {
    if (selectedItemName && selectedItemPrice && selectedItemQuantity) {
      const newItem = {
        item: selectedItemName,
        price: selectedItemPrice,
        quantity: selectedItemQuantity, // Add quantity to the item
        totalPrice: calculateTotalPrice(
          parseFloat(selectedItemPrice),
          parseInt(selectedItemQuantity)
        ), // Calculate and add total price
      };

      setAdditionalItems([...additionalItems, newItem]);

      // Clear the selected item, its price, and quantity
      setSelectedItemName("");
      setSelectedItemPrice("");
      setSelectedItemQuantity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calculate the total purchase price
      const purchasePrice = parseFloat(totalpurchaseprice());

      // Define the target collection based on the purchase price threshold
      const targetCollection =
        purchasePrice > 100000.0 ? "pendingOrders" : "orders";

      const collectionRef = collection(firebasedb, targetCollection);

      // Add the document to the appropriate collection with the "status" and "totalPurchasePrice" fields
      await addDoc(collectionRef, {
        ...orderDetails,
        status: targetCollection === "pendingOrders" ? "pending" : "confirmed",
        items: [...orderDetails.items, ...additionalItems],
        totalPurchasePrice: purchasePrice, // Add the total purchase price to the document
      });

      console.log("Order added successfully");

      // Clear the form fields after submission
      setOrderDetails({
        ponumber: "",
        pdate: "",
        sellername: "",
        selleraddress: "",
        selleremail: "",
        sellerphone: "",
        company: "",
        site: "",
        sitemanager: "",
        siteemail: "",
        items: [], // Clear selected items
      });
      setSelectedItemName("");
      setSelectedItemPrice("");
      setSelectedItemQuantity("");
      setAdditionalItems([]);
      navigate("/orderlist");
    } catch (err) {
      console.error("Error adding order: ", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add Order</h1>
        <label>P.O Number</label>
        <br />
        <input
          type="text"
          name="ponumber"
          value={orderDetails.ponumber}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, ponumber: e.target.value })
          }
        />
        <br />
        <label>Date</label>
        <br />
        <input
          type="date"
          name="pdate"
          value={orderDetails.pdate}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, pdate: e.target.value })
          }
        />
        <br />
        <br />
        <br />
        <label>Seller Name</label>
        <br />
        <select
          name="sellername"
          value={orderDetails.sellername}
          onChange={handleSellerSelect}
        >
          <option value="">Select Seller</option>
          {sellers.map((seller, index) => (
            <option key={index} value={seller}>
              {seller}
            </option>
          ))}
        </select>
        <br />
        <label>Address</label>
        <br />
        <input
          type="text"
          name="selleraddress"
          value={orderDetails.selleraddress}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, selleraddress: e.target.value })
          }
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          name="selleremail"
          value={orderDetails.selleremail}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, selleremail: e.target.value })
          }
        />
        <br />
        <label>Phone</label>
        <br />
        <input
          type="text"
          name="sellerphone"
          value={orderDetails.sellerphone}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, sellerphone: e.target.value })
          }
        />
        <br />
        <label>Company</label>
        <br />
        <input
          type="text"
          name="company"
          value={orderDetails.company}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, company: e.target.value })
          }
        />
        <br />
        <label>Site</label>
        <br />
        <input
          type="text"
          name="site"
          value={orderDetails.site}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, site: e.target.value })
          }
        />
        <br />
        <br />
        <label>Site Manager</label>
        <br />
        <input
          type="text"
          name="sitemanager"
          value={orderDetails.sitemanager}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, sitemanager: e.target.value })
          }
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          name="siteemail"
          value={orderDetails.siteemail}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, siteemail: e.target.value })
          }
        />
        <br />
        <label>Item</label>
        <br />
        <select
          name="item"
          value={selectedItemName}
          onChange={handleSelectedItemChange}
        >
          <option value="">Select Item</option>
          {supplierItems.map((item, index) => (
            <option key={index} value={item.item}>
              {item.item}
            </option>
          ))}
        </select>
        <br />
        <label>Price</label>
        <br />
        <input
          type="text"
          name="price"
          value={selectedItemPrice}
          readOnly // Price is read-only
        />
        <br />
        <label>Quantity</label>
        <br />
        <input
          type="text"
          name="quantity"
          value={selectedItemQuantity}
          onChange={(e) => setSelectedItemQuantity(e.target.value)} // Update quantity state
        />
        <br />
        <label>Total Price</label>
        <br />
        <input
          type="text"
          value={calculateTotalPrice(selectedItemPrice, selectedItemQuantity)}
          readOnly
        />
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <br />
        {additionalItems.map((item, index) => (
          <div key={index}>
            <label>Additional Item</label>
            <br />
            <input type="text" value={item.item} readOnly />
            <br />
            <label>Additional Price</label>
            <br />
            <input type="text" value={item.price} readOnly />
            <br />
            <label>Additional Quantity</label>
            <br />
            <input type="text" value={item.quantity} readOnly />
            <br />
            <label>Additional Total Price</label>
            <br />
            <input type="text" value={item.totalPrice} readOnly />
            <button
              type="button"
              onClick={() => removeItem(index)} // Call the removeItem function with the item index
            >
              Remove Item
            </button>
          </div>
        ))}
        <br />
        <label>TOTAL PURCHASE PRICE</label>
        <h3>{totalpurchaseprice()}</h3>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddOrder;
