export function Filters({ filters, setFilters, accessors }) {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600";

  return (
    <div className="flex gap-2">
      {accessors.map((accessor) => (
        <input
          key={accessor}
          name={accessor}
          className={inputStyle}
          placeholder={accessor.charAt(0).toUpperCase() + accessor.slice(1)}
          type="text"
          value={filters[accessor] ?? ""}
          onChange={handleFilterChange}
        />
      ))}
    </div>
  );
}
