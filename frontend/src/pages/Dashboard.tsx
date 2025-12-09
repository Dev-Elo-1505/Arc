import { Plus } from "lucide-react";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { useUser } from "../context/UserProvider";

const Dashboard = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <section className="min-h-screen container text-dark font-inter">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-1 pb-6 px-10  text-dark font-inter">
      <div className="flex justify-between items-center">
        <div>
        <h1 className="text-3xl text-primary font-medium bg-primary-light rounded-md inline-block p-2">Welcome, {user ? user.first_name : "there"}! 👋</h1>
        <p className="text-3xl text-gray mt-1">How can I help you today?</p>
      </div>
      <div>
        <Button
          text={
            <div className="flex items-center gap-1 ">
              <Plus className="text-sm" /> <p className="text-sm">New Task</p>
            </div>
          }
          customClass="w-36"
        />
      </div>
      </div>
      
    </section>
  );
};

export default Dashboard;
