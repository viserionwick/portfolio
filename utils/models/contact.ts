import { Schema, model, models } from "mongoose";

export interface IContact {
  message: string;
  name: string;
  email: string;
}

const ContactSchema = new Schema<IContact>({
  message: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Contact = models.Contact || model("Contact", ContactSchema);

export default Contact;