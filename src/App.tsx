import React, { useEffect } from 'react';
import { Home } from './pages/Home/Home';
import { Footer } from './components/Footer/Footer';
import './App.css';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { Sprint } from './pages/Sprint/Sprint';
import { AudioGame } from './pages/AudioGame/AudioGame';
import { Statistics } from './pages/Statistics/Statistics';
import { Textbook } from './pages/Textbook/Textbook';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { initializeAggregatedWords, initializeHardWords, initializeWords } from './state/reducers/textbook';

const App = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    if(user) {
      dispatch(initializeAggregatedWords('0', '0'))
      dispatch(initializeHardWords())
    } else {
      dispatch(initializeWords('0', '0'))
    }
  }, [user])


  const {words, difficult} = useAppSelector(state => state.textbook)
  console.log(words)
  console.log(difficult)

  return <>

    <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/textbook' element={<Textbook />} />
      <Route path='/audiogame' element={<AudioGame />} />
      <Route path='/sprint' element={<Sprint />} />
      <Route path='/statistics' element={<Statistics/>} />
    </Routes>
    <Footer/>
  </>;
}

export default App;
