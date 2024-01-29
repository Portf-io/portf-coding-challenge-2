export const formatDate = (date: string) => {
  const createdAt = new Date(date);
  const formattedDate = createdAt.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};
