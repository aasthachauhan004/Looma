import { colors } from "../../styles/colors";
import { FaPlay, FaDownload, FaEllipsisV } from "react-icons/fa";

function ProjectCard({ project }) {
  const cardStyle = {
    backgroundColor: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  const thumbnailStyle = {
    width: "100%",
    height: "180px",
    backgroundColor: colors.bgLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const contentStyle = {
    padding: "16px",
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: colors.text,
    marginBottom: "8px",
  };

  const metaStyle = {
    fontSize: "14px",
    color: colors.textLight,
    marginBottom: "12px",
  };

  const actionsStyle = {
    display: "flex",
    gap: "8px",
  };

  const buttonStyle = {
    padding: "8px 12px",
    backgroundColor: colors.bgLight,
    border: `1px solid ${colors.border}`,
    borderRadius: "6px",
    color: colors.textDark,
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
  };

  return (
    <div
      style={cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = colors.primary;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Thumbnail */}
      <div style={thumbnailStyle}>
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <FaPlay size={48} color={colors.textLight} />
        )}
      </div>

      {/* Content */}
      <div style={contentStyle}>
        <h3 style={titleStyle}>{project.title}</h3>
        <p style={metaStyle}>
          Created {new Date(project.createdAt).toLocaleDateString()}
        </p>

        {/* Actions */}
        <div style={actionsStyle}>
          <button
            style={buttonStyle}
            onClick={() =>
              window.open(
                `http://localhost:3000/uploads/${project.videoPath}`,
                "_blank"
              )
            }
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgCard;
              e.currentTarget.style.borderColor = colors.primary;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgLight;
              e.currentTarget.style.borderColor = colors.border;
            }}
          >
            <FaPlay size={14} />
            Play
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              const link = document.createElement("a");
              link.href = `http://localhost:3000/uploads/${project.videoPath}`;
              link.download = project.title;
              link.click();
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgCard;
              e.currentTarget.style.borderColor = colors.primary;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgLight;
              e.currentTarget.style.borderColor = colors.border;
            }}
          >
            <FaDownload size={14} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
