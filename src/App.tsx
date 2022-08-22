import React from 'react';
import { Home } from './pages/Home/Home';
import { Footer } from './components/footer/Footer';
import './App.css';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return <>
    <div>Hello</div>
    <Header/>
    <Routes>
      <Route path={'/'} element={<Home />} />
    </Routes>
    <Footer/>
  </>;
}

export default App;
