import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  token: String,
  taskId: mongoose.Types.ObjectId,
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: "1h" }, // Token expires in 1 hour
});

const TokenModel = mongoose.models.token || mongoose.model("token", Schema);

export default TokenModel;
