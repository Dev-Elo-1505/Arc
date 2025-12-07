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
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import avatar from "../assets/avatar.png";
import Modal from "./Modal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    try {
      logout();
    } finally {
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate("/auth/login");
    }
  };

  const menuItems = [
    {
      title: "Home",
      icon: <House size={20} strokeWidth={1.5} />,
      path: "/dashboard",
    },
    {
      title: "My Tasks",
      icon: <BookOpenCheck size={20} strokeWidth={1.5} />,
      path: "/tasks",
    },
    {
      title: "Today",
      icon: <FolderOpenDot size={20} strokeWidth={1.5} />,
      path: "/today",
    },
    {
      title: "Analytics",
      icon: <ChartNoAxesCombined size={20} strokeWidth={1.5} />,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: <Settings size={20} strokeWidth={1.5} />,
      path: "/settings",
    },
  ];

  return (
    <div
      className={`relative p-4 bg-light text-dark/80 font-inter text-sm shadow-sm flex flex-col transition-all duration-300 h-screen ${
        isOpen ? "w-64" : "w-20"
      } `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute -right-3 top-6 z-10 p-1.5 rounded-full bg-white border-gray-200 border hover:bg-gray-50 shadow-sm transition-all duration-300 cursor-pointer ${
          !isOpen ? "rotate-180" : ""
        }`}
      >
        <ChevronsLeft size={18} strokeWidth={2} className="text-dark" />
      </button>

      <div className="flex items-center px-2 mb-8">
        
          <img
            src={avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover  shrink-0"
          />
          <p className={`font-medium text-dark/80 transition-all duration-300 ${isOpen ? "opacity-100 ml-3 mr-auto" : "opacity-0 w-0 overflow-hidden absolute"}`}>Sam Smith</p>
      

      
      </div>
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            title={item.title}
            icon={item.icon}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            isOpen={isOpen}
          />
        ))}
      </nav>
      <button
        className={`flex items-center text-dark/80 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all duration-200 ${
          isOpen ? "justify-between px-4 py-2.5 rounded-full" : "justify-center w-10 h-10 rounded-full mx-auto"
        }`}
        onClick={() => setIsModalOpen(true)}
        title={!isOpen ? "Logout" : undefined}
      >
        <span className={`whitespace-nowrap transition-all duration-300 ${
          isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden absolute"
        }`}>
          Logout
        </span>
        <LogOut size={20} strokeWidth={1.5} className="shrink-0" />
      </button>
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
