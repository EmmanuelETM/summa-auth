import { useState } from "react";
import { Table } from "../../components/Table/Table";
import RowActions from "../../components/Table/RowActions";

const allData = [
  { name: "Alice", email: "alice@example.com", status: "Active", type: "user" },
  { name: "Bob", email: "bob@example.com", status: "Inactive", type: "admin" },
  {
    name: "Charlie",
    email: "charlie@example.com",
    status: "Active",
    type: "admin",
  },
  { name: "Eva", email: "eva@example.com", status: "Active", type: "user" },
];

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  {
    header: "Status",
    accessor: "status",
    cell: (row) => (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          row.status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    header: "Actions",
    accessor: "actions",
    cell: (row) => <RowActions row={row} />,
  },
];

const pageSize = 3;

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allData.length / pageSize);

  const currentPageData = allData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
