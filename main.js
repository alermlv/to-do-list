const nameInputElement = document.querySelector(".task-name-input");
const descriptionInputElement = document.querySelector(".task-description-input");
const dateInputElement = document.querySelector(".task-date-input");
const addTaskFormElement = document.querySelector(".add-task-form");
const importantButtonElement = document.querySelector(".important-task-button"); 

let tasks = [];
let isImportantSelected = false;

document.addEventListener("DOMContentLoaded", () => {
  setTodayDay();
});

function createTaskObject() {
  return {
    id: generateId(),
    name: nameInputElement.value.trim(),
    description: descriptionInputElement.value.trim(),
    date: dateInputElement.value,
    isImportant: isImportantSelected,
    isCompleted: false,
  }
}

function generateId() {
  return Date.now().toString();
}

function setTodayDay() {
  const today = new Date().toISOString().split("T")[0];
  dateInputElement.value = today;
}

importantButtonElement.addEventListener("click", (event) => {
  isImportantSelected = !isImportantSelected;
  importantButtonElement.classList.toggle("active");
})

addTaskFormElement.addEventListener("submit", () => {
  const newTask = createTaskObject();
  addTask(newTask);
});

function addTask(task) {
  tasks.push(task);
  renderTask(task);
}

function renderTask(task) {
  let blockTitle;

  if (task.isCompleted) {
    blockTitle = "Completed";
  } else if (task.isImportant) {
    blockTitle = "Important";
  } else {
    blockTitle = formatDate(task.date);
  }
  
}

function formatDate(date) {
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
