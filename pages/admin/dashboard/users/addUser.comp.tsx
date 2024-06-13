// Essentials
import { useEffect, useState } from "react";
import axios from "axios";

// Utils
import { AUTH_API_ENDPOINT } from "../../../../utils/veriables";

// Context
import { usePopUpContext } from "../../../../contexts/popUpContext";

// UI Components
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as Form from "@radix-ui/react-form";
import {
  Cross2Icon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const AddUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [newUserDialog, setNewUserDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { newPopUp } = usePopUpContext();

  const defaultFormData = {
    role: "",
    fullName: "",
    email: "",
    password: "",
  }
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    setFormData(defaultFormData);
  }, [newUserDialog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "fullName":
        setFormData({
          ...formData,
          fullName: value,
        });
        break;
      case "email":
        setFormData({
          ...formData,
          email: value,
        });
        break;
      case "password":
        setFormData({
          ...formData,
          password: value,
        });
        break;
      default:
        break;
    }
  };

  const handleSelect = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const apiRes = await axios.post(`${AUTH_API_ENDPOINT}/signup`, formData);

      if (apiRes?.data?.success) {
        newPopUp({
          type: "success",
          description: "User has been successfully created!",
        });

        setNewUserDialog(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.error;

        if (errorMsg) {
          newPopUp({
            type: "error",
            description: errorMsg,
          });
        } else {
          newPopUp({
            type: "error",
            description: `Something went wrong: ${error.message}`,
          });
        }
      }
    }

    setLoading(false);
  };

  return (
    <Dialog.Root open={newUserDialog} onOpenChange={setNewUserDialog}>
      <Dialog.Trigger asChild>
        { children }
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">New User</Dialog.Title>
          <Form.Root className="FormRoot priForm" onSubmit={handleSubmit}>
            <Form.Field className="FormField" name="role">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">Role</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter a role
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid role
                </Form.Message>
              </div>
              <Form.Control asChild>
                <Select.Root
                  name="role"
                  value={formData.role}
                  onValueChange={handleSelect}
                >
                  <Select.Trigger className="SelectTrigger" aria-label="Role">
                    <Select.Value placeholder="Select a role…" />
                    <Select.Icon className="SelectIcon">
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="SelectContent">
                      <Select.ScrollUpButton className="SelectScrollButton">
                        <ChevronUpIcon />
                      </Select.ScrollUpButton>
                      <Select.Viewport className="SelectViewport">
                        <Select.Group>
                          <Select.Label className="SelectLabel">
                            Roles
                          </Select.Label>
                          <Select.Item value="admin" className="SelectItem">
                            <Select.ItemText>Admin</Select.ItemText>
                            <Select.ItemIndicator className="SelectItemIndicator">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item value="editor" className="SelectItem">
                            <Select.ItemText>Editor</Select.ItemText>
                            <Select.ItemIndicator className="SelectItemIndicator">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="vip"
                            className="SelectItem"
                            disabled
                          >
                            <Select.ItemText>VIP</Select.ItemText>
                            <Select.ItemIndicator className="SelectItemIndicator">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton className="SelectScrollButton">
                        <ChevronDownIcon />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="fullName">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">Full Name</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter a full name
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid full name
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="email">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">Email</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter an email
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid email
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="email"
                  spellCheck="false"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="password">
              <div className="FormFieldHeadline">
                <Form.Label className="FormLabel">Password</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter a password
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid password
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <div className="FormSubmit">
                <button
                  className={loading ? "priButton loading" : "priButton"}
                  disabled={loading}
                >
                  Create
                </button>
              </div>
            </Form.Submit>
          </Form.Root>
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

export default AddUser;
