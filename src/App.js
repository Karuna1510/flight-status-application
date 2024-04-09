import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightBoard from './Components/FlightBoard/FlightBoard';
import FlightDetails from './Components/FlightDetails/FlightDetails';
import Header from './Components/Header/Header';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FlightBoard />} />
        <Route path="/FlightDetails/:id" element={<FlightDetails />} />
      </Routes>
    </Router>
  );
};

export default App;