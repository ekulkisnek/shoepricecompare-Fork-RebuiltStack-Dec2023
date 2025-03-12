import React from 'react';
import Table from 'react-bootstrap/Table';
import stockXLogo from '../images/stockx.png';
import goatLogo from '../images/goat.png';
import flightClubLogo from '../images/flightclub.png';
import stadiumGoodsLogo from '../images/stadiumgoods.png';

const PriceTable = (props) => {
    console.log("pricetable props",props)
    const sizes = new Set(['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5']);
    let sneaker = props.sneaker;
    console.log("Sneaker State in ProductCard", sneaker); // Add this line in render section

    let resellPrices = sneaker.resellPrices || {};

    // Debugging
    console.log('Resell Prices:', resellPrices);

    Object.keys(resellPrices).forEach(platform => {
        Object.keys(resellPrices[platform]).forEach(size => {
            sizes.add(size);
        });
    });

    let shoeSizes = Array.from(sizes).sort((a, b) => parseFloat(a) - parseFloat(b));

    const isMinPrice = (price, size) => {
        let prices = [resellPrices.stockX?.[size], resellPrices.flightClub?.[size], resellPrices.goat?.[size], resellPrices.stadiumGoods?.[size]];
        prices = prices.filter(item => item !== undefined);
        return price === Math.min(...prices) ? 'min-price' : '';
    };

    const renderPriceCells = (platform) => {
        return shoeSizes.map((size, index) => (
            <td key={index}>
                {resellPrices[platform]?.[size] ? 
                    <a className={isMinPrice(resellPrices[platform][size], size)} href={sneaker.resellLinks?.[platform]} target="_blank" rel="noopener noreferrer">
                        ${resellPrices[platform][size]}
                    </a> 
                    : '--'
                }
            </td>
        ));
    };

    return (
        <div className='table-card scroll-bar'>
            <Table responsive>
                <thead>
                    <tr>
                        <th>US Size</th>
                        {shoeSizes.map((size, index) => (<th key={index}> {size} </th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td onClick={() => sneaker.resellLinks?.stockX && window.open(sneaker.resellLinks?.stockX)}><img src={stockXLogo} alt="StockX" /></td>
                        {renderPriceCells('stockX')}
                    </tr>
                    {/* Repeat the above <tr> block for flightClub, goat, and stadiumGoods */}
                </tbody>
            </Table>
        </div>
    );
};

export default PriceTable;
