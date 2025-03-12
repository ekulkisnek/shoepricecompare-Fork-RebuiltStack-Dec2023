import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Products from './Products';
import fetchMock from "jest-fetch-mock";
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

const renderWithRoute = (component, route = '/') => {
  const mockMatch = {
    params: { key: 'test-key' }, // Mock the key value as needed
    // Add other properties of 'match' as required by your component
  };
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/search/:key" element={React.cloneElement(component, { match: mockMatch })} />
      </Routes>
    </MemoryRouter>
  );
};

test('loads and displays products', async () => {
  const mockSneakers = [
    { shoename: 'Sneaker 1', id: '1' },
    { shoename: 'Sneaker 2', id: '2' },
    // Add more test data as needed
  ];

  fetch.mockResponseOnce(JSON.stringify(mockSneakers));

  renderWithRoute(<Products />, '/search/testKey');

  await waitFor(() => {
    expect(screen.getByText('Sneaker 1')).toBeInTheDocument();
    expect(screen.getByText('Sneaker 2')).toBeInTheDocument();
  });
});

test('displays error message when fetch fails', async () => {
  fetch.mockReject(() => Promise.reject("API is down"));

  renderWithRoute(<Products />, '/search/testKey');

  await waitFor(() => {
    expect(screen.getByText('Error: API is down')).toBeInTheDocument();
  });
});
