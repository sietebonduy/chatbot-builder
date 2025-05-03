export const isBlank = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)
  );
};

export const present = (value: any): boolean => {
  return !isBlank(value);
};
