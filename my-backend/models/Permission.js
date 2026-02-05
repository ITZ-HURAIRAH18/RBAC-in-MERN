import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true }
});

export default mongoose.model("Permission", permissionSchema);