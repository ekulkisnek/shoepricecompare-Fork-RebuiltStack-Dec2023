import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ImgCarousel = ({ sneaker, imageClass, image }) => {
    // Function to generate carousel items
    const generateCarouselItems = () => {
        // Check if sneaker has image links and they are not empty
        if (sneaker?.imageLinks?.length > 0) {
            return sneaker.imageLinks.map((imageLink, index) => (
                <Carousel.Item key={index}>
                    <img className='goat-images' src={imageLink} alt={`Sneaker Image ${index}`} />
                </Carousel.Item>
            ));
        } else {
            // Fallback image if no image links are provided
            return (
                <Carousel.Item key="fallback">
                    <img className={imageClass} src={image} alt="Fallback Sneaker Image" />
                </Carousel.Item>
            );
        }
    };

    return (
        <Carousel>
            {generateCarouselItems()}
        </Carousel>
    );
};

export default ImgCarousel;
