import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Toaster position="top-right" duration={3000} richColors />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
