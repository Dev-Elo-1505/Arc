import { useState } from "react";
import avatarImg from "../assets/avatar.png";
import { useUser } from "../context/UserProvider";
import { toast } from "sonner";

const UserCard = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
  });

  const openEdit = () => {
    setForm({
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
    });
    setIsEditing(true);
  };

  const save = () => {
    // NOTE: there is no profile update endpoint in the current API.
    // This saves changes locally (context + localStorage). If you add
    // a backend endpoint (e.g. PUT /api/auth/profile) we can call it here.
    const updated = { ...(user ?? {}), ...form };
    setUser(updated as any);
    localStorage.setItem("user", JSON.stringify(updated));
    setIsEditing(false);
    toast.success("Profile updated (saved locally)");
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500">No user data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img src={avatarImg} alt={`${user.first_name} ${user.last_name}`} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div>
              <button onClick={openEdit} className="text-sm px-3 py-1 rounded bg-primary text-white">Edit</button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 space-y-2">
          <div>
            <label className="text-xs text-gray-600">First name</label>
            <input className="w-full border rounded px-2 py-1" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-gray-600">Last name</label>
            <input className="w-full border rounded px-2 py-1" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input className="w-full border rounded px-2 py-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 rounded border">Cancel</button>
            <button onClick={save} className="px-3 py-1 rounded bg-primary text-white">Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
