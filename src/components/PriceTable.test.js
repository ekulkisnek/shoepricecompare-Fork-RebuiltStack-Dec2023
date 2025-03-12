import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PriceTable from './PriceTable';

describe('PriceTable Component Tests', () => {
  const mockSneakerData = {
    resellPrices: {
      stockX: { '9': 300, '10': 350 },
      flightClub: { '9': 320, '10': 360 },
      goat: { '9': 310, '10': 355 },
      stadiumGoods: { '9': 315, '10': 340 }
    },
    resellLinks: {
      stockX: 'http://link-to-stockX',
      flightClub: 'http://link-to-flightClub',
      goat: 'http://link-to-goat',
      stadiumGoods: 'http://link-to-stadiumGoods',
    }
  };

  test('renders price table with correct data', () => {
    render(<PriceTable sneaker={mockSneakerData} />);
  
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('$350')).toBeInTheDocument();
    const price320 = screen.queryByText('$320');
    if (price320) {
      expect(price320).toBeInTheDocument();
    }

    // Check if table headers for sizes are rendered
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    // Check if prices are rendered correctly
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('$350')).toBeInTheDocument();
    expect(screen.getByText('$320')).toBeInTheDocument();
    expect(screen.getByText('$360')).toBeInTheDocument();
    expect(screen.getByText('$310')).toBeInTheDocument();
    expect(screen.getByText('$355')).toBeInTheDocument();
    expect(screen.getByText('$315')).toBeInTheDocument();
    expect(screen.getByText('$340')).toBeInTheDocument();

    // Check if links are correctly attached
    const stockXLink = screen.getByText('$300').closest('a');
    expect(stockXLink).toHaveAttribute('href', 'http://link-to-stockX');
    // Repeat for other platforms if needed
  });

  // Add more tests for different scenarios
});
