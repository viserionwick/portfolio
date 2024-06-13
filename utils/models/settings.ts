import { Schema, model, models } from "mongoose";

export interface ISettings {
  work: {
    status: boolean;
    position: string;
    companyName: string;
    companyURL: string;
  }
  socialMedia: {
    name: string;
    href: string;
    icon: string;
  }[];
  heroDescription: string;
  websiteDescription: string;
  websiteName: string;
  techs: TechType[];
}

export type TechType = {
  title: string,
  logo: string,
}

const SettingsSchema = new Schema<ISettings>({
  work: {
    status: { type: Boolean, required: true },
    position: { type: String, required: true },
    companyName: { type: String, required: true },
    companyURL: { type: String, required: true },
  },
  socialMedia: [
    {
      name: { type: String, required: true },
      href: { type: String, required: true },
      icon: { type: String, required: true },
    },
  ],
  heroDescription: { type: String, required: true },
  websiteDescription: { type: String, required: true },
  websiteName: { type: String, required: true },
  techs: [
    {
      title: { type: String, required: true },
      logo: { type: String, required: true },
    }
  ]
});

const Settings = models.Settings || model("Settings", SettingsSchema);

export default Settings;