import React, { useState, useEffect } from 'react';
import './FlightDetails.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { flight_details } from '../Constants'; 

import { formatDepartureTime, getStatusColor } from '../utils'; 
import { Button, CircularProgress, Snackbar } from '@material-ui/core';
import { Table, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core';

const FlightDetails = () => {
  const { id } = useParams();
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlightDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch((`${flight_details}/${id}`)); //Getting different data for single id
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFlightDetails(data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
        setError('The requested flight details are unavailable. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFlightDetails();
    }
  }, [id]);

  const handleBackButtonClick = () => {
    navigate('/');
  };

  return (
    <Box className='board-container'>
      {loading ? (
        <div className='loading-container'>
          <CircularProgress />
        </div>
      ) : (
        <>
          {flightDetails ? ( // Check if flightDetails is not null
            <TableContainer className="flight-table-container">
              <Table className="flight-table-details">
                <TableHead>
                  {[
                    ['Flight Number:', flightDetails.flightNumber],
                    ['Airline:', flightDetails.airline],
                    ['Origin:', flightDetails.origin],
                    ['Destination:', flightDetails.destination],
                    ['Departure Time:', formatDepartureTime(flightDetails.departureTime)],
                    ['Status:', flightDetails.status],
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="header-cell">{row[0]}</TableCell>
                      <TableCell className="data-cell" style={{ backgroundColor: row[0] === 'Status:' ? getStatusColor(flightDetails.status) : '#343a40d1' }}>
                        {row[0] === 'Status:' ? flightDetails.status.toUpperCase() : row[1]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableHead>
              </Table>
            </TableContainer>
          ) : (
            <div>Error: {error}</div> // Display error message if flightDetails is null
          )}

          <div className="center-content">
            <Button variant="contained" color="primary" onClick={handleBackButtonClick}>
              Back to Flight Board
            </Button>
          </div>
        </>
      )}
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default FlightDetails;
