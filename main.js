const nameInputElement = document.querySelector(".task-name-input");
const descriptionInputElement = document.querySelector(".task-description-input");
const dateInputElement = document.querySelector(".task-date-input");
const addTaskFormElement = document.querySelector(".add-task-form");
const importantButtonElement = document.querySelector(".important-task-button");
const tasksSection = document.querySelector(".tasks-section");

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

addTaskFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
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

  const tasksList = getOrCreateTasksBlock(blockTitle);

  const taskItem = createTaskItem(task);

  tasksList.appendChild(taskItem);
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

function getOrCreateTasksBlock(title) {
  let block = document.querySelector(`[data-block="${title}"]`);
  
  if (!block) {
    block = document.createElement("div");
    block.classList.add("tasks-block");
    block.dataset.block = title;

    const heading = document.createElement("div");
    heading.classList.add("tasks-block__title");
    heading.textContent = title;

    const list = document.createElement("ul");
    list.classList.add("tasks-block__list");

    block.appendChild(heading);
    block.appendChild(list);
    tasksSection.appendChild(block);
  }

  return block.querySelector(".tasks-block__list");
}

function createTaskItem(task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.dataset.id = task.id;

  if (task.isCompleted) {
    taskItem.classList.add("task-item--completed");
  }

  taskItem.innerHTML = `
    <button type="button" class="button button--checkbox complete-task-button" aria-label="Complete task">
      <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6016 0C10.8203 0 11.0234 0.0390625 11.2109 0.117188C11.3984 0.195312 11.5651 0.307292 11.7109 0.453125C11.8568 0.598958 11.9661 0.763021 12.0391 0.945312C12.112 1.1276 12.1536 1.33333 12.1641 1.5625C12.1641 1.77083 12.125 1.97135 12.0469 2.16406C11.9688 2.35677 11.8568 2.52604 11.7109 2.67188L5.50781 8.88281C5.36198 9.02865 5.19271 9.14062 5 9.21875C4.80729 9.29688 4.60677 9.33854 4.39844 9.34375C4.1901 9.34375 3.98958 9.30469 3.79688 9.22656C3.60417 9.14844 3.4349 9.03385 3.28906 8.88281L0.460938 6.05469C0.315104 5.90885 0.203125 5.73958 0.125 5.54688C0.046875 5.35417 0.00520833 5.15365 0 4.94531C0 4.72656 0.0416667 4.52344 0.125 4.33594C0.208333 4.14844 0.320312 3.98177 0.460938 3.83594C0.601562 3.6901 0.765625 3.58073 0.953125 3.50781C1.14062 3.4349 1.34635 3.39323 1.57031 3.38281C1.77865 3.38281 1.97917 3.42188 2.17188 3.5C2.36458 3.57812 2.53385 3.6901 2.67969 3.83594L4.39844 5.55469L9.49219 0.453125C9.63802 0.307292 9.80729 0.195312 10 0.117188C10.1927 0.0390625 10.3932 0 10.6016 0Z" fill="currentColor"/>
      </svg>
    </button>
    <div class="task-item__content">
      <div class="task-item__name">${task.name}</div>
      ${task.description ? `<div class="task-item__description">${task.description}</div>` : ""}
    </div>
    <button type="button" class="button button--icon delete-task-button" aria-label="Delete task">
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 18C2.45 18 1.97934 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3C0.71667 3 0.479337 2.904 0.288004 2.712C0.0966702 2.52 0.000670115 2.28267 3.44827e-06 2C-0.000663218 1.71733 0.0953369 1.48 0.288004 1.288C0.48067 1.096 0.718003 1 1 1H5C5 0.716667 5.096 0.479333 5.288 0.288C5.48 0.0966668 5.71734 0.000666667 6 0H10C10.2833 0 10.521 0.0960001 10.713 0.288C10.905 0.48 11.0007 0.717333 11 1H15C15.2833 1 15.521 1.096 15.713 1.288C15.905 1.48 16.0007 1.71733 16 2C15.9993 2.28267 15.9033 2.52033 15.712 2.713C15.5207 2.90567 15.2833 3.00133 15 3V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM13 3H3V16H13V3ZM6.713 13.713C6.90434 13.521 7 13.2833 7 13V6C7 5.71667 6.904 5.47933 6.712 5.288C6.52 5.09667 6.28267 5.00067 6 5C5.71734 4.99933 5.48 5.09533 5.288 5.288C5.096 5.48067 5 5.718 5 6V13C5 13.2833 5.096 13.521 5.288 13.713C5.48 13.905 5.71734 14.0007 6 14C6.28267 13.9993 6.52034 13.9043 6.713 13.713ZM10.713 13.712C10.9043 13.5213 11 13.284 11 13V6C11 5.71667 10.904 5.47933 10.712 5.288C10.52 5.09667 10.2827 5.00067 10 5C9.71734 4.99933 9.48 5.09533 9.288 5.288C9.096 5.48067 9 5.718 9 6V13C9 13.2833 9.096 13.521 9.288 13.713C9.48 13.905 9.71734 14.0007 10 14C10.2827 13.9993 10.5203 13.9033 10.713 13.712Z" fill="currentColor"/>
      </svg>
    </button>
  `;

  return taskItem;
}
