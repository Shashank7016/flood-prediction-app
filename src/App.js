import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FAQ from './components/FAQ';
import DataPage from './components/DataPage';
import AnalysisPage from './components/AnalysisPage';
import AlertPage from './components/AlertPage';
import UsersPage from './components/UsersPage'
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/faq' element={<FAQ />} />
        <Route path='/data' element={<DataPage />} />
        <Route path='/analysis' element={<AnalysisPage />} />
        <Route path='/alerts' element={<AlertPage />} />
        <Route path='/users' element={<UsersPage />} />
        // Add more routes as needed
      </Routes>
    </div>
  );
}

export default App;
