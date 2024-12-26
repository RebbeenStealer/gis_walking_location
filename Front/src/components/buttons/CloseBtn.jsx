import React, { useState, useEffect } from "react";
import '../../styles/btnStyles.css';

// Gi icons
// npm i react-icons
import { MdClose } from "react-icons/md";

const CloseBtn = () => {
    return (
        <>
            <button className="close-menu-btn">
                <MdClose />
            </button>
        </>
    );
}

export default CloseBtn;