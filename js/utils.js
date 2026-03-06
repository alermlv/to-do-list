export function generateId() {
  return crypto.randomUUID();
}

export function formatDate(date) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const selectedDate = new Date(date);

  if (selectedDate.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (selectedDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}
