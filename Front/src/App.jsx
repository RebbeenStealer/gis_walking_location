import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import KakaoMap from './components/KakaoMap';
import SignupForm from './components/SignupForm'
import SlideBar from './components/SlideBar';
import AppRouter from './shared/Router'

import './App.css'
import './styles/global.css';


function App() {

  return (
    <div className='main-container'>
      <SlideBar />
      <KakaoMap />
      {/* <SignupForm /> */}
    </div>
      <AppRouter />
  )

}

export default App;