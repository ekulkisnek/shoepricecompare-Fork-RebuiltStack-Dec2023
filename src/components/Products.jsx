import MiniCard from './MiniCard';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

const Products = ({ match, location }) => {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
  });
  const [loading, setLoading] = useState(true);
  const [sneakers, setSneakers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const { params: { key } } = match;

  useEffect(() => {
    setErrorMessage(null);
    setLoading(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });

    fetch(`https://shoepriceapi.replit.app/search/${key}`, { headers: myHeaders })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonResponse => {
        console.log('API Response:', jsonResponse);
        setSneakers(jsonResponse);
        setLoading(false);
        window.scrollTo({ top: 625, behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setErrorMessage(`Error: ${error.message}`);
        setLoading(false);
      });
  }, [key, location]);

  return (
    <div className='product-section'>
      <h2 className='product-title'> Results for <span className="product-key">'{key}'</span> </h2>
      <div className='product-page'>
        {loading && !errorMessage ? (
          <Spinner className='spinners' animation="border" variant="secondary" role="status" />
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          sneakers.map((sneaker, index) => (
            <MiniCard key={`${index}-${sneaker.shoename}`} sneaker={sneaker} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
