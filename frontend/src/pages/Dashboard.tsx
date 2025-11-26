import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth.api";
import Button from "../components/Button";

const Dashboard = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    localStorage.removeItem("token")
    alert("Logged out successfully!")
    navigate("/auth/login")
  }

  return (
    <section className="min-h-screen container text-dark">
      <h1>Welcome to the dashboard</h1>
      <Button text="Log out" customClass="w-36 mt-4" onClick={handleLogout}/>
    </section>
  );
};

export default Dashboard;
