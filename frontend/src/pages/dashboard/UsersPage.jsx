import { useState, useEffect } from "react";
import { Table } from "../../components/Table/Table";
import RowActions from "../../components/Table/RowActions";
import user from "../../api/user";
import { Badge } from "../../components/badge";
import { CircleCheck, CircleX } from "lucide-react";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const totalPages = Math.ceil(data.length / pageSize);

  const currentPageData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    async function fetchData() {
      const response = await user.getAll();
      setData(response);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 mx-auto">
      <Table
        columns={columns}
        data={currentPageData}
        isLoading={false}
        pagination={{
          currentPage,
          totalPages,
          goToPage: (page) => {
            if (page >= 1 && page <= totalPages) {
              setCurrentPage(page);
            }
          },
        }}
      />
    </div>
  );
}

const pageSize = 10;

const columns = [
  { header: "Name", accessor: "username" },
  { header: "Email", accessor: "email" },
  {
    header: "Enabled",
    accessor: "enabled",
    cell: (row) => {
      const isEnabled = row.enabled === 1;
      return (
        <Badge
          text={isEnabled ? "Active" : "Inactive"}
          color={isEnabled ? "green" : "red"}
          Icon={isEnabled ? CircleCheck : CircleX}
        />
      );
    },
  },
  {
    header: "Actions",
    accessor: "actions",
    cell: (row) => <RowActions row={row} />,
  },
];
