import { Schema, model, models } from "mongoose";

export interface IProject {
  _id?: string;
  slug: string;
  dates: {
    start: string | Date;
    end: string | Date;
  };
  title: string;
  stack: string[];
  description: {
    text: string;
    webLink: string;
    repLink: string;
  };
  tab1: {
    title: string;
    text: string;
  };
  tab2: {
    title: string;
    text: string;
  };
  tab3: {
    title: string;
    text: string;
  };
  banner: string;
  desktopImages: string[];
  mobileImages: string[];
  author: {
    authorID: string;
    authorName: string;
    authorUsername: string;
  };
  createdAt: string;
  updatedTimes?: {
    updatedAt: string;
    authorID: string;
    authorUsername: string;
    authorRoleAtTheTime: string;
  }[];
  tags: string[];
  spotlight: boolean;
}

const ProjectSchema = new Schema<IProject>({
  dates: {
    start: { type: String },
    end: { type: String },
  },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  stack: { type: [String] },
  description: {
    text: { type: String, required: true },
    webLink: String,
    repLink: String,
  },
  tab1: {
    title: String,
    text: String,
  },
  tab2: {
    title: String,
    text: String,
  },
  tab3: {
    title: String,
    text: String,
  },
  banner: { type: String, required: true },
  desktopImages: { type: [String], required: true },
  mobileImages: { type: [String], required: true },
  author: {
    authorID: { type: String, required: true },
    authorName: { type: String, required: true },
    authorUsername: { type: String, required: true },
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedTimes: {
    type: [
      {
        updatedAt: { type: String, required: true },
        authorID: { type: String, required: true },
        authorUsername: { type: String, required: true },
        authorRoleAtTheTime: { type: String, required: true },
      }
    ],
    default: []
  },
  tags: [String],
  spotlight: { type: Boolean, required: true },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;