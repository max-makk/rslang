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
import userService from './services/user'
import { loginUser } from './state/reducers/user'
import { useAppDispatch } from './state/hooks';

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(loginUser(userFromStorage))
    }
  }, [])


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
