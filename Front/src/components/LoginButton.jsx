import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [error, setError] = useState("");

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/user/login", formData);
      
      console.log("서버 응답:", response.data);
      
      alert("로그인 성공!");
      
      const { user } = response.data;
      
      localStorage.setItem("token", user.token);
      localStorage.setItem("userInfo", JSON.stringify(user.user));
  
      onLoginSuccess(user);
      onClose();
    } catch (error) {
      console.error("로그인 오류:", error);
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
    }
  };  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>로그인</h2>
      <button onClick={handleLogin} style={{ backgroundColor: "#FEE500", border: "none", padding: "10px 20px", fontSize: "16px", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}>
        카카오로 로그인
      </button>
      <hr style={{ margin: "20px 0" }} />
      <form onSubmit={handleFormSubmit} style={{ display: "inline-block" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            아이디:
            <input type="text" name="id" value={formData.id} onChange={handleFormChange} style={{ marginLeft: "10px" }} required />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            비밀번호:
            <input type="password" name="password" value={formData.password} onChange={handleFormChange} style={{ marginLeft: "10px" }} required />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white", border: "none", padding: "10px 20px", fontSize: "16px", borderRadius: "5px", cursor: "pointer" }}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
