import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { firebasedb } from "../config/firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

function PendingOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [pendingOrderDetails, setPendingOrderDetails] = useState(null);

  useEffect(() => {
    const fetchPendingOrderDetails = async () => {
      try {
        const pendingOrderCollection = collection(firebasedb, "pendingOrders");
        const querySnapshot = await getDocs(pendingOrderCollection);
        const pendingOrder = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return { id: doc.id, ...data };
          })
          .find((pendingOrder) => pendingOrder.id === id);
        setPendingOrderDetails(pendingOrder);
      } catch (error) {
        console.error("Error fetching pending order details: ", error);
      }
    };
    fetchPendingOrderDetails();
  }, [id]);

  const handleAccept = async () => {
    try {
      const orderRef = doc(firebasedb, "pendingOrders", id);
      await updateDoc(orderRef, {
        status: "accepted",
      });
      setPendingOrderDetails({
        ...pendingOrderDetails,
        status: "accepted",
      });
      navigate("/pendingorders"); // Navigate to the pending order list page
    } catch (error) {
      console.error("Error accepting order: ", error);
    }
  };

  const handleReject = async () => {
    try {
      const orderRef = doc(firebasedb, "pendingOrders", id);
      await updateDoc(orderRef, {
        status: "rejected",
      });
      setPendingOrderDetails({
        ...pendingOrderDetails,
        status: "rejected",
      });
      navigate("/pendingorders"); // Navigate to the pending order list page
    } catch (error) {
      console.error("Error rejecting order: ", error);
    }
  };

  if (!pendingOrderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pending Order Details</h1>
      <h2>{pendingOrderDetails.ponumber}</h2>
      <p>Site: {pendingOrderDetails.site}</p>
      <p>Order Date: {pendingOrderDetails.pdate}</p>
      <p>Site Manager: {pendingOrderDetails.sitemanager}</p>
      <p>Managers' Email: {pendingOrderDetails.siteemail}</p>
      <p>Seller Name: {pendingOrderDetails.sellername}</p>
      <p>Seller Address: {pendingOrderDetails.selleraddress}</p>
      <p>Seller Phone: {pendingOrderDetails.sellerphone}</p>
      <p>Seller Email: {pendingOrderDetails.selleremail}</p>
      <p>Total Price: {pendingOrderDetails.totalPurchasePrice}</p>
      <p>Order Status: {pendingOrderDetails.status}</p>

      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrderDetails.items.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}

export default PendingOrderDetails;
