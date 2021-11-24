import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header';
import Scanner from './components/Scanner/Scanner';
import Tracker from './components/Tracker/Tracker';
import Upload from './components/Upload/Upload';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Upload />}></Route>
            <Route exact path="/scanner" element={<Scanner />}></Route>
            <Route exact path="/tracker" element={<Tracker />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
