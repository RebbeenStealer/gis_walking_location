import React, { useState, useEffect } from "react";
import HambugerBtn from "./buttons/HamburgerBtn";
import CloseBtn from "./buttons/CloseBtn";

// Style import
import '../styles/alignCenter.css'
import '../styles/SlideBar.css'

const SideBar = () => {

    return (
        <div className="sidebar-container">
            <header>
                <button className="hambuger-btn"><HambugerBtn/></button>
                <h1>MALO</h1>
                <button className="close-btn"><CloseBtn/></button>
            </header>
            <input type="text" placeholder="검색어를 입력 해주세요." />
            <div className="ui-btn">
                <ul>
                    <li><a href="">즐겨찾기</a></li>
                    <li><a href="">택시</a></li>
                    <li><a href="">내주변</a></li>
                    <li><a href="">내정보</a></li>
                </ul>
            </div>
            <input type="text" placeholder="출발" />
            <input type="text" placeholder="도착" />
            <button>출발</button>
        </div>
    );
}

export default SideBar;