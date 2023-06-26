import Project, { IProject } from "../../../../utils/models/project";

export const projectQueryResolver = {
  getProject: async (_: any, { slug }: { slug: string }) => {
    return await Project.findOne({ slug });
  },
  getProjects: async (_: any, { limit, excludeSpotlight = true, excludeSlug , offset = 0 }: { limit: number, excludeSpotlight?: boolean, excludeSlug?: string, offset?: number }) => {
    if (limit && limit >= 1) {
      let query: any = {};
      if (excludeSpotlight) {
        query.spotlight = { $ne: true }
      }
      if (excludeSlug) {
        query.slug = { $ne: excludeSlug };
      }       
      
      const projects = await Project.find(query)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);

      return projects

    } else {
      return [];
    }
  },
  getSpotlightProject: async () => {
    return await Project.findOne({ spotlight: true });
  },
};

export const projectMutationResolver = {
  createProject: async (_: any, { input }: { input: IProject }) => {
    const res = await new Project(input).save();
    return res;
  },
};