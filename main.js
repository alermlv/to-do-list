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
    isComplete: false,
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
  const task = createTaskObject();
  tasks.push(task);
});


