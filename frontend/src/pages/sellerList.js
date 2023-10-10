import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect} from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firebasedb } from "../config/firebase-config";
import { Link } from "react-router-dom";

function SellerList() {
  const [sellerDetails, setSellerDetails] = useState([]);
  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const sellersCollection = collection(firebasedb, "sellers");
        const querySnapshot = await getDocs(sellersCollection);
        const sellerDetailsArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          sellerDetailsArray.push({ id: doc.id, ...data }); // Include document ID
        });
        setSellerDetails(sellerDetailsArray);
      } catch (error) {
        console.error("Error fetching site details: ", error);
      }
    };
    fetchSellerDetails();
  }, []);

   const handleDelete = async (id) => {
     try {
       const sellerRef = doc(firebasedb, "sellers", id);
       await deleteDoc(sellerRef);
       setSellerDetails((prevDetails) =>
         prevDetails.filter((seller) => seller.id !== id)
       );
     } catch (error) {
       console.error("Error deleting seller: ", error);
     }
   };

  return (
    <div>
      <h1>Seller list</h1>
      <Link to="/addseller">
        <button>Add Seller</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Seller Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellerDetails.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.sellername}</td>
              <td>{seller.phone}</td>
              <td>{seller.address}</td>
              <td>
                <Link to={`/sellerdetails/${seller.id}`}>
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link to={`/updatesite/${seller.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button onClick={() => handleDelete(seller.id)}>
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

export default SellerList