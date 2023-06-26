import Settings from "../../../../utils/models/settings";

export const settingsQueryResolver = {
  getSettings: async () => {
    return await Settings.findOne({});
  },
};