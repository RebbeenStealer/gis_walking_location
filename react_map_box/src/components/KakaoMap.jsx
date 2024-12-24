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

  useEffect(() => {
    if (location) {
      setCenter(location);
    }
  }, [location]);

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
      {/* 로그인/회원가입 버튼 */}
      <button
      onClick={() => setIsModalOpen(true)}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "#FEE500",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: 1000,
      }}
      >
        로그인
      </button>
    </Map>
    {/* 모달 렌더링 */}
    <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </>
  );
};

export default KakaoMap; 