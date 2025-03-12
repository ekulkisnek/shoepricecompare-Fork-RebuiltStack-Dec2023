import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Trending from './Trending';
import fetchMock from "jest-fetch-mock";
import '@testing-library/jest-dom'

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test('loads and displays trending sneakers', async () => {
  const mockSneakers = [
    { shoeName: 'Sneaker 1', id: '1' },
    { shoeName: 'Sneaker 2', id: '2' },
    // Add more test data as needed
  ];

  fetch.mockResponseOnce(JSON.stringify(mockSneakers));

  render(<Trending />);

  await waitFor(() => {
    expect(screen.getByText('Sneaker 1')).toBeInTheDocument();
    expect(screen.getByText('Sneaker 2')).toBeInTheDocument();
  });
});

test('displays error message when fetch fails', async () => {
  fetch.mockReject(() => Promise.reject("API is down"));

  render(<Trending />);

  await waitFor(() => {
    expect(screen.getByText('Could not load trending sneakers')).toBeInTheDocument();
  });
});
