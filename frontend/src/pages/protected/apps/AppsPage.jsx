import { useState, useEffect } from "react";
import { Table } from "../../../components/Table/Table";
import app from "../../../api/app";
import { columns } from "./columns";
import { CreateAppDialog } from "../../../components/Dialog/apps/CreateAppDialog";

export default function AppsPage() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [error, data] = await app.getAll();

      if (error) {
        console.log(error);
      }

      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 mx-auto">
      <CreateAppDialog open={open} setOpen={setOpen} />
      <Table
        text={"App"}
        columns={columns}
        data={data}
        setOpen={setOpen}
        isLoading={loading}
        accessors={["alias"]}
      />
    </div>
  );
}
