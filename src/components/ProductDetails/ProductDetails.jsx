import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import carImage from '../../assets/car.png';

import { db, doc, getDoc } from '../../firebase/firebase'
import { useParams } from 'react-router-dom';


const ProductDetails = () => {
  
  // const product = {
  //   title: 'Apple iPhone 13 (128GB)',
  //   price: '₹60,000',
  //   description: 'Excellent condition, no scratches, comes with original box and charger. Used for 6 months.',
  //   imageUrl: 'https://imgs.search.brave.com/mL282fZsKYuAwGgy_F6Bo4ybI063nECJv2ToOfdUXio/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdXBl/cmlvcmltYWdlLnBy/by9jZG4vc2hvcC9m/aWxlcy9zaG93X3No/aW5lX3BpY3R1cmVf/MjAwMHguanBnP3Y9/MTYxMzc5NjkyNA', // Replace with actual image URL
  //   location: 'Mumbai, Maharashtra',
  //   contactNumber: '9876543210',
  // };

  const [data, setData] = useState(null);
  const { docId } = useParams();
  useEffect(()=>{
      const fetchData=async()=>{
        console.log("Doc ic ",docId);
        
        try{
          const docRef = doc(db, "ads", docId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData(docSnap.data());
           
            
          } else {
            console.log("No such document!");
            
          }


        }catch(err){
          console.log(err);
          
        }
      }
      fetchData()
  },[])

  console.log("Data is this :",data);
  
  return (
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
  );
};

export default ProductDetails;
