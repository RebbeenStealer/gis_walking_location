import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import KakaoMap from './components/KakaoMap';
import './styles/global.css';
import SignupForm from './components/SignupForm'
import AppRouter from './shared/Router'

function App() {
  return (
      <AppRouter />
  )
}

export default App;