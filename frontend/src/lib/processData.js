export const processData = (data, filters) => {
  return data.filter((row) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const cellValue = row[key];
      return String(cellValue ?? "")
        .toLowerCase()
        .includes(value.toLowerCase());
    })
  );
};
