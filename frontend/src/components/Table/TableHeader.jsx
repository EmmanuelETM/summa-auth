export default function TableHeader({ column }) {
  return (
    <th className="px-4 py-3 font-semibold border-b bg-zinc-200 border-zinc-200 text-black whitespace-nowrap">
      {column.header}
    </th>
  );
}
