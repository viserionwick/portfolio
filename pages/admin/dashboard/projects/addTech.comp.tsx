// Essentials
import { useEffect, useState } from "react";
import Image from "next/image";

// Context
import { useSettingsContext } from "../../../../contexts/settingsContext";
import { usePopUpContext } from "../../../../contexts/popUpContext";

// GraphQL
import { updateTechs } from "../../../../utils/services/settings";

// Hooks
import useCheckUser from "../../../../hooks/useCheckUser";
import useMedia from "../../../../hooks/useMedia";

// Components
import UploadMedia from "../components/UploadMedia";

// Types
import { TechType } from "../../../../utils/models/settings";

// UI Components
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as Form from "@radix-ui/react-form";
import { Cross2Icon } from "@radix-ui/react-icons";

export const defaultTech = {
  title: "",
  logo: "",
}

const AddTech: React.FC<{
  children: React.ReactNode,
  onChange: (
    techList: TechType[]
    ) => void,
  techList: TechType[],
  }> = ({ children, onChange, techList }) => {

  const [newUserDialog, setNewUserDialog] = useState<boolean>(false);
  const { newPopUp } = usePopUpContext();
  const settings = useSettingsContext();
  const allTechList = settings?.techs;
  
  const { isAuthorizedTo } = useCheckUser();
  const { uploadMedia } = useMedia();

  const [loading, setLoading] = useState<boolean>(false);
  const [searchBox, setSearchBox] = useState<string>("");
  const [searchTechList, setSearchTechList] = useState<TechType[] | undefined>(allTechList);
  const [techForm, setTechForm] = useState(defaultTech);
  const [currentLogo, setCurrentLogo] = useState<File[]>([]);
  const [canUpdateSettings, setCanUpdateSettings] = useState<boolean>(false);


  useEffect(() => {
    isAuthorizedTo(["updateSettings"])
    .then(async () => {
      setCanUpdateSettings(true);
    })
    .catch(() => {
      setCanUpdateSettings(false);
    })
  }, []);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      // Add New
      case "title":
        setTechForm({
          title: value,
          logo: techForm.logo,
        });
        break;

      case "logo":
        setTechForm({
          title: techForm.title,
          logo: value,
        });
        break;

      // Choose From List
      case "searchBox":
        setSearchBox(value);
        setSearchTechList(
          allTechList?.filter(
            (item) =>
              value === "" ||
              item.title.toLowerCase().includes(value.toLowerCase())
          )
        );
        break;

      default:
        break;
    }
  };



  
  const handleSubmit = (e: any, action?: string, selectedTechKey?: string) => {
    e && e.preventDefault();

    if (action === "save" && allTechList) {      
      
      if(!techForm.title) {
        newPopUp({
          type: "error",
          description: "Please add a title."
        });
      } else {
        if (allTechList.some(obj => obj.title.toLowerCase() === techForm.title.toLowerCase())) {
          newPopUp({
            type: "error",
            description: "This tech already exists."
          });          
        } else if (currentLogo.length === 0) {
          newPopUp({
            type: "error",
            description: "Please add a logo image."
          });
        } else {
          setLoading(true);

          let newTechForm = {...techForm};          

          if(canUpdateSettings) {
            uploadMedia({currentLogo}, "settings")
            .then(async data => {
              if (data) {
                if(data.currentLogo.length === 1) {
                  newTechForm = {
                    ...newTechForm,
                    logo: data.currentLogo[0].secure_url
                  }

                  const newStack = [...techList, newTechForm]
                
                  
                  updateTechs([newTechForm])
                  .then(() => {
                    onChange(newStack);
                    setNewUserDialog(false);
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.log(error);
                    
                    newPopUp({
                      type: "error",
                      description: error.message
                    }); 
                  })
                }
              } else {
                setLoading(false);
                newPopUp({
                  type: "error",
                  description: "An error occurred."
                }); 
                console.log(data);
              }
            })
          } else {
            newPopUp({
              type: "error",
              description: "Not Authorized."
            });
            setLoading(false);
          }
        }
      }

    } else if (action === "fromList") {

      if (allTechList && selectedTechKey) {
        if(techList.some(item => item.title === selectedTechKey)){ // Remove if exists
          
          const newStack = techList.filter((item: TechType) => item.title !== selectedTechKey);

          newStack.length === 0
          ? onChange([defaultTech])
          : onChange(newStack);


        } else { // Add new
          const selected = allTechList.filter((item: TechType) =>
            item.title.toLowerCase().includes(selectedTechKey.toLowerCase())
            )[0];

          // Remove default empty object
          const newStack = techList.filter(
            (tech) => tech.title !== "" && tech.logo !== ""
          );

          // Add if tech doesn't already exist
          !newStack.some((tech) => tech.title === selected.title)
          && newStack.push(selected);

          onChange(newStack);
        }
      }
    }
  };

  // Reset
  useEffect(() => {
    setTechForm(defaultTech);
    setSearchBox("");
    allTechList && setSearchTechList(allTechList);
    setCurrentLogo([]);

  }, [newUserDialog]);

  return (
    <Dialog.Root open={newUserDialog} onOpenChange={setNewUserDialog}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="p-admin-newTech DialogContent">
          <Dialog.Title className="DialogTitle">Choose Tech</Dialog.Title>
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                From list
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Add new
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
              <div className="p-admin-newTech--searchForm FormRoot priForm">
                <div className="priForm">
                  <div className="FormField">
                    <div>
                      <input
                        name="searchBox"
                        className="Input"
                        type="text"
                        spellCheck="false"
                        placeholder="Search..."
                        autoComplete="off"
                        value={searchBox}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="p-admin-newTech--list">
                  {
                    searchTechList && searchTechList.length != 0 ?
                    searchTechList.map((tech) => (
                      <button
                        key={tech.title}
                        className="p-admin-newTech--tech clearButton"
                        onClick={() =>
                          handleSubmit(undefined, "fromList", tech.title)
                        }
                      >
                        <div className="p-admin-newTech--techImage">
                          <Image
                            src={tech.logo}
                            alt="bruh"
                            width={34}
                            height={34}
                          />
                        </div>
                        <p className="p-admin-newTech--techName">
                          {tech.title}
                        </p>
                        {
                          techList.some(item => item.title === tech.title) &&
                          <i className="p-admin-newTech--techAdded fa-solid fa-check" />
                        }
                      </button>
                    ))
                    :
                    <div className="p-admin-newTech--noTechFound">No tech found.</div>
                  }
                </div>
              </div>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
                <Form.Root className="FormRoot priForm" onSubmit={handleSubmit}>
                  <div className="FormMultipleInputs">
                    <Form.Field className="FormField" name="title">
                      <div className="FormFieldHeadline">
                        <Form.Label className="FormLabel">Title</Form.Label>
                        <Form.Message
                          className="FormMessage"
                          match="valueMissing"
                        >
                          Please enter a title
                        </Form.Message>
                        <Form.Message
                          className="FormMessage"
                          match="typeMismatch"
                        >
                          Please provide a valid title
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input
                          className="Input"
                          type="text"
                          spellCheck="false"
                          placeholder="React"
                          autoComplete="off"
                          value={techForm.title}
                          onChange={handleChange}
                          required
                        />
                      </Form.Control>
                    </Form.Field>
                    <div className="FormField">
                      <div className="FormFieldHeadline">
                        <label className="FormLabel">Logo</label>
                      </div>
                      <UploadMedia
                        id="addLogo"
                        label="Choose image..."
                        className="p-admin-newProject--banner"
                        files={currentLogo}
                        onFileChange={setCurrentLogo}
                        inline
                      />
                    </div>
                  </div>
                  <div className="FormMultipleInputs">
                    <button
                      className={
                        loading
                        ? "priButton fullWidth loading"
                        : "priButton fullWidth"
                      }
                      onClick={(e) => handleSubmit(e, "save")}
                      disabled={loading}
                    >
                      Save
                    </button>
                  </div>
                </Form.Root>
              </Tabs.Content>
          </Tabs.Root>

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddTech;
