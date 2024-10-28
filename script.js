const form = document.querySelector("form");
const createBar = document.getElementById("create-bar");
const btnCreate = document.getElementById("btn-create");
const taskContainer = document.getElementById("task-container");
const woTasks = document.getElementById("wo-tasks");
const createdStatus = document.getElementById("created-status");
const concludedStatus = document.getElementById("concluded-status");

btnCreate.addEventListener("click", function (event) {
  event.preventDefault();
  addNewTask(createBar.value);
});

function addNewTask(taskText) {
  try {
    const task = document.createElement("div");
    task.classList.add("task", "flex");

    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper", "flex");

    const taskCircleIcon = document.createElement("img");
    taskCircleIcon.classList.add("tasks-icon", "circle");
    taskCircleIcon.setAttribute("src", "./assets/icons/CircleRegular.svg");

    const taskPara = document.createElement("p");
    taskPara.innerHTML = `${taskText}`;
    taskPara.id = "task-p";

    const taskTrashIcon = document.createElement("img");
    taskTrashIcon.classList.add("tasks-icon", "trash");
    taskTrashIcon.setAttribute("src", "./assets/icons/TrashRegular.svg");

    taskWrapper.append(taskCircleIcon, taskPara);
    task.append(taskWrapper, taskTrashIcon);
    taskContainer.append(task);

    clearForm();

    if (taskContainer.childElementCount === 1) {
      woTasks.classList.remove("flex");
      woTasks.classList.add("hidden");
    } else {
    }

    createdStatus.innerHTML = `${taskContainer.childElementCount}`;

    addRemoveFunc(task, taskTrashIcon);
    addCompleteFunc(task, taskCircleIcon, taskPara, taskText);
  } catch (error) {}
}

function clearForm() {
  createBar.value = "";
}

function addRemoveFunc(task, taskTrashIcon) {
  taskTrashIcon.addEventListener("click", function () {
    taskContainer.removeChild(task);
    createdStatus.innerHTML = `${taskContainer.childElementCount}`;
    concludedStatus.innerHTML =
      document.getElementsByClassName("task-concluded").length;
    if (taskContainer.children.length === 0) {
      woTasks.classList.remove("hidden");
      woTasks.classList.add("flex");
    }
  });
}

function addCompleteFunc(task, taskCircleIcon, taskPara, taskText) {
  taskCircleIcon.addEventListener("click", function () {
    task.classList.toggle("task-concluded");
    concludedStatus.innerHTML =
      document.getElementsByClassName("task-concluded").length;
    if (task.classList.contains("task-concluded")) {
      taskPara.innerHTML = `<s>${taskText}</s>`;
      taskCircleIcon.src = "./assets/icons/CheckCircleFill.svg";
    } else if (!task.classList.contains("task-concluded")) {
      taskPara.innerHTML = `${taskText}`;
      taskCircleIcon.src = "./assets/icons/CircleRegular.svg";
      concludedStatus.innerHTML =
        document.getElementsByClassName("task-concluded").length;
    }
  });
}
