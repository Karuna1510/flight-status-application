import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FlightBoard from './FlightBoard';

jest.useFakeTimers(); // Mock timers

describe('FlightBoard Component', () => {
  test('data is refreshed after every 60 seconds', async () => {
    const { getByText } = render(<FlightBoard />);

    // Mock the fetchFlights function
    const originalFetchFlights = global.fetchFlights;
    global.fetchFlights = jest.fn();

    // Wait for initial data fetch
    await waitFor(() => expect(global.fetchFlights).toHaveBeenCalledTimes(1));

    // Fast-forward time by 60 seconds
    jest.advanceTimersByTime(60000);

    // Wait for data to be fetched again
    await waitFor(() => expect(global.fetchFlights).toHaveBeenCalledTimes(2));

    // Restore original fetchFlights function
    global.fetchFlights = originalFetchFlights;
  });

 
});


