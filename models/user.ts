
import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role : {
      type : String,
      enum : ["ADMIN","STAFF","USER"],
      default : "USER"
    }
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);






