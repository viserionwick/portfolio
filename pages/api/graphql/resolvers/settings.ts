import Settings, { TechType } from "../../../../utils/models/settings";
import { checkUserPermissions } from "../../../../utils/helpers/checkUser";
import { GraphQLError } from "graphql";

export const settingsQueryResolver = {
  getSettings: async () => {
    return await Settings.findOne({});
  },
};

export const settingsMutationResolver = {
  updateTechs: async (_: any, { newTechs }: { newTechs: { title: string; logo: string }[] }, context: any) => {
    /* try {
      // Find the existing settings without returning the _id field
      const existingSettings = await Settings.findOne({});

      if (!existingSettings) {
        throw new Error('Settings not found');
      }

      // Update only the techs field with the new value
      newTechs.forEach((newTech) => {
        const existingTechIndex = existingSettings.techs.findIndex(
          (tech: TechType) => tech.title === newTech.title
        );

        if (existingTechIndex !== -1) {
          // If tech with the same title exists, update the logo
          existingSettings.techs[existingTechIndex].logo = newTech.logo;
        } else {
          // If tech with the same title doesn't exist, add a new tech
          existingSettings.techs.push(newTech);
        }
      });

      // Save the updated settings
      const updatedSettings = await existingSettings.save();

      return updatedSettings;
    } catch (error) {
      console.error('Error updating techs:', error);
      throw new Error('Failed to update techs in settings');
    } */



    const { req } = context;

    try {
      await checkUserPermissions(["updateSettings"], req)

      // Find the existing settings without returning the _id field
      const existingSettings = await Settings.findOne({});

      if (!existingSettings) {
        throw new Error('Settings not found');
      }

      // Update only the techs field with the new value
      newTechs.forEach((newTech) => {
        const existingTechIndex = existingSettings.techs.findIndex(
          (tech: TechType) => tech.title === newTech.title
        );

        if (existingTechIndex !== -1) {
          // If tech with the same title exists, update the logo
          existingSettings.techs[existingTechIndex].logo = newTech.logo;
        } else {
          // If tech with the same title doesn't exist, add a new tech
          existingSettings.techs.push(newTech);
        }
      });

      // Save the updated settings
      const updatedSettings = await existingSettings.save();

      return updatedSettings;
    } catch (error: any) {
      const errMsg: string = `An error occurred when updating techs: ${error.message}`;
      throw new GraphQLError(errMsg, {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
  }
}