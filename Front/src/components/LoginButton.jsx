import React, { useState, useEffect } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("82b7b63771f3a941992c275525c649df");
      console.log("Kakao SDK initialized");
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:5173/login",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("웹페이지 로그인 데이터:", formData);
    // 여기에 서버로 로그인 요청을 보낼 로직 추가
    // 예: fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) })
    alert("웹페이지 로그인 요청 완료!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>로그인</h2>

      {/* 카카오 로그인 버튼 */}
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: "#FEE500",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        카카오로 로그인
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* 웹페이지 로그인 폼 */}
      <form onSubmit={handleFormSubmit} style={{ display: "inline-block" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            아이디:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            비밀번호:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
