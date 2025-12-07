import {
  BookOpenCheck,
  ChartNoAxesCombined,
  ChevronsLeft,
  FolderOpenDot,
  House,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { logout } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import avatar from "../assets/avatar.png";
import Modal from "./Modal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
    } finally {
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate("/auth/login");
    }
  };

  return (
    <div
      className={`relative p-4 bg-light text-dark/80 font-inter text-sm shadow-sm flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 h-screen`}
    >
      <div className="flex justify-between items-center px-2 mb-8">
        <div
          className={`flex items-center gap-3  ${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-200`}
        >
          <img
            src={avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 "
          />
          <p>Sam Smith</p>
        </div>

        <ChevronsLeft
          color="#212121"
          size={24}
          strokeWidth={1.3}
          onClick={() => setIsOpen(!isOpen)}
          className={`cursor-pointer transition-transform duration-300 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </div>
      <div className="flex-1">
        <SidebarItem
          title="Home"
          icon={<House color="#212121" size={20} strokeWidth={1.3} />}
          isActive={true}
          onClick={() => {}}
          isOpen={isOpen}
        />
        <SidebarItem
          title="My Tasks"
          icon={<BookOpenCheck color="#212121" size={20} strokeWidth={1.3} />}
          isActive={false}
          onClick={() => navigate("/tasks")}
          isOpen={isOpen}
        />
        <SidebarItem
          title="Today"
          icon={<FolderOpenDot color="#212121" size={20} strokeWidth={1.3} />}
          isActive={false}
          onClick={() => {}}
          isOpen={isOpen}
        />
        <SidebarItem
          title="Analytics"
          icon={
            <ChartNoAxesCombined color="#212121" size={20} strokeWidth={1.3} />
          }
          isActive={false}
          onClick={() => {}}
          isOpen={isOpen}
        />
        <SidebarItem
          title="Settings"
          icon={<Settings color="#212121" size={20} strokeWidth={1.3} />}
          isActive={false}
          onClick={() => {}}
          isOpen={isOpen}
        />
      </div>
      <div
        className="flex justify-between items-center w-full px-4 py-2 text-dark/80 cursor-pointer hover:bg-red-200/60 rounded-full transition-colors duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        <p>Logout</p>
        <LogOut color="#212121" size={20} strokeWidth={1.3} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Logout"
        showActions={true}
        onConfirm={handleLogout}
        confirmText="Logout"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to logout? You will need to sign in again to
          access your account.
        </p>
      </Modal>
    </div>
  );
};

export default Sidebar;
