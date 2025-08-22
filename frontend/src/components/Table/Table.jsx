import { useState, useMemo } from "react";
import { TableHeader } from "./_components/TableHeader";
import { TableBody } from "./_components/TableBody";
import { TableControls } from "./_components/TableControls";
import { Pagination } from "./_components/Pagination";
import { processData } from "../../lib/processData";
import { tablePages } from "../../lib/tablePages";

export function Table({ columns, data, text, isLoading, setOpen, accessors }) {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return processData(data, filters);
  }, [data, filters]);

  const { totalPages, currentPageData } = tablePages(filteredData, currentPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="w-full">
        <TableControls
          text={text}
          filters={filters}
          setFilters={setFilters}
          accessors={accessors}
          onClick={() => setOpen(true)}
        />
        <div className="relative overflow-x-auto border border-zinc-200 rounded-xl">
          <table className="w-full min-w-[600px] text-left border-spacing-0">
            <TableHeader columns={columns} />
            <TableBody
              data={currentPageData}
              columns={columns}
              isLoading={isLoading}
            />
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </>
  );
}
