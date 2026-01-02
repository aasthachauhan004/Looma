import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import { supabase } from "../supabaseClient";
import { colors } from "../styles/colors";
import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import EmptyState from "../components/dashboard/EmptyState";
import UploadVideoModal from "../components/dashboard/UploadVideoModal";
import ProjectCard from "../components/Dashboard/ProjectCard";
import { useState } from "react";

function AllProjects() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleNewVideo = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <>
      <DashboardLayout
        sidebar={
          <Sidebar user={user} onLogout={handleLogout} currentPage='projects' />
        }
      >
        <TopBar onNewVideo={handleNewVideo} />

        {/* Main Content */}
        {projects.length === 0 ? (
          <EmptyState onNewVideo={handleNewVideo} />
        ) : (
          <div style={{ padding: "32px" }}>
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: colors.textDark,
                  marginBottom: "8px",
                }}
              >
                All Projects
              </h2>
              <p style={{ fontSize: "14px", color: colors.textLight }}>
                {projects.length} total project
                {projects.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Projects Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}

export default AllProjects;
