import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders the correct page title', () => {
    const { getByText } = render(<Header />);
    const titleElement = getByText(/Flight Board/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the current time', () => {
    const { getByText } = render(<Header />);
    const currentTimeElement = getByText(/[0-9]{2}:[0-9]{2}/i); // Matches time in HH:MM format
    expect(currentTimeElement).toBeInTheDocument();
  });

  test('renders the month name', () => {
    const { getByText } = render(<Header />);
    const monthElement = getByText(/January|February|March|April|May|June|July|August|September|October|November|December/i);
    expect(monthElement).toBeInTheDocument();
  });

  test('renders the date', () => {
    const { getByText } = render(<Header />);
    const dateElement = getByText(/[0-9]{1,2}/); // Matches date with 1 or 2 digits
    expect(dateElement).toBeInTheDocument();
  });

  test('renders the flight icon', () => {
    const { getByAltText } = render(<Header />);
    const flightIcon = getByAltText(/Flight Icon/i);
    expect(flightIcon).toBeInTheDocument();
  });

  test('renders the calendar icon', () => {
    const { getByLabelText } = render(<Header />);
    const calendarIcon = getByLabelText(/CalendarToday/i);
    expect(calendarIcon).toBeInTheDocument();
  });
});


