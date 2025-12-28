import { useState } from "react";
import { colors } from "../../styles/colors";
import Logo from "../common/Logo";
import GoogleAuth from "./GoogleAuth";
import Login from "./Login";
import Signup from "./SignUp";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        backgroundColor: colors.bgCard,
        padding: "48px",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "480px",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 0 60px rgba(59, 130, 246, 0.15)",
      }}
    >
      <Logo />

      <h1
        style={{
          fontSize: "24px",
          fontWeight: "600",
          textAlign: "center",
          color: colors.text,
          marginBottom: "8px",
        }}
      >
        {isLogin ? "Welcome Back" : "Create Account"}
      </h1>

      <GoogleAuth />

      {isLogin ? (
        <Login onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default AuthForm;
