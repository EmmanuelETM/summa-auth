export function TableHeader({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            key={col.header}
            className="px-4 py-3 font-semibold border-b bg-zinc-200 border-zinc-200 text-black whitespace-nowrap"
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
