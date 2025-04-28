import React, { useEffect, useState } from 'react';
import './ProductDetail.css';

import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore'; // IMPORT FROM firestore
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const ProductDetail = () => {
  const { docId } = useParams(); // 🛠️ Fix useParams destructuring
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "ads", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [docId]); // Always put dependencies here

  if (!data) {
    return <div>Loading...</div>; // 🛡️ Protection when data not loaded
  }

  return (<>
  <Navbar/>
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">
          <img src={data.imageUrl} alt="Product" />
        </div>

        <div className="product-info">
          <h1 className="product-title">{data.title}</h1>
          <p className="product-price">{data.price}</p>
          <p className="product-description">{data.description}</p>

          <div className="product-location">
            <strong>Category: </strong>{data.category}
          </div>

          <div className="product-contact">
            <strong>Seller Name: </strong>{data.username}
          </div>

          <button className="contact-button">Contact Seller</button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetail;
