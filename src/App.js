import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import Navbar from './components/Navbar';
import FAQ from './components/FAQ';
import DataPage from './components/DataPage';
import AnalysisPage from './components/AnalysisPage';
import AlertPage from './components/AlertPage';
import UsersPage from './components/UsersPage';
import Home from './components/HomePage';
import EvacuationComponent from './components/Evacuation';

function App() {
  return (
    
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/data' element={<DataPage />} />
          <Route path='/analysis' element={<AnalysisPage />} />
          <Route path='/alerts' element={<AlertPage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/evacuation' element={<EvacuationComponent />} />
          {/* Other routes as needed */}
        </Routes>
      </AuthProvider>
      );
}

export default App;
