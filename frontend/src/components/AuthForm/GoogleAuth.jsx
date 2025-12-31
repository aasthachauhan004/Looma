import { colors } from "../../styles/colors";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

function GoogleAuth({ onUser }) {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      console.error("Google sign-in error:", error.message);
      alert(`Google sign-in failed: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={signInWithGoogle}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: colors.bgLight,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "24px",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = colors.bgCard;
          e.target.style.borderColor = colors.primary;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = colors.bgLight;
          e.target.style.borderColor = colors.border;
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: colors.textSecondary,
          }}
        >
          G
        </span>
        <span style={{ color: colors.textSecondary }}>
          {loading ? "Redirecting…" : "Continue with Google"}
        </span>
      </button>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "24px 0",
          gap: "12px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "1px",
            backgroundColor: colors.border,
          }}
        ></div>
        <span
          style={{
            fontSize: "14px",
            color: colors.textLight,
          }}
        >
          or
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            backgroundColor: colors.border,
          }}
        ></div>
      </div>
    </>
  );
}

export default GoogleAuth;
