// Essentials
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { NextPage } from "next";
import Image from "next/image";
import UploadMedia from "../components/UploadMedia";

// Utils
import { getProject, createProject, updateProject, deleteProject } from "../../../../utils/services/projects";
import { getSettings } from "../../../../utils/services/settings";

// Contexts
import { usePopUpContext } from "../../../../contexts/popUpContext";

// Hooks
import useProjectData from "./_hooks/useProjectData";
import useMedia from "../../../../hooks/useMedia";

// Types
import { IProject } from "../../../../utils/models/project";
import { ISessionUser } from "../../../../utils/models/user";
import { TechType } from "../../../../utils/models/settings";
import AddTech from "./addTech.comp";

// UI Components
import * as Form from "@radix-ui/react-form";
import * as Switch from "@radix-ui/react-switch";
import * as Toggle from "@radix-ui/react-toggle";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/src/stylesheets/datepicker.scss";


const Admin_NewProject: NextPage<{ projectToEdit: IProject, projectToEditTechList: TechType[] }> = ({ projectToEdit, projectToEditTechList }) => {
  const { data: session } = useSession() as { data: ISessionUser | null };

  const { push: goTo } = useRouter();
  const { newPopUp } = usePopUpContext();
  const user = session?.user;

  const {
    // Funcs
    handleChange,
    removeTech,

    // States
    project, setProject,
    autoSlug, setAutoSlug,
    currentStack, setCurrentStack,
    currentTags, setCurrentTags,
    currentBanner, setCurrentBanner,
    currentMobileImages, setCurrentMobileImages,
    currentDesktopImages, setCurrentDesktopImages
  } = useProjectData();


  // Update project slug automaticaly relative to it's title.
  useEffect(() => {
    if (autoSlug) {
      setProject({
        ...project,
        slug: project.title
          .toLowerCase()
          .replace(/\s+/g, " ")
          .replace(/ /g, "-"),
      });
    }
  }, [autoSlug]);


  // Update project state to edit existing project.
  const [existingBanner, setExistingBanner] = useState<string[]>([]);
  const [existingDesktopImages, setExistingDesktopImages] = useState<string[]>([]);
  const [existingMobileImages, setExistingMobileImages] = useState<string[]>([]);

  // Update project state if in edit mode.
  useEffect(() => { 
    if(projectToEdit){
      console.log("projectToEdit: ", projectToEdit);
      
      setProject({
        ...project,
        _id: projectToEdit._id,
        createdAt: projectToEdit.createdAt,
        dates: {
          start: projectToEdit.dates.start ? new Date(projectToEdit.dates.start) : "",
          end: projectToEdit.dates.end ? new Date(projectToEdit.dates.end) : ""
        },
        slug: projectToEdit.slug,
        title: projectToEdit.title,
        description: projectToEdit.description,
        tab1: projectToEdit.tab1,
        tab2: projectToEdit.tab2,
        tab3: projectToEdit.tab3,
        author: projectToEdit.author,
        spotlight: projectToEdit.spotlight,
        stack: projectToEdit.stack,
      });


      setCurrentTags(projectToEdit.tags.join(", "));
      setCurrentStack(projectToEditTechList);

      setExistingBanner([projectToEdit.banner]);
      setExistingDesktopImages(projectToEdit.desktopImages);
      setExistingMobileImages(projectToEdit.mobileImages);      
    }
  }, []);


  // SUBMIT
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadMedia, deleteMedia, relocateMedia } = useMedia();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const checkUrl = (url: string) =>
      !url.startsWith("http://") && !url.startsWith("https://")
        ? "https://" + url
        : url;

    const separateTags = (tagsString: string) => { // Splits tags with a comma and turns them into an array.
      const tagsArray = tagsString.split(",").map((tag) => tag.trim());
      return tagsArray.filter((tag) => tag.length > 0);
    };
    

    let newProject = {
      ...project,
      stack: currentStack.map(tech => tech.title),
      description: {
        ...project.description,

        webLink: project.description.webLink && checkUrl(project.description.webLink),
        repLink: project.description.repLink && checkUrl(project.description.repLink),
      },
      tags: separateTags(currentTags),
    };   



    // Passes banner requirement.
    const bannerPass = async () => {

      // Update images states.
      const storeImages = (key: string, imageArray: any, returnSingle: boolean = false) => {
        if (imageArray.length === 1 && Object.keys(imageArray[0]).length !== 0) {
          newProject = {
            ...newProject,
            [key]: !returnSingle ? [imageArray[0].secure_url] : imageArray[0].secure_url,
          };
        } else if (imageArray.length > 1 && Object.keys(imageArray[0]).length !== 0) {
          newProject = {
            ...newProject,
            [key]: imageArray.map((image: any) => image.secure_url),
          };
        }
      };


      // Get Cloudinary image public id.
      const getProjectImagePublicID = (url: string) => {
        return url.substring(url.lastIndexOf('/', url.lastIndexOf('/', url.lastIndexOf('/', url.lastIndexOf('/') - 1) - 1) - 1) + 1).split('.')[0];
      }


      // Update the existing project.
      if (projectToEdit) { 

        // Proclaim when this project was updated.
        const proclaimUpdated = () => {
          if (user && user._id) {
            newProject = {
              ...newProject,
              updatedTimes: [
                ...(projectToEdit.updatedTimes || []),
                {
                  updatedAt: new Date().toISOString(),
                  authorID: user._id,
                  authorUsername: user.username,
                  authorRoleAtTheTime: user.role
                }
              ]
            }
          }
        }



        // Update images: Banner.        
        if(currentBanner.length){ // New: Banner
          deleteMedia([getProjectImagePublicID(projectToEdit.banner)]);

          uploadMedia({currentBanner}, `projects/${projectToEdit.author.authorUsername}/${projectToEdit.slug}`).then(async data => {  
            storeImages("banner", data.currentBanner, true);
          });
      
        } else { // Keep: Banner
          newProject = {
            ...newProject,
            banner: projectToEdit.banner
          }
        }


        // Update images: Desktop Images. 
        if(currentDesktopImages.length) { // New: Desktop Images
          let publicIDs: string[] = [];

          projectToEdit.desktopImages.map((url) => {
            publicIDs = [
              ...publicIDs,
              getProjectImagePublicID(url)
            ]
          })          

          deleteMedia(publicIDs);

          uploadMedia({currentDesktopImages}, `projects/${projectToEdit.author.authorUsername}/${projectToEdit.slug}`).then(async data => {  
            storeImages("desktopImages", data.currentDesktopImages);
          });

        } else { // Keep: Desktop Images

          // Filter images for deletion.
          const filterImages = projectToEdit.desktopImages.filter(image => !existingDesktopImages.includes(image));

          // Delete removed media and update project.
          let imagesToDelete: string[] = [];
          filterImages.map(image => {
            imagesToDelete = [
              ...imagesToDelete,
              getProjectImagePublicID(image)
            ]
          })          

          imagesToDelete.length && deleteMedia(imagesToDelete);

          newProject = {
            ...newProject,
            desktopImages: existingDesktopImages
          }
        }


        // Update images: Mobile Images. 
        if(currentMobileImages.length) { // New: Mobile Images
          let publicIDs: string[] = [];

          projectToEdit.mobileImages.map((url) => {
            publicIDs = [
              ...publicIDs,
              getProjectImagePublicID(url)
            ]
          })          

          deleteMedia(publicIDs);

          uploadMedia({currentMobileImages}, `projects/${projectToEdit.author.authorUsername}/${projectToEdit.slug}`).then(async data => {  
            storeImages("mobileImages", data.currentMobileImages);
          });

        } else { // Keep: Mobile Images

          // Filter images for deletion.
          const filterImages = projectToEdit.mobileImages.filter(image => !existingMobileImages.includes(image));

          // Delete removed media and update project.
          let imagesToDelete: string[] = [];
          filterImages.map(image => {
            imagesToDelete = [
              ...imagesToDelete,
              getProjectImagePublicID(image)
            ]
          })          

          imagesToDelete.length && deleteMedia(imagesToDelete);

          newProject = {
            ...newProject,
            mobileImages: existingMobileImages
          }
        }



        
        // If slug is changed: update image paths.
        if(project.slug !== projectToEdit.slug){
          const oldFolder = `projects/${projectToEdit.author.authorUsername}/${projectToEdit.slug}`;
          const newFolder = `projects/${projectToEdit.author.authorUsername}/${project.slug}`;         

          // Relocate Cloudinary folder then update project state.
          await relocateMedia( oldFolder, newFolder ).then(() => {
            newProject = {
              ...newProject,
              banner: newProject.banner.replace(oldFolder, newFolder),
              desktopImages: newProject.desktopImages.map(url => url.replace(oldFolder, newFolder)),
              mobileImages: newProject.mobileImages.map(url => url.replace(oldFolder, newFolder))
            }
          })
          .catch(error => {
            newPopUp({
              type: "error",
              description: `${error}`
            });
          });
        }


        // Finish update then go to the post.
        proclaimUpdated();
        
        await updateProject(newProject)
        .then((data: any) => {          
          setLoading(false);
            
          newPopUp({
            type: "success",
            description: "Project successfully updated."
          });
          
          goTo(`/project/${data.slug}`);
        })
        .catch((error) => {
          setLoading(false);
          
          newPopUp({
            type: "error",
            description: error.message
          });
        });


      } else { // Create a new project

        if (user && user._id) {      
          newProject = {
            ...newProject,
            author: {
              authorID: user._id,
              authorName: user.fullName,
              authorUsername: user.username,
            },
          }
        }

        
        // Keep generating a new slug until it is unique.
        const generateUniqueSlug = async (requestedSlug: string): Promise<string> => {
          let slug = requestedSlug;
          let isUnique = false;

          const generateRandomString = (length: number): string => {
            const characters = '0123456789';
            let randomString = '';
          
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              randomString += characters.charAt(randomIndex);
            }
          
            return randomString;
          };
          
          while (!isUnique) {
            const existingProject = await getProject(slug);
            if (!existingProject) {
              isUnique = true;
            } else { // If the slug already exists, append a random string to it.
              const randomString = generateRandomString(4);
              slug = `${requestedSlug}-${randomString}`;
            }
          }
        
          return slug;
        };

        // Update project slug.
        newProject = { ...newProject, slug: await generateUniqueSlug(newProject.slug) };


        // Store image URLs in project state.
        const storeImages = (key: string, imageArray: any, returnSingle: boolean = false) => {
          if (imageArray.length === 1 && Object.keys(imageArray[0]).length !== 0) {
            newProject = {
              ...newProject,
              [key]: !returnSingle ? [imageArray[0].secure_url] : imageArray[0].secure_url,
            };
          } else if (imageArray.length > 1 && Object.keys(imageArray[0]).length !== 0) {
            newProject = {
              ...newProject,
              [key]: imageArray.map((image: any) => image.secure_url),
            };
          }
        };

        
        // Upload media.
        await uploadMedia({currentBanner, currentDesktopImages, currentMobileImages}, `projects/${user?.username}/${newProject.slug}`).then(async data => {
          storeImages("banner", data.currentBanner, true);
          storeImages("desktopImages", data.currentDesktopImages);
          storeImages("mobileImages", data.currentMobileImages);
        })


        // Create the project then go to the post.
        await createProject(newProject)
          .then(data => {
            setLoading(false);
            
            newPopUp({
              type: "success",
              description: "Project successfully created."
            });
            
            goTo(`/project/${data.slug}`);
          })
          .catch((error) => {
            setLoading(false);
            
            newPopUp({
              type: "error",
              description: error.message
            });
          });       
      }
    }


    // Banner is required to continue.
    if (currentBanner.length) {
      user && bannerPass();
    } else {
      if (!existingBanner.length){
        setLoading(false);

        newPopUp({
          type: "error",
          description: "Banner image is required."
        });
      } else {
        user && bannerPass();
      }
    }    
  };

  const deleteThisProject = async () => {
    const projectID = projectToEdit._id;
    const projectMediaFolder = `projects/${projectToEdit.author.authorUsername}/${projectToEdit.slug}`;

    
    if (projectID) {
      setLoading(true);
      
      
      // Delete the project then go to projects dashboard.
      await deleteProject(projectID)
      .then(async () => {   
        await deleteMedia([], projectMediaFolder)
        .then(() => {
          setLoading(false);
        
          newPopUp({
            type: "success",
            description: "Project successfully deleted."
          });
          
          goTo("/admin/dashboard/projects");
        })
      })
      .catch((error) => {
        setLoading(false);        
        
        newPopUp({
          type: "error",
          description: error.message
        });
      });
    }    
  }
  
  return (
    <div className="p-admin-newProject">
      <Form.Root className="FormRoot priForm" onSubmit={handleSubmit}>
        {
          projectToEdit ?
          <h2 className="p-admin-newProject__heading">edit project</h2>
          :
          <h2 className="p-admin-newProject__heading">new project</h2>
        }
        <Form.Field className="FormField" name="title">
          <div className="FormFieldHeadline">
            <Form.Label className="FormLabel">Title</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a title
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              spellCheck="false"
              autoComplete="off"
              value={project.title}
              onChange={handleChange}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="slug">
          <div className="FormFieldHeadline">
            <Form.Label className="FormLabel">Slug</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a slug
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid slug
            </Form.Message>
          </div>
          <div className="p-admin-newProject--slugInput">
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                spellCheck="false"
                autoComplete="off"
                placeholder="..."
                value={project.slug}
                onChange={handleChange}
                required
              />
            </Form.Control>
            <span>project/</span>
            <Toggle.Root
              className="Toggle"
              aria-label="Toggle auto slug"
              pressed={autoSlug}
              onPressedChange={setAutoSlug}
            >
              Auto Slug
            </Toggle.Root>
          </div>
        </Form.Field>
        <div className="FormMultipleInputs">
          <Form.Field className="FormField" name="startDate">
            <div className="FormFieldHeadline">
              <Form.Label className="FormLabel">Start Date</Form.Label>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid date
              </Form.Message>
            </div>
            <DatePicker
              className="Input"
              selected={(project.dates.start as Date) || null}
              onChange={(date) => handleChange(date, "startDate")}
              selectsStart
              startDate={(project.dates.start as Date) || null}
              endDate={(project.dates.end as Date) || null}
              placeholderText="Keep empty if no dates..."
            />
          </Form.Field>
          <Form.Field className="FormField" name="endDate">
            <div className="FormFieldHeadline">
              <Form.Label className="FormLabel">End Date</Form.Label>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid date
              </Form.Message>
            </div>
            <DatePicker
              className="Input"
              selected={(project.dates.end as Date) || null}
              onChange={(date) => handleChange(date, "endDate")}
              selectsEnd
              startDate={(project.dates.start as Date) || null}
              endDate={(project.dates.end as Date) || null}
              minDate={(project.dates.start as Date) || null}
              placeholderText="Keep empty if ongoing..."
            />
          </Form.Field>
        </div>
        <div>
          <div className="FormFieldHeadline">
            <span className="FormLabel">Stack</span>
          </div>
          <div className="p-admin-newProject--stack">
            {currentStack &&
              currentStack.map(
                (tech: TechType) =>
                  tech.logo &&
                  tech.title && (
                    <div
                      className="p-admin-newProject--tech"
                      key={tech.title}
                      onClick={() => removeTech(tech)}
                    >
                      <Image
                        src={tech.logo}
                        alt={tech.title}
                        width={34}
                        height={34}
                      />
                      <span className="p-admin-newProject--techTooltip">
                        <i className="fa-solid fa-minus" />
                      </span>
                    </div>
                  )
              )}
            <AddTech
              onChange={(techList) => handleChange(techList, "stack")}
              techList={currentStack}
            >
              <button
                className="clearButton p-admin-newProject--addTech"
                type="button"
              >
                <i className="fa-solid fa-plus" />
              </button>
            </AddTech>
          </div>
        </div>
        <Form.Field className="FormField" name="description">
          <div className="FormFieldHeadline">
            <Form.Label className="FormLabel">Description</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a description
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid description
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="p-admin-newProject--textarea"
              spellCheck="false"
              autoComplete="off"
              value={project.description.text}
              onChange={handleChange}
              required
            />
          </Form.Control>
        </Form.Field>
        <div className="FormMultipleInputs">
          <Form.Field className="FormField" name="webLink">
            <div className="FormFieldHeadline">
              <Form.Label className="FormLabel">Website Link</Form.Label>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid website link
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                placeholder="https://..."
                spellCheck="false"
                autoComplete="off"
                value={project.description.webLink}
                onChange={handleChange}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="repLink">
            <div className="FormFieldHeadline">
              <Form.Label className="FormLabel">Repository Link</Form.Label>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid repository link
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                placeholder="https://..."
                spellCheck="false"
                autoComplete="off"
                value={project.description.repLink}
                onChange={handleChange}
              />
            </Form.Control>
          </Form.Field>
        </div>
        <div className="p-admin-newProject--tabs">
          <h1>Tabs</h1>
          <div className="p-admin-newProject--tab">
            <Form.Field className="FormField" name="tab1Title">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">
                  <div className="p-admin-newProject--tabNumber">1</div>
                  Headline
                </Form.Label>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid headline
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  value={project.tab1.title}
                  onChange={handleChange}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="tab1Text">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">
                  <div className="p-admin-newProject--tabNumber">1</div>
                  Content
                </Form.Label>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid content
                </Form.Message>
              </div>
              <Form.Control asChild>
                <textarea
                  className="p-admin-newProject--textarea"
                  spellCheck="false"
                  autoComplete="off"
                  value={project.tab1.text}
                  onChange={handleChange}
                />
              </Form.Control>
            </Form.Field>
          </div>
          <div className="p-admin-newProject--tab">
            <Form.Field className="FormField" name="tab2Title">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">
                  <div className="p-admin-newProject--tabNumber">2</div>
                  Headline
                </Form.Label>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid headline
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  value={project.tab2.title}
                  onChange={handleChange}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="tab2Text">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">
                  <div className="p-admin-newProject--tabNumber">2</div>
                  Content
                </Form.Label>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid content
                </Form.Message>
              </div>
              <Form.Control asChild>
                <textarea
                  className="p-admin-newProject--textarea"
                  spellCheck="false"
                  autoComplete="off"
                  value={project.tab2.text}
                  onChange={handleChange}
                />
              </Form.Control>
            </Form.Field>
          </div>
          <div className="p-admin-newProject--tab">
            <Form.Field className="FormField" name="tab3Title">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">
                  <div className="p-admin-newProject--tabNumber">3</div>
                  Headline
                </Form.Label>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid headline
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  value={project.tab3.title}
                  onChange={handleChange}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="tab3Text">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">
                  <div className="p-admin-newProject--tabNumber">3</div>
                  Content
                </Form.Label>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid content
                </Form.Message>
              </div>
              <Form.Control asChild>
                <textarea
                  className="p-admin-newProject--textarea"
                  spellCheck="false"
                  autoComplete="off"
                  value={project.tab3.text}
                  onChange={handleChange}
                />
              </Form.Control>
            </Form.Field>
          </div>
        </div>
        <div className="FormField">
          <div className="FormFieldHeadline">
            <label className="FormLabel">Images</label>
          </div>
          <div className="p-admin-newProject--images">
            <UploadMedia
              id="addBanner"
              label="Change Banner"
              updateLabel="Update Banner"
              className="p-admin-newProject--banner"
              existingFiles={projectToEdit && existingBanner}
              onExistingFileChange={setExistingBanner}
              files={currentBanner}
              onFileChange={setCurrentBanner}
            />

            <UploadMedia
              id="addDesktopImages"
              label="Change Desktop Images"
              updateLabel="Update Desktop Images"
              className="p-admin-newProject--desktopImages"
              existingFiles={projectToEdit && existingDesktopImages}
              onExistingFileChange={setExistingDesktopImages}
              files={currentDesktopImages}
              onFileChange={setCurrentDesktopImages}
              multiple
            />

            <UploadMedia
              id="addMobileImages"
              label="Change Mobile Images"
              updateLabel="Update Mobile Images"
              className="p-admin-newProject--mobileImages"
              existingFiles={projectToEdit && existingMobileImages}
              onExistingFileChange={setExistingMobileImages}
              files={currentMobileImages}
              onFileChange={setCurrentMobileImages}
              multiple
            />            
          </div>
        </div>
        <Form.Field className="FormField" name="tags">
          <div className="FormFieldHeadline">
            <Form.Label className="FormLabel">Tags</Form.Label>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid tag
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              spellCheck="false"
              autoComplete="off"
              placeholder="Separate with commas (,)"
              value={currentTags}
              onChange={handleChange}
            />
          </Form.Control>
        </Form.Field>
        <div className="SwitchBox p-admin-newProject--switch">
          <Switch.Root
            className="SwitchRoot"
            id="spotlight"
            name="spotlight"
            checked={project.spotlight}
            onCheckedChange={(e) => handleChange(e, "spotlight")}
          >
            <Switch.Thumb className="SwitchThumb" />
          </Switch.Root>
          <label className="Label" htmlFor="spotlight">
            Spotlight
          </label>
        </div>
        <div className="p-admin-newProject--buttons">
          <Form.Submit asChild>
            <button
              className={loading ? "priButton p-admin-newProject__submit loading" : "priButton p-admin-newProject__submit"}
              disabled={loading}
            >
              {
                projectToEdit ?
                "Update Project"
                :
                "Create Project"
              }
            </button>
          </Form.Submit>
          {
            projectToEdit &&
            <button
              type="button"
              className={loading ? "priButton p-admin-newProject__delete red loading" : "priButton p-admin-newProject__delete red"}
              disabled={loading}
              onClick={deleteThisProject}
            >
              Delete Project
            </button>
          }
        </div>
      </Form.Root>
    </div>
  );
};

export default Admin_NewProject;


export async function getServerSideProps(context: any) {
  const { query } = context;
  
  
  let projectToEdit;
  let projectToEditTechList;
  if (query.project){
    projectToEdit = await getProject(query.project);
    projectToEditTechList = await getSettings(`
    techs {
      title
      logo
    }
    `);
  }

  return {
    props: {
      projectToEdit: projectToEdit || null,
      projectToEditTechList: projectToEditTechList ? projectToEditTechList.techs : null,
    },
  };
}