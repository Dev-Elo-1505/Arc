import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";

import { taskSchema, type TaskSchema } from "../schemas/taskShemas";
import { forwardRef, useImperativeHandle } from "react";


interface TaskFormProps {
  onSubmit: (data: TaskSchema) => void | Promise<void>;
  onCancel: () => void;
  defaultValues?: Partial<TaskSchema>;
  hideSubmit?: boolean;
}

export type TaskFormHandle = {
  submit: () => Promise<void>;
  isSubmitting: boolean;
};

const TaskForm = forwardRef<TaskFormHandle, TaskFormProps>(
  ({ onSubmit, defaultValues }, ref) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<TaskSchema>({
      resolver: zodResolver(taskSchema),
      defaultValues: defaultValues || {
        status: "pending",
        priority: "medium",
      },
    });

    const onFormSubmit: SubmitHandler<TaskSchema> = async (data) => {
      await onSubmit(data);
      reset();
    };

    useImperativeHandle(
      ref,
      () => ({
        submit: async () => {
          await handleSubmit(onFormSubmit)();
        },
        isSubmitting,
      }),
      [isSubmitting]
    );

    return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormField
          label="Task Name"
          type="text"
          id="title"
          register={register}
          error={errors.title}
          required
          customClass="rounded-md px-3 bg-gray-200/70 border-0"
        />

        <FormField
          label="Description"
          fieldType="textarea"
          id="description"
          register={register}
          error={errors.description}
          rows={4}
          customClass="rounded-md px-3 bg-gray-200/70 border-0 pt-2"
        />

        <div className="md:flex gap-4">
          <div className="flex-1">
            <FormField
              label="Status"
              fieldType="select"
              id="status"
              register={register}
              error={errors.status}
              options={[
                { value: "pending", label: "Pending" },
                { value: "inprogress", label: "In Progress" },
                { value: "completed", label: "Completed" },
              ]}
              required
              customClass="rounded-md px-3 bg-gray-200/70 border-0"
            />
          </div>

          <div className="flex-1">
            <FormField
              label="Priority"
              fieldType="select"
              id="priority"
              register={register}
              error={errors.priority}
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
              required
              customClass="rounded-md px-3 bg-gray-200/70 border-0"
            />
          </div>
        </div>

        <FormField
          label="Due Date"
          type="date"
          id="dueDate"
          register={register}
          error={errors.dueDate}
          required
          customClass="rounded-md px-3 bg-gray-200/70 border-0"
        />

        
      </form>
    );
  }
);

export default TaskForm;
