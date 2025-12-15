import { api } from "./axios";
import { type TaskSchema } from "../schemas/taskShemas";

const transformTaskPayload = (payload: TaskSchema) => ({
  title: payload.title,
  description: payload.description || "",
  status: payload.status,
  priority: payload.priority,
  due_date: payload.dueDate, 
});

export const createTask = async (payload: TaskSchema) => {
    const res = await api.post("/api/tasks", transformTaskPayload(payload));
    return res.data;
}

export const getAllTasks = async () => {
    const res = await api.get("/api/tasks");
    return res.data;
}

export const getTask = async (taskId: number) => {
    const res = await api.get(`/api/tasks/${taskId}`);
    return res.data;
}

export const updateTask = async (taskId: number, payload: Partial<TaskSchema>) => {
    const res = await api.put(`/api/tasks/${taskId}`, transformTaskPayload(payload as TaskSchema));
    return res.data;
}

export const deleteTask = async (taskId: number) => {
    const res = await api.delete(`/api/tasks/${taskId}`);
    return res.data;
}