import { Schema, model, models } from "mongoose";

export interface IRole {
  roleName: string;
  rolePermissions: string[];
}

const RoleSchema = new Schema({
  roleName: {
    type: String,
    unique: true,
  },
  rolePermissions: {
    type: [String],
    default: [],
  },
});

const Role = models.Role || model("Role", RoleSchema);

export default Role;
