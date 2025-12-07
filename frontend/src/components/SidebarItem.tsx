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
      className={`flex items-center gap-3 text-sm mb-2 cursor-pointer rounded-full transition-all duration-200 ${
        isActive
          ? "bg-primary-light text-primary font-medium"
          : "text-dark/80 hover:bg-primary-light"
      } ${isOpen ? "justify-between px-4 py-2.5 rounded-full" : "justify-center w-10 h-10 rounded-full mx-auto"}`}
      onClick={onClick}
      title={!isOpen ? title : undefined}
    >
      <span
        className={`whitespace-nowrap transition-all duration-300 ${
          isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden absolute"
        }`}
      >
        {title}
      </span>
      <span className="shrink-0">{icon}</span>
    </div>
  );
};

export default SidebarItem;
