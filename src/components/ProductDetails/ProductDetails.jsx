import React from 'react';
import './ProductDetails.css';
import carImage from '../../assets/car.png';

const ProductDetails = () => {
  // Dummy data for product details
  const product = {
    title: 'Apple iPhone 13 (128GB)',
    price: '₹60,000',
    description: 'Excellent condition, no scratches, comes with original box and charger. Used for 6 months.',
    imageUrl: 'https://imgs.search.brave.com/mL282fZsKYuAwGgy_F6Bo4ybI063nECJv2ToOfdUXio/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdXBl/cmlvcmltYWdlLnBy/by9jZG4vc2hvcC9m/aWxlcy9zaG93X3No/aW5lX3BpY3R1cmVf/MjAwMHguanBnP3Y9/MTYxMzc5NjkyNA', // Replace with actual image URL
    location: 'Mumbai, Maharashtra',
    contactNumber: '9876543210',
  };

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">
          <img src={product.imageUrl} alt="Product" />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-description">{product.description}</p>

          <div className="product-location">
            <strong>Location: </strong>{product.location}
          </div>

          <div className="product-contact">
            <strong>Contact: </strong>{product.contactNumber}
          </div>

          <button className="contact-button">Contact Seller</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
