import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/register.tsx";
import MainPage from "./pages/MainPage.tsx";
import GroupRegistrationForm from "./pages/CreateGroup.tsx"

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="" element={<MainPage />} />
        <Route path="/registergroup" element={<GroupRegistrationForm />} />
      </Routes>
    </Router>
  )
}

export default App
