const pageSize = 10;

export const tablePages = (data, currentPage) => {
  const totalPages = Math.ceil(data.length / pageSize);

  const currentPageData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    totalPages,
    currentPageData,
  };
};
