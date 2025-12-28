import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

// function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to='/auth' />;
// }

// function PublicRoute({ children }) {
//   const { user } = useAuth();
//   return !user ? children : <Navigate to='/dashboard' />;
// }

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route
//         path='/auth'
//         element={
//           <PublicRoute>
//             <Auth />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path='/dashboard'
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route path='/' element={<Navigate to='/dashboard' />} />
//     </Routes>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Navigate to='/auth' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
