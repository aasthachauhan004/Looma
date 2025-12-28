import { useState } from "react";
import { colors } from "../../styles/colors";

function Signup({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
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

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Signup:", formData);
      alert("Signup successful!");
    }, 1500);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const inputStyle = (fieldName) => ({
    width: "100%",
    padding: "12px 16px",
    backgroundColor: colors.bgLight,
    border: `1px solid ${errors[fieldName] ? colors.error : colors.border}`,
    borderRadius: "8px",
    fontSize: "16px",
    color: colors.text,
  });

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: colors.text,
  };

  const inputGroupStyle = {
    marginBottom: "20px",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={inputGroupStyle}>
        <label style={labelStyle}>Full Name</label>
        <input
          type='text'
          placeholder='John Doe'
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          style={inputStyle("name")}
        />
        {errors.name && (
          <p
            style={{ color: colors.error, fontSize: "14px", marginTop: "4px" }}
          >
            {errors.name}
          </p>
        )}
      </div>

      <div style={inputGroupStyle}>
        <label style={labelStyle}>Email</label>
        <input
          type='email'
          placeholder='you@example.com'
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          style={inputStyle("email")}
        />
        {errors.email && (
          <p
            style={{ color: colors.error, fontSize: "14px", marginTop: "4px" }}
          >
            {errors.email}
          </p>
        )}
      </div>

      <div style={inputGroupStyle}>
        <label style={labelStyle}>Password</label>
        <input
          type='password'
          placeholder='enter-password'
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          style={inputStyle("password")}
        />
        {errors.password && (
          <p
            style={{ color: colors.error, fontSize: "14px", marginTop: "4px" }}
          >
            {errors.password}
          </p>
        )}
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
        {loading ? "Creating account..." : "Create Account"}
      </button>

      {/* Switch to Login */}
      <p
        style={{
          marginTop: "24px",
          textAlign: "center",
          fontSize: "14px",
          color: colors.textLight,
        }}
      >
        Already have an account?{" "}
        <button
          type='button'
          onClick={onSwitchToLogin}
          style={{
            background: "none",
            border: "none",
            color: colors.primary,
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default Signup;
