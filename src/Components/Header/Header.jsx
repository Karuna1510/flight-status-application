import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import './Header.css';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pageTitle = location.pathname === '/' ? 'Flight Board' : 'Flight Details';

  const formatTime = (date) => {
    return moment(date).format('DD-MM-YYYY HH:mm');
  };

  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 60000); // Update time every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  const splittedTime = currentTime.split(' ');

  return (
    <Box className="headerContainer">
      <Paper elevation={3} className="paper">
        <Box className="container">
          <Box className="leftContent">
            <img src="/flight.png" alt="Flight Icon" className="icon" />
            <Typography variant="h4" gutterBottom className="title">
              {pageTitle}
            </Typography>
          </Box>
          <Box className="rightContent">
            <Box className="timeContainer">
              {splittedTime[1].split('').map((char, index) => (
                <Box key={index} className="timeDigit">{char}</Box>
              ))}
            </Box>
            <Box className="calendarContainer">
              <Box className="monthText">{new Date().toLocaleString('en-US', { month: 'long' })}</Box>
              <Box className="calendarIcon">
                <CalendarToday />
                <Box className="dateText">{new Date().getDate()}</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Header;
