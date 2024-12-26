import React, { useState, useEffect } from "react";
import '../../styles/btnStyles.css';

// Gi icons
// npm i react-icons
import { GiHamburgerMenu } from "react-icons/gi";

const HambugerBtn = () => {
    return (
        <>
            <button className="hamburger-menu-btn">
                <GiHamburgerMenu />
            </button>
        </>
    );
}

export default HambugerBtn;