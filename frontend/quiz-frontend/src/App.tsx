import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homePage/HomePage';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentPage from './pages/studentPage/StudentPage';
import TeacherPage from './pages/teacherPage/TeacherPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/student" element={<StudentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
