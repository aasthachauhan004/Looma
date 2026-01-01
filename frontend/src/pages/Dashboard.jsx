import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import EmptyState from "../components/dashboard/EmptyState";
import UploadVideoModal from "../components/dashboard/UploadVideoModal";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects] = useState([]); // Empty for now
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
        sidebar={<Sidebar user={user} onLogout={handleLogout} />}
      >
        <TopBar onNewVideo={handleNewVideo} />

        {/* Main Content */}
        {projects.length === 0 ? (
          <EmptyState onNewVideo={handleNewVideo} />
        ) : (
          <div style={{ padding: "32px" }}>
            {/* Projects will go here */}
            <h2>Your Projects</h2>
          </div>
        )}
      </DashboardLayout>
      <UploadVideoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
}

export default Dashboard;
