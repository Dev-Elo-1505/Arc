import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "sonner";
import DashboardLayout from "./layouts/DashboardLayout";
import Task from "./pages/Task";

function App() {
  return (
    <>
    <Toaster position="top-right" duration={3000} richColors />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
      <Route element={<DashboardLayout />}>
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task" element={<Task />} />
      </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
