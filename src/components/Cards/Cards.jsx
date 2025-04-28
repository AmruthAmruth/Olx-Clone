import { useEffect, useState } from 'react';
import './Cards.css'; // Import the CSS file for styles
import carImage from '../../assets/car.png';
import favoriteIcon from '../../assets/favorite.svg';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
const Cards = () => {
 const navigate= useNavigate();  

  const [ads, setAds] = useState([]);
  const db = getFirestore();
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, 'ads'); 
        const querySnapshot = await getDocs(adsCollection);
        
        const fetchedAds = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data(), 
        }));

        setAds(fetchedAds);
        console.log("Data ",fetchedAds);
        
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);


  const handleCardClick=(docId)=>{
    console.log("ieddd",docId);
    
    navigate(`/details/${docId}`);
  }

  return (
    <div className="cards-container">
      <h1 className="title">Fresh recommendations</h1>
      <div className="grid-container">
        {ads.map((product) => (
          <div key={product.id} className="card"  onClick={() => handleCardClick(product.id)} >
            <div className="image-container">
              <img className="product-image" src={product.imageUrl} alt={product.title} />
            </div>
            <div className="details">
              <h1 className="price">{product.price}</h1>
              <p className="product-title">{product.title}</p>
              <p className="category">{product.category}</p>
              <p className="description">{product.description}</p>
            </div>
            <div className="favorite-icon">
              <img className="icon" src={favoriteIcon} alt="Favorite Icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
