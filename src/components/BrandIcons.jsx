
import stockXLogo from '../images/stockx.png'
import goatLogo from '../images/goat.png'
import flightClubLogo from '../images/flightclub.png'
import stadiumGoodsLogo from '../images/stadiumgoods.png'
import React from 'react';


const BrandIcons = () => {
    return (
        <div className="icon-container">
						<div className="icon-bar" >
							<a className="logo" data-swiper-autoplay="2000">
                                <img className="" src={stockXLogo} ></img>

							</a>
							<a className="logo" data-swiper-autoplay="2000" >
								<img className="" src={goatLogo}></img>
							</a>
							<a  className="logo" data-swiper-autoplay="2000" >
								<img className="" src={stadiumGoodsLogo} ></img>
							</a>
							<a  className="logo" data-swiper-autoplay="2000" >
                                <img className="" src={flightClubLogo }></img>
							</a>
						</div> 
					</div>
                    



    );

}
export default BrandIcons;