import React, { useState } from "react";
import LoginButton from "./LoginButton";
import SignupForm from "./SignupForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: 로그인, 2: 약관 동의, 3: 회원가입 폼

  if (!isOpen) return null;

  const renderContent = () => {
    if (step === 1) {
      // 로그인 화면
      return (
        <>
          <h2>로그인</h2>
          <LoginButton />
          <button
            onClick={() => setStep(2)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#ddd",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            회원가입 하기
          </button>
        </>
      );
    }

    if (step === 2) {
      // 약관 동의 화면
      return (
        <>
          <h2>약관 동의</h2>
          <div style={{ textAlign: "left", marginBottom: "10px" }}>
            <label>
              <input type="checkbox" /> (필수) 만 14세 이상입니다.
            </label>
            <br />
            <label>
              <input type="checkbox" /> (필수) 서비스 이용약관 동의
            </label>
            <br />
            <label>
              <input type="checkbox" /> (필수) 위치정보 이용약관 동의
            </label>
            <br />
            <label>
              <input type="checkbox" /> (선택) 개인정보 수집 및 이용 동의
            </label>
          </div>
          <button
            onClick={() => setStep(3)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            다음
          </button>
        </>
      );
    }

    if (step === 3) {
      // 회원가입 폼 화면
      return (
        <>
          <h2>회원가입</h2>
          <SignupForm />
        </>
      );
    }
  };

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
        {renderContent()}
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
