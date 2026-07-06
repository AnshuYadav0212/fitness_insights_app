import { Box, Button } from "@mui/material";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import ActivityRecommendationsPage from "./components/ActivityRecommendationsPage";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { logout } from "./store/authSlice";
import ActivitiesPage from "./pages/ActivitiesPage";


const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mb: 2 }}>
        Logout
      </Button>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivitiesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activities/:id"
          element={
            <ProtectedRoute>
              <ActivityDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendation/:id"
          element={
            <ProtectedRoute>
              <ActivityRecommendationsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="*" element={<Navigate to="/activities" replace />} />
      </Routes>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;