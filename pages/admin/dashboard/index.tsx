// Essentials
import { NextPage } from 'next';
import Link from 'next/link';

// Types
import { ISessionUser } from "../../../utils/models/user";

// Auth
import { useSession, signOut } from 'next-auth/react';

const Admin: NextPage = () => {
    const { data: session } = useSession() as { data: ISessionUser | null };
    const user = session?.user;

    const newInbox: boolean = false;
    
    return (
    <div className="p-admin">
        <div className="p-admin__profile">
            <i className="fa-solid fa-circle-user"/>
            <p>{user?.fullName}</p>
            <button className='secButton' onClick={() => signOut()}>LOGOUT</button>
        </div>
        <div className="p-admin__menu">
            <Link href="/admin/dashboard/projects" className='p-admin__menu__item'>
                <i className="fa-solid fa-book" />
                <p>Projects</p>
            </Link>
            <Link href="/admin/dashboard/users" className='p-admin__menu__item'>
                <i className="fa-solid fa-users" />
                <p>Users</p>
            </Link>
            <Link href="/admin/dashboard/contacts" className='p-admin__menu__item'>
                <i className="fa-solid fa-envelope" />
                <p>Inbox</p>
                {newInbox && <span className='p-admin__menu__inboxNotification' />}
            </Link>
            <Link href="/admin/dashboard/settings" className='p-admin__menu__item'>
                <i className="fa-solid fa-gear" />
                <p>Settings</p>
            </Link>
        </div>
    </div>
  )
}

export default Admin;