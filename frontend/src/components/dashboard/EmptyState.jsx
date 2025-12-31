import { colors } from "../../styles/colors";
import { FaVideo, FaUpload, FaFileImage } from "react-icons/fa";

function EmptyState({ onNewVideo }) {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    textAlign: "center",
  };

  const iconStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: colors.bgLight,
    border: `2px dashed ${colors.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "700",
    color: colors.text,
    marginBottom: "12px",
  };

  const subtitleStyle = {
    fontSize: "16px",
    color: colors.textLight,
    marginBottom: "32px",
    maxWidth: "500px",
  };

  const actionsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    width: "100%",
    maxWidth: "900px",
    marginTop: "20px",
  };

  const actionCardStyle = {
    backgroundColor: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "24px",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
  };

  const ActionCard = ({ icon: Icon, title, description, onClick }) => (
    <div
      style={actionCardStyle}
      onClick={onClick}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = colors.primary;
        e.currentTarget.style.backgroundColor = colors.bgLight;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.backgroundColor = colors.bgCard;
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "8px",
          backgroundColor: colors.primary + "20",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Icon size={24} color={colors.primary} />
      </div>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: colors.text,
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: colors.textLight,
          lineHeight: "1.5",
        }}
      >
        {description}
      </p>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={iconStyle}>
        <FaVideo size={48} color={colors.textLight} />
      </div>

      <h1 style={titleStyle}>No projects yet</h1>
      <p style={subtitleStyle}>
        Create your first video project to get started with Looma
      </p>

      <div style={actionsContainerStyle}>
        <ActionCard
          icon={FaVideo}
          title='Record Screen'
          description='Turn a screen recording into a studio-quality video and a step-by-step article'
          onClick={onNewVideo}
        />
        <ActionCard
          icon={FaUpload}
          title='Upload a Video'
          description='Upload a screen recording. Get a studio-style video'
          onClick={onNewVideo}
        />
        <ActionCard
          icon={FaFileImage}
          title='Upload a Slide Deck'
          description='Turn any PDF or PPT into a narrated video'
          onClick={onNewVideo}
        />
      </div>
    </div>
  );
}

export default EmptyState;
