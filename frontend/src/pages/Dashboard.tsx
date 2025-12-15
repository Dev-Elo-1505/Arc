import { Plus, Trash2 } from "lucide-react";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { useUser } from "../context/UserProvider";
import { useState, useRef, useEffect } from "react";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import type { TaskFormHandle } from "../components/TaskForm";
import { toast } from "sonner";
import type { TaskSchema } from "../schemas/taskShemas";
import { createTask, deleteTask, getAllTasks } from "../api/task.api";


interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, isLoading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const formRef = useRef<TaskFormHandle | null>(null);

  const fetchTasks = async () => {
    setTasksLoading(true);
    try {
      const data = await getAllTasks();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Fetch tasks error:", error);
      toast.error("Failed to load tasks. Please try again.");
    } finally {
      setTasksLoading(false);
    }
  }

  useEffect(() => {
    if (user) fetchTasks()
  }, [user])

  const handleCreateTask = async (values: TaskSchema) => {
    setConfirmLoading(true)
    try {
      await createTask(values);
      toast.success("Task created successfully!");
      setIsModalOpen(false)
      await fetchTasks()
    } catch (error: any) {
      console.error("Create task error:", error);
      const errorMsg = error.response?.data?.error || "Failed to create task";
      toast.error(errorMsg);
      throw error;
    } finally {
      setConfirmLoading(false);
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!");
      await fetchTasks(); // Refresh task list
    } catch (error: any) {
      console.error("Delete task error:", error);
      toast.error("Failed to delete task");
    }
  };

  // Handle modal confirm button
  const handleModalConfirm = async () => {
    try {
      await formRef.current?.submit();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

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
          <h1 className="text-3xl text-primary font-medium bg-primary-light rounded-md inline-block p-2">
            Welcome, {user ? user.first_name : "there"}! 👋
          </h1>
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
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>

        {tasksLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              No tasks yet. Create your first task!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg flex-1 pr-2">
                    {task.title}
                  </h3>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors shrink-0"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {task.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}

                <div className="flex gap-2 flex-wrap mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in_progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status === "in_progress" ? "In Progress" : task.status}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {task.due_date && (
                  <p className="text-xs text-gray-500">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Task"
        showActions
        confirmText="Create Task"
        confirmClassName="bg-primary"
        confirmLoading={confirmLoading}
        onConfirm={async () => {
          setConfirmLoading(true);
          try {
            await formRef.current?.submit();
            setIsModalOpen(false);
          } catch (err) {
            toast.error("Failed to create task. Please try again.");
            console.error("Submit error:", err);
          } finally {
            setConfirmLoading(false);
          }
        }}
      >
        <TaskForm
          ref={formRef}
          hideSubmit
          onSubmit={handleCreateTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </section>
  );
};

export default Dashboard;
