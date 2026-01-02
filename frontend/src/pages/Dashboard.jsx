import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import { supabase } from "../supabaseClient";
import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import EmptyState from "../components/dashboard/EmptyState";
import UploadVideoModal from "../components/dashboard/UploadVideoModal";
import { colors } from "../styles/colors";
import ProjectCard from "../components/dashboard/ProjectCard";
import { FaVideo, FaUpload, FaFileImage } from "react-icons/fa";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { projects } = useProjects(); // Empty for now
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleNewVideo = () => {
    setIsUploadModalOpen(true);
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
  const actionsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    width: "100%",
    maxWidth: "900px",
    marginTop: "20px",
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

  const recentProjects = projects.slice(0, 6);
  return (
    <>
      <DashboardLayout
        sidebar={<Sidebar user={user} onLogout={handleLogout} />}
      >
        <TopBar onNewVideo={handleNewVideo} />

        {/* Main Content */}
        <div style={{ padding: "32px" }}>
          {/* Always show ActionCards */}
          <div style={actionsContainerStyle}>
            <ActionCard
              icon={FaVideo}
              title='Record Screen'
              description='Turn a screen recording into a studio-quality video and a step-by-step article'
              onClick={handleNewVideo}
            />
            <ActionCard
              icon={FaUpload}
              title='Upload a Video'
              description='Upload a screen recording. Get a studio-style video'
              onClick={handleNewVideo}
            />
            <ActionCard
              icon={FaFileImage}
              title='Upload a Slide Deck'
              description='Turn any PDF or PPT into a narrated video'
              onClick={handleNewVideo}
            />
          </div>

          {projects.length === 0 ? (
            <EmptyState onNewVideo={handleNewVideo} />
          ) : (
            <div style={{ padding: "32px" }}>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: colors.text,
                      marginBottom: "8px",
                    }}
                  >
                    Recent Projects
                  </h2>
                  <p style={{ fontSize: "14px", color: colors.textLight }}>
                    {projects.length} total project
                    {projects.length !== 1 ? "s" : ""}
                  </p>
                </div>
                {projects.length > 6 && (
                  <button
                    onClick={() => navigate("/all-projects")}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: colors.bgLight,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "8px",
                      color: colors.text,
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    View All
                  </button>
                )}
              </div>

              {/* Projects Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "24px",
                }}
              >
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>

      <UploadVideoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
}

export default Dashboard;
