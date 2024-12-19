// handleCreateUser.ts
import { MRT_TableInstance } from 'material-react-table';
import { UsersTable } from '@/types/dashboards/UsersTable';

interface HandleCreateUserProps {
  values: UsersTable;
  table: MRT_TableInstance<UsersTable>;
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );


function validateUser(user: UsersTable) {
    return true
  }

const handleCreateUser = async ({
  values,
  table,
//   setValidationErrors,
}: HandleCreateUserProps) => {
    table.setCreatingRow(null);
};

export default handleCreateUser;