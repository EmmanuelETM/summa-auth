import { useState, useEffect } from "react";
import { Table } from "../../../components/Table/Table";
import user from "../../../api/user";
import { columns } from "./columns";
import { CreateUserDialog } from "../../../components/Dialog/Users/CreateUserDialog";
// import { EditUserDialog } from "../../../components/Dialog/Users/EditUserDialog";

export default function UsersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [error, data] = await user.getAll();
      if (!error) setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 mx-auto">
      <CreateUserDialog open={openCreate} setOpen={setOpenCreate} />
      {/* <EditUserDialog
        open={openEdit}
        setOpen={setOpenEdit}
        user={selectedUser}
      /> */}

      <Table
        text="User"
        columns={columns}
        data={data}
        isLoading={loading}
        setOpen={setOpenCreate}
        accessors={["username"]}
      />
    </div>
  );
}
