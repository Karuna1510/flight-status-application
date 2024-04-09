import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import FlightDetails from './FlightDetails';

describe('FlightDetails Component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/FlightDetails/1']}>
        <Route path="/FlightDetails/:id">
          <FlightDetails />
        </Route>
      </MemoryRouter>
    );
  });

  test('displays loading indicator initially', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/FlightDetails/1']}>
        <Route path="/FlightDetails/:id">
          <FlightDetails />
        </Route>
      </MemoryRouter>
    );
    expect(getByTestId('loading-indicator')).toBeInTheDocument();
    await waitFor(() => {});
  });

  test('displays error message if fetching flight details fails', async () => {
    // Mocking the fetch function to simulate failed network request
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch'));
    const { getByText } = render(
      <MemoryRouter initialEntries={['/FlightDetails/1']}>
        <Route path="/FlightDetails/:id">
          <FlightDetails />
        </Route>
      </MemoryRouter>
    );
    await waitFor(() => {});
    expect(getByText('An error occurred while fetching flight details.')).toBeInTheDocument();
  });

 
});

