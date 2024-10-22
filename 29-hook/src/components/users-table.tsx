import axios from "axios";
import { Table } from "./table";
import React from "react";

interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface IReqResResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

interface IUsersTableProps {
  extend?: boolean;
  serverUrl: string;
}

export const UsersTable: React.FC<IUsersTableProps> = ({
  serverUrl,
  extend = false,
}) => {
  const [data, setData] = React.useState<IUser[]>();

  const fetchUsersList: () => Promise<IReqResResponse<IUser>> =
    React.useCallback(async () => {
      const response = await axios.get<IReqResResponse<IUser>>(serverUrl);
      return response.data;
    }, [serverUrl]);

  React.useEffect(() => {
    fetchUsersList().then((result) => setData(result.data));
  }, [fetchUsersList]);

  const headers: string[] = React.useMemo(() => {
    const list = ["id", "email", "fullname"];
    if (extend) list.push("firstname", "lastname");
    return list;
  }, [extend]);

  const rows: JSX.Element[][] = React.useMemo(() => {
    if (!data) return [[]];
    return data.map((user) => {
      const columns = [
        <p>{user.id}</p>,
        <p>{user.email}</p>,
        <p>
          {user.first_name} {user.last_name}
        </p>,
      ];
      if (extend)
        columns.push(<p>{user.first_name}</p>, <p>{user.last_name}</p>);
      return columns;
    });
  }, [data, extend]);

  return <Table headers={headers} rows={rows} />;
};
