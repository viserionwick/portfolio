import Contact, { IContact } from "../../../../utils/models/contact";

export const contactMutationResolver = {
  sendEmail: async (_: any, { input }: { input: IContact }) => {
    const res = await new Contact(input).save();
    return res;
  },
};