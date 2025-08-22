export function TableRow({ columns, row }) {
  return (
    <tr className="hover:bg-gray-100 border-b text-left border-zinc-200 last:border-transparent transition">
      {columns.map((col) => (
        <td key={col.accessor} className="px-4 py-3 whitespace-nowrap">
          {col.cell ? col.cell(row) : row[col.accessor]}
        </td>
      ))}
    </tr>
  );
}
