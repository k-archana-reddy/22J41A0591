import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import StatsPage from './components/StatsPage';
import LoggingComp from './components/LoggingComp';

const App = () => (
  <div style={{ padding: '20px' }}>
    <nav>
      <Link to="/shorten">Shorten URLs</Link> | <Link to="/stats">Stats</Link> | <Link to="/log">Log</Link>
    </nav>
    <Routes>
      <Route path="/shorten" element={<UrlShortenerForm />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/log" element={<LoggingComp />} />
    </Routes>
  </div>
);

export default App;
