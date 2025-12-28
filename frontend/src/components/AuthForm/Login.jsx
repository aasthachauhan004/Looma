import { useState } from "react";
import { colors } from "../../styles/colors";

function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log("Login:", { email, password });
      alert("Login successful!");
    }, 1500);
  };

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: colors.text,
          }}
        >
          Email
        </label>
        <input
          type='email'
          placeholder='you@example.com'
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            backgroundColor: colors.bgLight,
            border: `1px solid ${errors.email ? colors.error : colors.border}`,
            borderRadius: "8px",
            fontSize: "16px",
            color: colors.textSecondary,
          }}
        />
        {errors.email && (
          <p
            style={{
              color: colors.error,
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: colors.text,
          }}
        >
          Password
        </label>
        <input
          type='password'
          placeholder='enter-password'
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            backgroundColor: colors.bgLight,
            color: colors.textSecondary,
            border: `1px solid ${
              errors.password ? colors.error : colors.border
            }`,
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />
        {errors.password && (
          <p
            style={{
              color: colors.error,
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            {errors.password}
          </p>
        )}
      </div>

      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <a
          href='#'
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: colors.primary,
            textDecoration: "none",
          }}
        >
          Forgot password?
        </a>
      </div>

      <button
        type='submit'
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: colors.primary,
          color: colors.text,
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1,
        }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p
        style={{
          marginTop: "24px",
          textAlign: "center",
          fontSize: "14px",
          color: colors.textLight,
        }}
      >
        Don't have an account?{" "}
        <button
          type='button'
          onClick={onSwitchToSignup}
          style={{
            background: "none",
            border: "none",
            color: colors.primary,
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

export default Login;
