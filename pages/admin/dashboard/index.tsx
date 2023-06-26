// Essentials
import { useState } from 'react';
import { NextPage } from 'next';
import axios, { AxiosError } from 'axios'
import { useSession, signOut } from 'next-auth/react';

const Admin: NextPage = () => {
    const { data: session } = useSession();
    
    // Handle Input
    const [role, setRole] = useState<string>("");
    const [roleError, setRoleError] = useState<boolean>(false);

    const [fullName, setFullName] = useState<string>("");
    const [fullNameError, setFullNameError] = useState<boolean>(false);
    
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const [formLoading, setFormLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "role":
                setRole(value);
                setRoleError(false);
                break;
            case "fullName":
                setFullName(value);
                setFullNameError(false);
                break;
            case "email":
                setEmail(value);
                setEmailError(false);
                break;
            case "password":
                setPassword(value);
                setPasswordError(false);
                break;
            default:
                break;
        }
    }
  

    // Handle Submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regex = /\s{2,}/g;
        const cleanRole = role.replace(regex, ' ').trim();
        const cleanFullName = fullName.replace(regex, ' ').trim();
        const cleanEmail = email.replace(regex, ' ').trim();
        const cleanPassword = password.replace(regex, ' ').trim();

        // Error Check
        let isRole: boolean = false;

        if (role === "none" || !cleanRole) {
            isRole = false;
            setRoleError(true);
        } else {
            isRole = true;
        }

        

        let isFullName: boolean = false;
        if (cleanFullName === "" || email === undefined) {
            isFullName = false;

            setFullNameError(true);
        } else {
            isFullName = true;

            setFullNameError(false);
            setFullName(cleanFullName);
        }

        let isEmail: boolean = false;
        if (cleanEmail === "" || email === undefined) {
            isEmail = false;

            setEmailError(true);
        } else {
            isEmail = true;

            setEmailError(false);
            setEmail(cleanEmail);
        }

        let isPassword: boolean = false;
        if (cleanPassword === "" || password === undefined) {
            isPassword = false;

            setPasswordError(true);
        } else {
            isPassword = true;

            setPasswordError(false);
            setPassword(cleanPassword);
        }

        // Pass
        if (isRole && isFullName && isEmail && isPassword) {
            setFormLoading(true);

             const formData: object = {
                role,
                fullName,
                email,
                password
            }

            /* console.log(formData); */
            
            
            const apiRes = await axios.post("http://localhost:3000/api/auth/signup", formData)

            try {
                setFormLoading(true)

                if (apiRes?.data?.success) {
                    console.log("registered: ", email, password);
                }
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    console.log(errorMsg)
                }
            }
           
    
            setFormLoading(false);
        }

        
    }

    const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signOut();
    };

    const fillOut = () => {
        setRole("nothing");
        setFullName("asdasd");
        setEmail("asd@asd.asd");
        setPassword("asdasd")
    }
    const again = () => {
        setFormLoading(false);
    }    

    return (
    <div className="p-admin">
        {
            session ?
            <p>Logged In {session.user?.email}
                <button onClick={handleSignOut}>log out</button>
            </p>
            :
            <p>Not logged in</p>
        }
        {
            <>
            <button onClick={fillOut}>fill out</button>
            <button onClick={again}>again</button>
            </>
        }
        <form onSubmit={handleSubmit} className="p-admin__login priForm">
            <h1>new employee</h1>
            <select
                name="role"
                className={roleError ? "error" : ""}
                value={role}
                onChange={handleChange}
                disabled={formLoading}
            >
                <option value="none">select role</option>
                <option value="editor">editor</option>
                <option value="nothing">nothing</option>
                <option value="admin">admin</option>
            </select>
            <input
                className={fullNameError ? "error" : ""}
                type="text"
                name="fullName"
                spellCheck="false"
                autoComplete="off"
                placeholder="full name"
                value={fullName}
                onChange={handleChange}
                disabled={formLoading}
            />
            <input
                className={emailError ? "error" : ""}
                type="email"
                name="email"
                spellCheck="false"
                autoComplete="off"
                placeholder="email"
                value={email}
                onChange={handleChange}
                disabled={formLoading}
            />            
            <input
                className={passwordError ? "error" : ""}
                type="password"
                name="password"
                spellCheck="false"
                autoComplete="off"
                placeholder="password"
                value={password}
                onChange={handleChange}
                disabled={formLoading}
            />
            <button className={formLoading ? "priButton loading" : "priButton"} disabled={formLoading}>register</button>
        </form>
    </div>
  )
}

export default Admin