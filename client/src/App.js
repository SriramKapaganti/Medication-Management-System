import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes - redirect if already logged in */}
        <Route exact path="/" element={
          <RedirectIfLoggedIn user={user}>
            <HomePage />
          </RedirectIfLoggedIn>
        } />

        <Route exact path="/login" element={
          <RedirectIfLoggedIn user={user}>
            <LoginForm onLogin={setUser} />
          </RedirectIfLoggedIn>
        } />

        <Route exact path="/signup" element={
          <RedirectIfLoggedIn user={user}>
            <SignupForm />
          </RedirectIfLoggedIn>
        } />

        {/* Protected route */}
        <Route exact path="/dashboard" element={
          <ProtectedRoute user={user}>
            <Dashboard user={user} setUser={setUser} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
