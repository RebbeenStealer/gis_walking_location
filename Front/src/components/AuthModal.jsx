import React, { useState } from "react";
import Login from "./LoginButton";
import SignupForm from "./SignupForm";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>{isSignup ? "회원가입" : "로그인"}</h2>
        {isSignup ? (
          <SignupForm onClose={onClose} />
        ) : (
          <Login onClose={onClose} onLoginSuccess={onLoginSuccess} />
        )}
        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            padding: "5px 10px",
            backgroundColor: "#ddd",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isSignup ? "로그인으로 돌아가기" : "회원가입 하기"}
        </button>
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#ccc",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
