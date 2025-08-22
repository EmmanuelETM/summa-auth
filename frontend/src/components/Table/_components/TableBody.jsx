import { Loading } from "../../Loading";
import { TableRow } from "./TableRow";

export const TableBody = ({
  columns,
  data,
  isLoading,
  emptyText = "No data available.",
}) => {
  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan={999} className="text-center py-4">
            <Loading />
          </td>
        </tr>
      ) : data.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="py-4 text-center text-gray-500"
          >
            {emptyText}
          </td>
        </tr>
      ) : (
        data.map((row, idx) => (
          <TableRow key={idx} columns={columns} row={row} />
        ))
      )}
    </tbody>
  );
};
