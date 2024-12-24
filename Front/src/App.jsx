import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KakaoMap from './components/KakaoMap';
import SignupForm from './components/SignupForm'
import SlideBar from './components/SlideBar';

import './App.css'
import './styles/global.css';


function App() {

  return (
    <div className='App' style={{ display : 'flex'}}>
      <SlideBar />
      <KakaoMap />
      {/* <SignupForm /> */}
    </div>
  )

}

export default App;