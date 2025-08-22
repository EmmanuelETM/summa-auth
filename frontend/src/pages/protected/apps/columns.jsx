import { RowActions } from "../../../components/Table/_components/RowActions";

export const columns = [
  { header: "Name", accessor: "name" },
  { header: "Alias", accessor: "alias" },
  { header: "Url", accessor: "url" },
  {
    header: "Actions",
    accessor: "actions",
    cell: (row) => <RowActions row={row} />,
  },
];
