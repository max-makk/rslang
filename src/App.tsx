import React from 'react';
import { Home } from './pages/Home/Home';
import { Footer } from './components/footer/Footer';
import './App.css';
import {Header} from './components/Header';

function App() {
  return <>
    <Header/>
    <Home/>
    <Footer/>
  </>;
}

export default App;
