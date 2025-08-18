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
    <div className="w-full">
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full min-w-[600px] text-left border-spacing-0">
          <thead>
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
      </div>

      {/* Pagination below */}
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
