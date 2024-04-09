import React, { useState, useEffect } from 'react';
import './FlightBoard.css';
import { formatDepartureTime, getStatusColor } from '../utils'; 
import { flight_details } from '../Constants'; 
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const columns = [
  { id: 'flightNumber', label: 'Flight number' },
  { id: 'airline', label: 'Airline' },
  { id: 'origin', label: 'Origin' },
  { id: 'destination', label: 'Destination' },
  { id: 'departureTime', label: 'Departure' },
  { id: 'status', label: 'Status' },
  { id: 'details', label: 'Details' },
];

const FlightBoard = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(`${flight_details}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newData = await response.json();
        setFlights(newData);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error('Error fetching flight data:', error.message);
        setError('An error occurred while fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();

    const intervalId = setInterval(fetchFlights, 30000); //fetching data after every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box className='board-container'>
      {loading ? (
        <div className='loading-container'>
          <CircularProgress />
        </div>
      ) : (
        <>
          {flights.length === 0 ? (
            <div>No flights available</div>
          ) : (
            <TableContainer>
              <Table className="flight-table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} className="flight-table-header">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((flight) => (
                    <TableRow key={flight.id}>
                      {columns.map((column) => (
                        <TableCell key={`${flight.id}-${column.id}`} className="flight-table-cell">
                          {column.id === 'details' ? (
                            <Link to={`/FlightDetails/${flight.id}`} className="flight-details-link">
                              View More
                            </Link>
                          ) : (
                            <span className={column.id === 'status' ? 'flight-animate' : ''} style={{
                              color: column.id === 'status' ? getStatusColor(flight[column.id]) :
                                column.id === 'flightNumber' ? 'black' : 'inherit',
                              fontWeight: column.id === 'status' || column.id === 'flightNumber' ? 'bold' : 'normal'
                            }}>
                              {column.id === 'status' ? flight[column.id].toUpperCase() : 
                               column.id === 'departureTime' ? formatDepartureTime(flight[column.id]) : flight[column.id]}
                            </span>

                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {error && ( // Display error message if there's an error
            <Snackbar
              open={error !== null}
              autoHideDuration={6000}
              onClose={() => setError(null)}
              message={error}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default FlightBoard;
