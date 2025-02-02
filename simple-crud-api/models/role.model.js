import mongoose from "mongoose";

const role_type = [ "admin", "vendor", "customer"];
const rolesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: role_type
  }
});

const roles = mongoose.model("Role", rolesSchema);
export default roles;