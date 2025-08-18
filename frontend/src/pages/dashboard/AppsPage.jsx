import { useState, useEffect } from "react";
import { Table } from "../../components/Table/Table";
import RowActions from "../../components/Table/RowActions";
import app from "../../api/app";

export default function AppsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(data.length / pageSize);

  const currentPageData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await app.getAll();
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 mx-auto">
      <Table
        columns={columns}
        data={currentPageData}
        isLoading={loading}
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
  { header: "Name", accessor: "name" },
  { header: "Alias", accessor: "alias" },
  { header: "Url", accessor: "url" },
  {
    header: "Actions",
    accessor: "actions",
    cell: (row) => <RowActions row={row} />,
  },
];
