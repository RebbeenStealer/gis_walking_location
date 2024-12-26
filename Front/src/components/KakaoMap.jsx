import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "../styles/mapStyle.css";
import useSingleLocation from "../hooks/location/useSingleLocation";
import AuthModal from "../components/AuthModal";

const KakaoMap = () => {
  const { location, error } = useSingleLocation();
  const defaultCenter = { lat: 37.5665, lng: 126.9780 };
  const [center, setCenter] = useState(defaultCenter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (location) {
      setCenter(location);
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    if (token && userInfo) {
      setIsLoggedIn(true);
      const user = JSON.parse(userInfo);
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUsername("");
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.user.username);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userInfo", JSON.stringify(userData.user));
    setIsModalOpen(false);
  };

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <>
      <Map
        id="map"
        center={center}
        style={{
          width: "100%",
          height: "100vh",
        }}
        level={3}
      >
        <MapMarker position={center}></MapMarker>
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
          }}
        >
          {isLoggedIn ? (
            <>
              <span style={{ marginRight: "10px", color: "black", fontWeight: "bold" }}>
                {username} 님
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: "#FEE500",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                background: "#FEE500",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              로그인
            </button>
          )}
        </div>
      </Map>
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
    </>
  );
};

export default KakaoMap;
