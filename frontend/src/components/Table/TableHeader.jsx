// components/Table/TableHeader.js
export default function TableHeader({ column }) {
  return (
    <th className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">
      {column.header}
    </th>
  );
}
