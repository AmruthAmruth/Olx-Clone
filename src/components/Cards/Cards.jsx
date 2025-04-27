import { useState } from 'react';
import './Cards.css'; // Import the CSS file for styles
import carImage from '../../assets/car.png';
import favoriteIcon from '../../assets/favorite.svg';

const Cards = () => {
  const [ads] = useState([
    {
      id: '1',
      title: 'Honda Civic 2020',
      category: 'Cars',
      price: '$20,000',
      description: 'Well maintained, single owner, no accidents.',
      imageUrl: carImage,
    },
    {
      id: '2',
      title: 'Mountain Bike',
      category: 'Bicycles',
      price: '$500',
      description: 'Lightweight frame, 21 gears, almost new.',
      imageUrl: carImage,
    },
    {
      id: '3',
      title: 'MacBook Pro 16"',
      category: 'Electronics',
      price: '$1500',
      description: 'M1 chip, 16GB RAM, very good condition.',
      imageUrl: carImage,
    },
    {
        id: '4',
        title: 'Honda Civic 2020',
        category: 'Cars',
        price: '$20,000',
        description: 'Well maintained, single owner, no accidents.',
        imageUrl: carImage,
      },
      {
        id: '5',
        title: 'Mountain Bike',
        category: 'Bicycles',
        price: '$500',
        description: 'Lightweight frame, 21 gears, almost new.',
        imageUrl: carImage,
      },
      {
        id: '6',
        title: 'MacBook Pro 16"',
        category: 'Electronics',
        price: '$1500',
        description: 'M1 chip, 16GB RAM, very good condition.',
        imageUrl: carImage,
      },
  ]);

  return (
    <div className="cards-container">
      <h1 className="title">Fresh recommendations</h1>
      <div className="grid-container">
        {ads.map((product) => (
          <div key={product.id} className="card">
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
