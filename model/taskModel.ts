import { model, Schema } from "mongoose";
import type { Task } from "../types/task";

const TaskSchema = new Schema<Task>(
    {
        title: { type: String, required: true },
        context: { type: String, required: true },
        completed: { type: Boolean, default: false }
    }
);

export const TaskModel = model<Task>("Task", TaskSchema);
