import { colors } from "../../styles/colors";
import Logo from "../common/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFolder,
  faVideo,
  faSyncAlt,
  faUsers,
  faChartBar,
  faCog,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ user, onLogout }) => {
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
    color: active ? colors.text : colors.textLight,
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
    color: colors.textLight,
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

  const MenuItem = ({ icon, text, active = true, onClick }) => (
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
        <MenuItem icon={faHome} text='Home' />
        <MenuItem icon={faFolder} text='All Projects' />
        <MenuItem icon={faVideo} text='Video Templates' />
        <MenuItem icon={faSyncAlt} text='Auto-update' />
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
            Trial expires in 6 days
          </div>
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            Upgrade your plan
          </div>
        </div>

        {/* User Profile */}
        <button style={userProfileStyle} onClick={onLogout}>
          <div style={avatarStyle}>{userName.charAt(0).toUpperCase()}</div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: colors.text,
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
