import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { Pagination } from "./Pagination";

export function Table({
  columns,
  data,
  isLoading,
  emptyText = "No data available.",
  pagination,
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <TableHeader key={col.accessor} column={col} />
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 text-center text-gray-500"
              >
                Loading...
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
      </table>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          goToPage={pagination.goToPage}
        />
      )}
    </div>
  );
}
