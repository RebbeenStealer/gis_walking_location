import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KakaoMap from './components/KakaoMap';
import './styles/global.css';
import SignupForm from './components/SignupForm'
import Agreements from './components/Agreements';
import AuthModal from './components/AuthModal';


function App() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div>
      <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setAuthModalOpen(false)}
      />
      <KakaoMap/>
      <SignupForm />
      <Agreements />
    </div>
  )
}

export default App;