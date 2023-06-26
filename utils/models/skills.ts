import { Schema, model, models } from "mongoose";

export interface ISkills {
  skillSet: {
    row1: string[];
    row2: string[];
    row3: string[];
    row4: string[];
  };
}

const SkillsSchema = new Schema<ISkills>({
  skillSet: {
    row1: { type: [String], required: true },
    row2: { type: [String], required: true },
    row3: { type: [String], required: true },
    row4: { type: [String], required: true },
  },
});

const Skills = models.Skills || model("Skills", SkillsSchema);

export default Skills;