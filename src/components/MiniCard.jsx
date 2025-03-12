import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import stockXLogo from '../images/stockx.png';
import goatLogo from '../images/goat.png';
import flightClubLogo from '../images/flightclub.png';
import stadiumGoodsLogo from '../images/stadiumgoods.png';
import sneaksLogo from '../images/Sneaks_Logo.png';
import ProductCard from './ProductCard';
import _ from 'lodash';

const MiniCard = ({ sneaker }) => {
  const [showProductCard, setShowProductCard] = useState(false);
  const [newSneaker, setNewSneaker] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://shoepriceapi.replit.app/id/${sneaker.styleID}/prices`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        setNewSneaker(jsonResponse);
      } catch (err) {
        console.error('Error fetching sneaker details:', err);
        setError('Failed to load sneaker details');
      }
    };

    if (showProductCard) {
      fetchData();
    }
  }, [showProductCard, sneaker.styleID]);

  const toggleShowCard = () => setShowProductCard(prev => !prev);

  const getLogoAndPrice = () => {
    if (!sneaker.lowestResellPrice || !sneaker.resellLinks) {
      return { logo: null, minPrice: null, minPriceLink: null };
    }

    const logoKey = _.minBy(_.keys(sneaker.lowestResellPrice), key => sneaker.lowestResellPrice[key]);
    const logos = { stockX: stockXLogo, stadiumGoods: stadiumGoodsLogo, goat: goatLogo, flightClub: flightClubLogo };
    return { logo: logos[logoKey], minPrice: sneaker.lowestResellPrice[logoKey], minPriceLink: sneaker.resellLinks[logoKey] };
  };

  const { logo, minPrice, minPriceLink } = getLogoAndPrice();
  const sneakerImage = sneaker.thumbnail || sneaksLogo;
  const imageClass = sneaker.thumbnail ? 'sneaker-image' : 'default-image';

  return (
    <div onClick={toggleShowCard} style={{ cursor: 'pointer' }} className='card-button'>
      <Card className='mini-card' border="light" style={{ width: '15rem', height: '17rem' }}>
        <Card.Img className={imageClass} variant="top" src={sneakerImage} />
        <Card.Body className='mini-card-body'>
          <Card.Title className='card-title'>{sneaker.shoeName}</Card.Title>
          {minPrice ? (
            <Card.Text className='mini-card-text'>
              From <span className='mini-card-price'>${minPrice} on <img className='mini-logo' src={logo} alt="logo" /></span>
            </Card.Text>
          ) : (
            <Card.Text className='mini-card-text'>Not Available</Card.Text>
          )}
        </Card.Body>
      </Card>

      {error && <div className="error-message">{error}</div>}
      {showProductCard && (
        <ProductCard 
          sneaker={newSneaker} 
          name={sneaker.shoeName} 
          description={sneaker.description}
          imageClass={imageClass} 
          image={sneakerImage} 
          minPriceLink={minPriceLink} 
          minPrice={minPrice}
          logo={logo} 
          show={showProductCard} 
          onHide={toggleShowCard} 
        />
      )}
    </div>
  );
};

export default MiniCard;
