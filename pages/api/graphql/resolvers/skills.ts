import Skills from "../../../../utils/models/skills";

export const skillsQueryResolver = {
  getSkills: async () => {
    return await Skills.findOne({});
  },
};