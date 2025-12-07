interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  isOpen: boolean;
}

const SidebarItem = ({
  title,
  icon,
  isActive,
  onClick,
  isOpen,
}: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center gap-3 text-dark/80 text-sm mb-2 cursor-pointer hover:bg-primary-light rounded-full w-full px-4 py-2 transition-colors duration-200 ${
        isActive ? "bg-primary-light font-medium" : ""
      }`}
      onClick={onClick}
    >
      <span
        className={`flex-1 overflow-hidden transition-all duration-300 whitespace-nowrap ${
          isOpen ? "max-w-full opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        {title}
      </span>

      {icon}
    </div>
  );
};

export default SidebarItem;
