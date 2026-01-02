import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AllProjects from "./pages/AllProjects";
import { ProjectsProvider } from "./context/ProjectContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#FFFFFF",
        }}
      >
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to='/auth' />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#FFFFFF",
        }}
      >
        Loading...
      </div>
    );
  }

  return !user ? children : <Navigate to='/dashboard' replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/auth'
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/all-projects'
        element={
          <ProtectedRoute>
            <AllProjects />
          </ProtectedRoute>
        }
      />

      <Route path='/' element={<Navigate to='/auth' replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <AppRoutes />
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
