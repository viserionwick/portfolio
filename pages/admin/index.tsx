// Essentials
import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';

// Auth
import { getSession } from 'next-auth/react';
import { loginUser } from '../../utils/helpers/auth';
import { AxiosError } from 'axios';

// Context
import { usePopUpContext } from '../../contexts/popUpContext';

const AdminLogin: NextPage = () => {
    const { push: goTo } = useRouter();
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect");
    const { newPopUp } = usePopUpContext();
    

    
    // Handle Input
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const [formLoading, setFormLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
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
        const cleanEmail = email.replace(regex, ' ').trim();
        const cleanPassword = password.replace(regex, ' ').trim();

        // Error Check
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
        if (isEmail && isPassword) {
            try {
                setFormLoading(true);
    
                const loginRes = await loginUser({ email, password });
    
                if (loginRes && !loginRes.ok) {
                    loginRes.error &&
                    newPopUp({
                        type: "error",
                        description: loginRes.error
                    });
                }
                else {
                    if (redirect) {
                        goTo(redirect);
                    } else {
                        goTo("/admin/dashboard");
                    }
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    newPopUp({
                        type: "error",
                        description: `Something went wrong: ${errorMsg}`
                    });
                }
            }

            setFormLoading(false);
        }
    }


    // Login As Visitor
    const visitorLogin = async () => {
        try {
            setFormLoading(true);

            const visitorEmail: string = "visitor@viserionwick.com";
            const visitorPassword: string = "visitorpassword";

            const loginRes = await loginUser({ email: visitorEmail, password: visitorPassword });

            if (loginRes && !loginRes.ok) {
                loginRes.error &&
                newPopUp({
                    type: "error",
                    description: loginRes.error
                });
            }
            else {
                if (redirect) {
                    goTo(redirect);
                } else {
                    goTo("/admin/dashboard");
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMsg = error.response?.data?.error
                newPopUp({
                    type: "error",
                    description: `Something went wrong: ${errorMsg}`
                });
            }
        }

        setFormLoading(false);
    }

    return (
    <div className="p-admin">
        <form onSubmit={handleSubmit} className="p-admin__login priForm">
            <h1>dashboard</h1>
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
            <button
                className={formLoading ? "priButton loading" : "priButton"}
                disabled={formLoading}>login</button>
            <br/>
            <button
                className={formLoading ? "priButton inverted loading" : "priButton inverted"}
                disabled={formLoading}
                type="button"
                onClick={visitorLogin}
            >visit the dashboard</button>
        </form>
    </div>
  )
}

export default AdminLogin


// Check If Logged In
export async function getServerSideProps(context: any) {
    const session = await getSession(context);
  
    if (session) {
      return {
        redirect: {
          destination: '/admin/dashboard',
          permanent: false,
        },
      };
    }
  
    return {
      props: {},
    };
  }