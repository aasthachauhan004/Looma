import { colors } from "../../styles/colors";
import Logo from "../common/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFolder,
  faVideo,
  faUsers,
  faChartBar,
  faCog,
  faTrash,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user, onLogout, currentPage = "home" }) => {
  const navigate = useNavigate();
  const [showSignOut, setShowSignout] = useState(false);
  const sidebarStyle = {
    width: "260px",
    backgroundColor: colors.bgLight,
    borderRight: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    overflowY: "auto",
  };
  const menuItemStyle = (active = false) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    color: colors.text,
    backgroundColor: active ? colors.primary : "transparent",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
    border: "none",
    width: "100%",
    textAlign: "left",
  });

  const sectionTitleStyle = {
    fontSize: "12px",
    fontWeight: "600",
    color: colors.text,
    textTransform: "uppercase",
    marginTop: "24px",
    marginBottom: "12px",
    letterSpacing: "0.5px",
    paddingLeft: "16px",
  };

  const menuSectionStyle = {
    flex: 1,
    overflowY: "auto",
  };

  const footerStyle = {
    marginTop: "auto",
    paddingTop: "20px",
    borderTop: `1px solid ${colors.border}`,
  };

  const trialBannerStyle = {
    backgroundColor: colors.primary,
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "13px",
    color: colors.text,
  };

  const userProfileStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: colors.bgCard,
    border: "none",
    width: "100%",
    textAlign: "left",
  };

  const avatarStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "600",
    color: colors.text,
  };

  const MenuItem = ({ icon, text, active = false, onClick }) => (
    <button
      style={menuItemStyle(active)}
      onClick={onClick}
      onMouseOver={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = colors.bgCard;
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      <FontAwesomeIcon icon={icon} size='sm' style={{ color: "white" }} />
      <span>{text}</span>
    </button>
  );

  const userName =
    user?.user_metadata?.full_name || user?.user_metadata?.name || "User";
  const userEmail = user?.email;

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={{ marginBottom: "32px" }}>
        <Logo />
      </div>

      {/* Menu Items */}
      <div style={menuSectionStyle}>
        <MenuItem
          icon={faHome}
          text='Home'
          active={currentPage === "home"}
          onClick={() => navigate("/dashboard")}
        />
        <MenuItem
          icon={faFolder}
          text='All Projects'
          active={currentPage === "projects"}
          onClick={() => navigate("/all-projects")}
        />
        <MenuItem icon={faVideo} text='Video Templates' />
        <MenuItem icon={faUsers} text='Team' />
        <MenuItem icon={faChartBar} text='Analytics' />

        {/* Settings Section */}
        <div style={sectionTitleStyle}>Settings</div>
        <MenuItem icon={faCog} text='Settings' />
        <MenuItem icon={faTrash} text='Trash' />
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        {/* Trial Banner */}
        <div style={trialBannerStyle}>
          <div style={{ fontWeight: "600", marginBottom: "4px" }}>
            Free Trial expires soon
          </div>
          <div style={{ fontSize: "12px", opacity: 0.9 }}>Update to PRO</div>
        </div>

        {/* User Profile */}
        {showSignOut && (
          <button
            style={{
              ...userProfileStyle,
              padding: "6px 12px",
              fontSize: "12px",
              backgroundColor: colors.bgCard,
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={onLogout}
          >
            <FontAwesomeIcon
              icon={faSignOut}
              size='sm'
              style={{ color: colors.textLight }}
            />
            <span>Sign Out</span>
          </button>
        )}
        <button
          style={userProfileStyle}
          onClick={() => setShowSignout((prev) => !prev)}
        >
          <div style={avatarStyle}>{userName.charAt(0).toUpperCase()}</div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: colors.textSecondary,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userName}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: colors.textLight,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userEmail}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
