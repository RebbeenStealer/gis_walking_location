import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KakaoMap from '../components/KakaoMap';
import SignupForm from '../components/SignupForm'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<KakaoMap />} />
                {/* <Route path="/signup" element={<SignupForm />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Router