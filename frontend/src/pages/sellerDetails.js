import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firebasedb } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

function SellerDetails() {
  const { id } = useParams();
  const [sellerDetails, setSellerDetails] = useState(null);
  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const sellersCollection = collection(firebasedb, "sellers");
        const querySnapshot = await getDocs(sellersCollection);
        const seller = querySnapshot.docs
          .map((doc) => {
            // Get seller details from each document
            const data = doc.data();
            return { id: doc.id, ...data };
          })
          .find((seller) => seller.id === id); // Find the seller with matching 'id'

        setSellerDetails(seller);
      } catch (error) {
        console.error("Error fetching seller details: ", error);
      }
    };
    fetchSellerDetails();
  }, [id]);
  if (!sellerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Seller Details</h1>
      <h2>{sellerDetails.sellername}</h2>
      <p>Address: {sellerDetails.address}</p>
      <p>Phone: {sellerDetails.phone}</p>
      <p>Email: {sellerDetails.email}</p>

      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sellerDetails.items.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerDetails;
