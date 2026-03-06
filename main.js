const nameInputElement = document.querySelector(".task-name-input");
const descriptionInputElement = document.querySelector(".task-description-input");
const dateInputElement = document.querySelector(".task-date-input");

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
