import React, { useState, useEffect } from "react";

// Style import
// import '../styles/global.css'
import '../styles/alignCenter.css'
import '../styles/SlideBar.css'

const SideBar = () => {

    return (
        <div className="sidebar-container">
            <input type="text" placeholder="검색어를 입력 해주세요." />
            <div className="ui-btn">
                <ul className="align-center">
                    <li><a href="">즐겨찾기</a></li>
                    <li><a href="">택시</a></li>
                    <li><a href="">내주변</a></li>
                    <li><a href="">내정보</a></li>
                </ul>
            </div>
            <h1>안녕하세요</h1>
            <input type="text" placeholder="출발" />
            <input type="text" placeholder="도착" />
            <button>출발</button>
        </div>
    );
}

export default SideBar;