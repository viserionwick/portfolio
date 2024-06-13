// Essentials
import { NextPage } from 'next';
import { UnderConstruction } from '../../../../components';

// Utils
/* import { checkUserPermissions } from '../../../../utils/helpers/checkUser'; */

// Components
import Table from '../../../../components/ui/Table';
import AddUser from './addUser.comp';

import fakeData from "./MOCK_DATA.json";


const Admin_Users: NextPage = () => {

  const tableData = {
    columns: [
      {
          Header: "Full Name",
          accessor: "first_name",
      },
      {
          Header: "Email",
          accessor: "email",
      },
      {
          Header: "Role",
          accessor: "gender",
      }
    ],
    data: fakeData,
  }


  return (
    <div className="p-admin-users">
      {/* <AddUser>
        <button className="p-admin-users__addUser priButton">Add User</button>
      </AddUser>

      <Table content={tableData} editable/> */}

      <UnderConstruction />
    </div>
  );
};

export default Admin_Users;


/* export async function getServerSideProps(context: any) {
  try {
    await checkUserPermissions(["readUser", "visitor"], context.req, true);
  } catch (error) {
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
} */