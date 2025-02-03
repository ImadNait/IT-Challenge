import { Elysia } from "elysia";
import { TaskModel } from "../model/taskModel";


const validateTask = ({ body }: any) => {
    if (!body.title || !body.context) {
        throw new Error("Title and Description are required!");
    }
};

export const taskRoutes = new Elysia({ prefix: "/tasks" })

    .get("/", async () => {
        const allTasks = await TaskModel.find();
        console.log(allTasks)
        if(!allTasks)
            throw new Error("No task found")
        return allTasks;
    })

    .get("/:id", async ({ params }) => {
        const task = await TaskModel.findById(params.id);
        if (!task) throw new Error("Task not found");
        return task;
    })

    .get("/todo", async () => {
        const task = await TaskModel.find({ completed: false });
        if (!task) throw new Error("Task not found");
        return task;
    })

    .post("/", async ({ body }) => {
        validateTask({ body }); 
        return await TaskModel.create(body);
    })

    .put("/:id", async ({ params, body }) => { 
        const updatedTask = await TaskModel.findByIdAndUpdate(params.id, {body}, { new: true });
        if (!updatedTask) throw new Error("Task not found");
        return updatedTask;
    })


    .delete("/:id", async ({ params }) => {
        const deletedTask = await TaskModel.findByIdAndDelete(params.id);
        if (!deletedTask) throw new Error("Task not found");
        return { message: "Task deleted successfully" };
    })

    .onError(({ error }) => {
        return { success: false, message: (error as Error).message };
    });
