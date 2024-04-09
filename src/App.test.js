import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders Header component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const headerElement = getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders FlightBoard component for the default route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const flightBoardElement = getByText(/Flight Board/i);
    expect(flightBoardElement).toBeInTheDocument();
  });

  test('renders FlightDetails component for the flight details route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/FlightDetails/1']}>
        <App />
      </MemoryRouter>
    );
    const flightDetailsElement = getByText(/Flight Details/i);
    expect(flightDetailsElement).toBeInTheDocument();
  });
});
