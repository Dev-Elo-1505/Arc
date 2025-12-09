import { Plus } from "lucide-react";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { useUser } from "../context/UserProvider";
import UserCard from "../components/UserCard";

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
    <section className="min-h-screen max-w-4xl mx-auto text-dark font-inter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start py-6">
        <div className="md:col-span-2 bg-transparent">
          <div className="py-2 px-4">
            <h1 className="text-3xl text-primary font-medium bg-primary-light rounded-md inline-block p-2">Welcome, {user ? user.first_name : "there"}! 👋</h1>
            <p className="text-base text-gray mt-2">How can I help you today?</p>
          </div>
          <div className="px-4 mt-4">
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

        <aside className="md:col-span-1 px-4">
          <UserCard />
        </aside>
      </div>
    </section>
  );
};

export default Dashboard;
