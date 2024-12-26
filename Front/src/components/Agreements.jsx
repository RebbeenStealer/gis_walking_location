import React, { useState } from "react";
import SignupForm from "./SignupForm"; // 회원가입 폼 컴포넌트

const Agreements = () => {
  const [step, setStep] = useState(1); // 1: 약관 동의, 2: 회원가입 폼
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    location: false,
    optional: false,
  });

  const handleCheckboxChange = (name) => {
    if (name === "all") {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        age: newValue,
        terms: newValue,
        location: newValue,
        optional: newValue,
      });
    } else {
      const newAgreements = { ...agreements, [name]: !agreements[name] };
      newAgreements.all =
        newAgreements.age && newAgreements.terms && newAgreements.location;
      setAgreements(newAgreements);
    }
  };

  const handleNext = () => {
    if (agreements.age && agreements.terms && agreements.location) {
      setStep(2); // 약관 동의가 완료되면 회원가입 폼으로 이동
    } else {
      alert("필수 약관에 동의해야 회원가입을 진행할 수 있습니다.");
    }
  };

  return (
    <div>
      {step === 1 && (
        <div
          style={{
            padding: "20px",
            maxWidth: "400px",
            margin: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
            약관에 동의해 주세요.
          </h2>
          <p style={{ fontSize: "14px", marginBottom: "20px" }}>
            여러분의 개인정보와 서비스 이용 관리를 위해 약관 동의가 필요해요.
          </p>

          {/* 모두 동의 */}
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={() => handleCheckboxChange("all")}
              style={{ marginRight: "10px" }}
            />
            모두 동의
            <p style={{ fontSize: "12px", marginTop: "5px", color: "#888" }}>
              서비스 이용을 위해 아래 약관에 모두 동의합니다.
            </p>
          </label>

          {/* 개별 항목 */}
          <div style={{ marginLeft: "20px", marginBottom: "10px" }}>
            {[
              { key: "age", label: "(필수) 만 14세 이상입니다." },
              { key: "terms", label: "(필수) 서비스 이용약관 동의" },
              { key: "location", label: "(필수) 위치정보 이용약관 동의" },
              { key: "optional", label: "(선택) 개인정보 수집 및 이용 동의" },
            ].map((item) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label style={{ textAlign: "left" }}>
                  <input
                    type="checkbox"
                    checked={agreements[item.key]}
                    onChange={() => handleCheckboxChange(item.key)}
                    style={{ marginRight: "10px" }}
                  />
                  {item.label}
                </label>
                <button
                  onClick={() =>
                    alert(
                      `${item.label}에 대한 세부 내용을 표시합니다. (예: 팝업)`
                    )
                  }
                  style={{
                    color: "#007BFF",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "12px",
                  }}
                >
                  내용보기
                </button>
              </div>
            ))}
          </div>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            style={{
              width: "100%",
              padding: "10px 0",
              background: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            다음
          </button>
        </div>
      )}
      {step === 2 && (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
          <SignupForm /> {/* 기존 회원가입 폼 렌더링 */}
        </div>
      )}
    </div>
  );
};

export default Agreements;
