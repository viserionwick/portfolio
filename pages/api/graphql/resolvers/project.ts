// Essentials
import Project, { IProject } from "../../../../utils/models/project";
import { GraphQLError } from "graphql";
import { checkUserPermissions } from "../../../../utils/helpers/checkUser";


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
  createProject: async (_: any, { input }: { input: IProject }, context: any) => {
    
    const { req } = context;

    try {
      await checkUserPermissions(["createPost"], req)

      let newProject = {...input};

      if (newProject.spotlight) {
        const existingSpotlightProject = await Project.findOne({ spotlight: true });
        if (existingSpotlightProject) {
          existingSpotlightProject.spotlight = false;
          await existingSpotlightProject.save();
        }
      }

      const response = await new Project(newProject).save();
      return response;
    } catch (error: any) {
      const errMsg: string = `An error occurred when creating a project: ${error.message}`;
      throw new GraphQLError(errMsg, {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
  }, 
  updateProject: async (_: any, { input }: { input: IProject }, context: any) => {
    
    const { req } = context;

    try {
      await checkUserPermissions(["updatePost"], req)

      const project = await Project.findById(input._id);
      if (!project) {
        throw new Error('Project not found.');
      }

      if (input.spotlight) {
        const existingSpotlightProject = await Project.findOne({ spotlight: true });
        if (existingSpotlightProject && existingSpotlightProject.id !== input._id) {
          existingSpotlightProject.spotlight = false;
          await existingSpotlightProject.save();
        }
      }
      
      
      Object.assign(project, input);

      const response = await project.save();
      return response;
      
    } catch (error: any) {
      const errMsg: string = `An error occurred when updating a project: ${error.message}`;
      throw new GraphQLError(errMsg, {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
  }, 
  deleteProject: async (_: any, { projectID }: { projectID: string }, context: any) => {
    const { req } = context;
  
    try {
      // Check user permissions
      await checkUserPermissions(["deletePost"], req);
  
      // Find the project by ID
      const project = await Project.findByIdAndDelete(projectID);
      if (!project) {
        throw new Error(`Project not found: ${projectID}`);
      }
  
      return { success: true, message: "Project deleted successfully." };
    } catch (error: any) {
      const errMsg: string = `An error occurred when deleting the project: ${error.message}`;
      throw new GraphQLError(errMsg, {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
  }
};