import React, { useState, useEffect } from 'react';
import MiniCard from './MiniCard';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const Trending = () => {
  const [loading, setLoading] = useState(true);
  const [seeAll, setSeeAll] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [allSneakers, setAllSneakers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchTrendingSneakers = async () => {
      try {
        const response = await fetch("https://shoepriceapi.replit.app/home", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSneakers(data.slice(0, 10));
        setAllSneakers(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch trending sneakers:', error);
        setErrorMessage('Could not load trending sneakers');
        setLoading(false);
      }
    };

    fetchTrendingSneakers();
  }, []);

  const handleClick = () => {
    setSeeAll(true);
    setTimeout(() => {
      window.scrollTo({ top: 625, behavior: 'smooth' });
    }, 1);
  };

  const display = () => {
    const displayedSneakers = seeAll ? allSneakers : sneakers.slice(0, 10);
    return displayedSneakers.map((sneaker, index) => (
      <MiniCard key={`${index}-${sneaker.shoename}`} sneaker={sneaker} />
    ));
  };

  return (
    <div className='product-section'>
      <h2 className='title'>Trending Now {seeAll === false && 
        <button onClick={handleClick} className="see-all">
          <div className="see-all-text">See All</div>
        </button>}
      </h2>
      <div className='product-page'>
        {loading ? (
          <Spinner className='spinners' animation="border" variant="secondary" role="status" />
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          display()
        )}
      </div>
    </div>
  );
};

export default Trending;
