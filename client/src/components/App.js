import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ProtectedRoute from './partials/ProtectedRoute';
import NotProtectedRoute from './partials/NotProtectedRoute';
import Signup from '../pages/Signup';
import Error from '../pages/Error';
import Navbar from './partials/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path='/signup' 
            element={
              <NotProtectedRoute>
                <Signup/>
              </NotProtectedRoute>
          }/>
          <Route 
            path='/login' 
            element={
              <NotProtectedRoute>
                <Login />
              </NotProtectedRoute>
          }/>
          <Route 
            path='/' 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }/>
            <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
