import React from 'react';
import { Home } from './pages/Home/Home';
import { Footer } from './components/Footer/Footer';
import './App.css';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { Games } from './pages/Games/Games';
import { Sprint } from './pages/Sprint/Sprint';
import { AudioGame } from './pages/AudioGame/AudioGame';
import { Statistics } from './pages/Statistics/Statistics';

const App = () => {

  return <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/games' element={<Games />}>
        <Route path='audiogame' element={<AudioGame />} />
        <Route path='sprint' element={<Sprint />} />
      </Route>
      <Route path='/statistics' element={<Statistics/>} />
    </Routes>
    <Footer/>
  </>;
}

export default App;
