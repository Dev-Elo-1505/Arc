import { useUser } from "../context/UserProvider";
import avatar from "../assets/avatar.png";

const DashboardHeader = () => {
  const { user } = useUser();
  return (
    <header className="pt-4 px-10 flex justify-end">
  <div className="flex items-center justify-center border gap-2 border-gray-300 rounded-md px-2 py-1 ml-auto">
    <img
      src={avatar}
      alt={user?.first_name || "User avatar"}
      className="w-10 h-10 object-cover"
    />
    <p className="text-sm">
      {user?.first_name} {user?.last_name}
    </p>
  </div>
</header>

  );
};

export default DashboardHeader;
