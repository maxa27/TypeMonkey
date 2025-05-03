import React, { useRef, useState } from "react";
import "./Authorization.scss";
import { useUser } from "../../context/UserContext/UserProvider.jsx";

const Authorization = () => {
  const { login } = useUser();
  const [isRegister, setIsRegister] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmRef = useRef("");

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmRef.current?.value;

    if (isRegister) {
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      login({ username: email, email });
    } else {
      login({ username: email, email });
    }

    // Очистка
    emailRef.current.value = "";
    passwordRef.current.value = "";
    if (confirmRef.current) confirmRef.current.value = "";
  };

  return (
    <div className="authorization-wrapper">
      <div className="authorization-inner">
        <h2 className="login-title">{isRegister ? "register" : "login"}</h2>
        <div className="gradient-border">
          <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="gradient-border-input">
                <input
                  type="email"
                  placeholder="email"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="gradient-border-input">
                <input
                  type="password"
                  placeholder="password"
                  ref={passwordRef}
                  required
                />
              </div>
              {isRegister && (
                <div className="gradient-border-input">
                  <input
                    type="password"
                    placeholder="confirm password"
                    ref={confirmRef}
                    required
                  />
                </div>
              )}
              <div className="gradient-border-btn">
                <button type="submit">
                  {isRegister ? "Sign up" : "Sign in"}
                </button>
              </div>
            </form>
            <div className="register-link">
              {isRegister ? (
                <>
                  already have an account?{" "}
                  <span onClick={toggleMode}>login</span>
                </>
              ) : (
                <>
                  no account? <span onClick={toggleMode}>register</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
