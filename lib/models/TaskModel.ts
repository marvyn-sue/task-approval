import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.models.task || mongoose.model("task", Schema);

export default TaskModel;
