import React, { useState } from "react";
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    phonenumber: "",
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 유효성 검사
    if (name === "id") {
      if (value.length < 6 || value.length > 20) {
        setErrors((prev) => ({
          ...prev,
          id: "아이디는 6~20자 이내로 입력해야 합니다.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          id: "",
        }));
      }
    }

  if (name === "password") {
    if (value.length < 8 || value.length > 20) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호는 8~20자 이내로 입력해야 합니다.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  }
};

if (name === "confirmPassword") {
  if (value !== formData.password) {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "비밀번호가 일치하지 않습니다.",
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "",
    }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // 최종 유효성 검사
  if (formData.id.length < 6 || formData.id.length > 20) {
    alert("아이디는 6-20자 이내로 입력해야 합니다.");
    return;
  }

  if (formData.password.length < 8 || formData.password.length > 20) {
    alert("비밀번호는 8-20자 이내로 입력해야 합니다.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/user/signup', formData);
    // console.log("서버 응답:", response.data);
    alert("회원가입이 완료되었습니다!");
  } catch (error) {
    // console.error("회원가입 오류:", error);
    alert("회원가입 중 오류가 발생했습니다.");
  }
};
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        name="username"
        placeholder="이름"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phonenumber"
        placeholder="휴대폰 번호(-제외)"
        value={formData.phonenumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="id"
        placeholder="아이디"
        value={formData.id}
        onChange={handleChange}
        required
      />
       {errors.id && <p style={{ color: "red", fontSize: "12px" }}>{errors.id}</p>}
      <input
        type="password"
        name="password"
        placeholder="비밀번호(8~20자)"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>}
      <input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
       {errors.confirmpassword && (<p style={{ color: "red", fontSize: "12px" }}>{errors.confirmPassword}</p>)}
      <button type="submit" style={{ padding: "10px", background: "#4CAF50", color: "white", border: "none" }}>
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
