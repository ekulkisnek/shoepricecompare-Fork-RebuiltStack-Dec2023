import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import ImgCarousel from './ImgCarousel';
import PriceTable from './PriceTable';
import Spinner from 'react-bootstrap/Spinner';

const ProductCard = ({ sneaker, name, minPrice, minPriceLink, logo, imageClass, image, ...modalProps }) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(Object.keys(sneaker).length === 0);
    }, [sneaker]);

    const SneakerDetails = () => {
        const details = {
            'Make': sneaker.make,
            'Colorway': sneaker.colorway,
            'Style ID': sneaker.styleID,
            'Release Date': sneaker.releaseDate,
            'Retail Price': `$${sneaker.retailPrice}.00`
        };

        return (
            <ul className='details'>
                {Object.entries(details).map(([key, value], index) => (
                    <li key={index}><span className='tag'>{key}:</span> {value}</li>
                ))}
            </ul>
        );
    };

    return (
        <Modal {...modalProps} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <div className="procard">
                <nav className='header'>
                    {/* SVG Arrow and other navigation components */}
                </nav>

                <div className="photo">
                    {isLoading ? (
                        <div className="spinner">
                            <Spinner animation="border" variant="secondary" />
                        </div>
                    ) : (
                        <ImgCarousel sneaker={sneaker} imageClass={imageClass} image={image} />
                    )}
                </div>

                <div className="description">
                    <h2>{name}</h2>
                    {minPrice ? (
                        <div className='min-price-container'>
                            <div className='from-text'>From</div>
                            <div className='card-price'>
                                ${minPrice} <span className='on-text'> on</span>
                                <img className='logo' src={logo} alt="Reseller Logo" />
                                <Button onClick={() => window.open(minPriceLink, '_blank')} className='buy-button' variant="secondary" size="lg">
                                    Visit site
                                </Button>
                            </div>
                        </div>
                    ) : <div>Not Available</div>}

                    <Tabs defaultActiveKey="description">
                        <Tab eventKey="description" title="About">
                            <div className='about'>{sneaker.description}</div>
                        </Tab>
                        <Tab eventKey="details" title="Details">
                            <div className='details-section'>
                                <SneakerDetails />
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                <div className='price-table'>
                    {isLoading ? (
                        <Spinner animation="border" variant="secondary" />
                    ) : (
                        <PriceTable sneaker={sneaker} />
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ProductCard;
