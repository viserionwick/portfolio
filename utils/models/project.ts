import { Schema, model, models } from "mongoose";

export interface IProject {
  id?: string;
  slug: string;
  dates: {
    start: string;
    end: string;
  };
  title: string;
  stack: {
    title: string;
    logo: string;
  }[];
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
  };
  createdAt: string;
  updatedAt: string;
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
  stack: [
    {
      title: String,
      logo: String,
    },
  ],
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
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: String,
  tags: [String],
  spotlight: { type: Boolean, required: true },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
