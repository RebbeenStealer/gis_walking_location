import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    phonenumber: "",
    id: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });

  const [isIdAvailable, setIsIdAvailable] = useState(null); // 아이디 사용 가능 여부 상태

  const handleChange = async (e) => {
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
        setIsIdAvailable(null); // 중복 검사 결과 초기화
      } else {
        setErrors((prev) => ({
          ...prev,
          id: "",
        }));

        // 아이디 중복 검사
        try {
          const response = await fetch("https://example.com/api/check-username", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: value }),
          });
          const data = await response.json();
          if (data.available) {
            setIsIdAvailable(true);
          } else {
            setIsIdAvailable(false);
          }
        } catch (error) {
          console.error("아이디 중복 검사 중 오류 발생:", error);
          setIsIdAvailable(null); // 오류 발생 시 결과 초기화
        }
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
    }
  };

  const handleSubmit = (e) => {
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

    if (isIdAvailable === false) {
      alert("이미 사용 중인 아이디입니다.");
      return;
    }

    console.log("회원가입 데이터:", formData);
    alert("회원가입이 완료되었습니다!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <input
        type="text"
        name="id"
        placeholder="아이디"
        value={formData.id}
        onChange={handleChange}
        required
      />
      {errors.id && (
        <p style={{ color: "red", fontSize: "12px" }}>{errors.id}</p>
      )}
      {isIdAvailable === true && (
        <p style={{ color: "green", fontSize: "12px" }}>사용 가능한 아이디입니다.</p>
      )}
      {isIdAvailable === false && (
        <p style={{ color: "red", fontSize: "12px" }}>이미 사용 중인 아이디입니다.</p>
      )}
      <input
        type="password"
        name="password"
        placeholder="비밀번호(8~20자)"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && (
        <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>
      )}
      <input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {errors.confirmPassword && (
        <p style={{ color: "red", fontSize: "12px" }}>{errors.confirmPassword}</p>
      )}
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
      <button
        type="submit"
        style={{
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
