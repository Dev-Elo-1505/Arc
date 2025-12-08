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
    <section className="min-h-screen container text-dark font-inter">
      <div className="py-6 px-10">
        <h1 className="text-3xl text-primary font-medium bg-primary-light rounded-md inline-block p-2">Welcome, {user ? user.first_name : "there"}! 👋</h1>
        <p className="text-3xl text-gray mt-1">How can I help you today?</p>
      </div>
    </section>
  );
};

export default Dashboard;
