import { useState } from "react";
import { useUser } from "../context/UserProvider";
import Button from "../components/Button";
import { toast } from "sonner";
import { logout } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Settings = () => {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      setUser(null);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out and cleared profile!");
      navigate("/auth/login");
    }
  };

  const [profile, setProfile] = useState({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      const raw = localStorage.getItem("settings.notifications");
      return raw ? JSON.parse(raw) : true;
    } catch {
      return true;
    }
  });

  const saveProfile = () => {
    const updated = { ...(user ?? {}), ...profile };
    setUser(updated as any);
    localStorage.setItem("user", JSON.stringify(updated));
    toast.success("Profile saved (locally)");
  };

  const saveSettings = () => {
    localStorage.setItem(
      "settings.notifications",
      JSON.stringify(notificationsEnabled)
    );
    toast.success("Settings saved");
  };

  return (
    <main className="min-h-screen container mx-auto pt-1 pb-6 px-10 text-dark font-inter">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mb-8 text-gray-500 text-sm">
        Manage your account settings and preferences.
      </p>

      {/* ================= PROFILE SECTION ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 mb-6 border-b pb-6 gap-6 border-gray-300">
        <div>
          <h3 className="font-medium text-lg ">Profile</h3>
          <p className="text-sm text-gray-500">Set your account details</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div>
              <label htmlFor="first_name" className="text-sm text-gray-500">
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                value={profile.first_name}
                onChange={(e) =>
                  setProfile({ ...profile, first_name: e.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary w-full text-sm"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="text-sm text-gray-500">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                value={profile.last_name}
                onChange={(e) =>
                  setProfile({ ...profile, last_name: e.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary w-full text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary w-full text-sm"
            />
          </div>
          <Button text="Save Profile" onClick={saveProfile} />
        </div>
      </section>

      {/* ================= PREFERENCES ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 mb-6 border-b pb-6 gap-6 border-gray-300">
        <div>
          <h3 className="font-medium text-lg ">Notifications & Preferences</h3>
          <p className="text-sm text-gray-500">
            Enable desktop notifications for task reminders
          </p>
        </div>
        <div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
            <span className="text-sm">Enabled</span>
          </label>
          <Button
            text="Save Preferences"
            onClick={saveSettings}
            customClass="mt-4"
          />
        </div>
      </section>

      {/* ================= DANGER ZONE ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 mb-6 pb-6 gap-6">
        <div>
          <h3 className="font-medium text-lg ">Danger Zone</h3>
          <p className="text-sm text-gray-500">
            The actions here affect your local data only.
          </p>
        </div>
        <div>
          <Button
            onClick={() => setIsModalOpen(true)}
            text="Log out & clear profile"
          />
          <Button
            onClick={() => {
              localStorage.clear();
              toast.success("Local storage cleared");
            }}
            text="Clear all local data"
            customClass="mt-4 bg-red-100 text-red-700"
          />
        </div>
      </section>
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
    </main>
  );
};

export default Settings;
