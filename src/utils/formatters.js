export function formatDate(dob) {
  const date = new Date(dob);
  return date.toLocaleDateString("en-IN");
}
