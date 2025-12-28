import { colors } from "../../styles/colors";

function Logo() {
  return (
    <div
      style={{
        fontSize: "36px",
        fontWeight: "800",
        textAlign: "center",
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-1px",
        marginBottom: "12px",
      }}
    >
      LOOMA
    </div>
  );
}

export default Logo;
