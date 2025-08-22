import { CircleCheck, CircleX } from "lucide-react";
import { RowActions } from "../../../components/Table/_components/RowActions";
import { Badge } from "../../../components/Badge";

export const columns = [
  { header: "Username", accessor: "username" },
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
