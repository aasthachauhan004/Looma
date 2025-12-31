import { useState } from "react";
import { colors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function Signup({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        console.error("Signup error:", error);

        // User-friendly error messages
        if (
          error.message.includes("already registered") ||
          error.message.includes("already been registered")
        ) {
          setErrors({
            form: "This email is already registered. Please sign in instead.",
          });
        } else if (error.message.includes("Password")) {
          setErrors({
            form: "Password is too weak. Please use a stronger password.",
          });
        } else {
          setErrors({
            form: error.message || "Signup failed. Please try again.",
          });
        }
        setLoading(false);
      } else if (data.user) {
        // User created successfully
        console.log("Signup successful:", data.user);

        // Since email confirmation is disabled, user should be logged in automatically
        if (data.session) {
          // User is logged in, redirect to dashboard
          navigate("/dashboard");
        } else {
          // No session created (shouldn't happen with confirmation disabled)
          alert("Account created! Please sign in.");
          onSwitchToLogin();
        }
      } else {
        setErrors({ form: "Signup failed. Please try again." });
        setLoading(false);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrors({ form: "An unexpected error occurred. Please try again." });
      setLoading(false);
    }
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
    color: colors.textSecondary,
  });

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: colors.textSecondary,
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
