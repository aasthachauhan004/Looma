import { colors } from "../../styles/colors";
import { FaPlus, FaSearch, FaBell } from "react-icons/fa";

function TopBar({ onNewVideo }) {
  const topBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 32px",
    backgroundColor: colors.bg,
    borderBottom: `1px solid ${colors.border}`,
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: 1,
  };

  const searchBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: colors.bgLight,
    padding: "10px 16px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    width: "100%",
    maxWidth: "400px",
  };

  const searchInputStyle = {
    background: "none",
    border: "none",
    outline: "none",
    color: colors.text,
    fontSize: "14px",
    width: "100%",
  };

  const newVideoButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    backgroundColor: colors.primary,
    color: colors.text,
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  };

  const iconButtonStyle = {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgLight,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    cursor: "pointer",
    color: colors.textLight,
    transition: "all 0.2s",
  };

  return (
    <div style={topBarStyle}>
      {/* Left Section - Search */}
      <div style={leftSectionStyle}>
        <div style={searchBarStyle}>
          <FaSearch size={16} color={colors.textLight} />
          <input
            type='text'
            placeholder='Search projects...'
            style={searchInputStyle}
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Notifications */}
        <button
          style={iconButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colors.bgCard;
            e.currentTarget.style.borderColor = colors.primary;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.bgLight;
            e.currentTarget.style.borderColor = colors.border;
          }}
        >
          <FaBell size={18} />
        </button>

        {/* New Video Button */}
        <button
          style={newVideoButtonStyle}
          onClick={onNewVideo}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colors.primaryHover;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary;
          }}
        >
          <FaPlus size={16} />
          <span>New Video</span>
        </button>
      </div>
    </div>
  );
}

export default TopBar;
