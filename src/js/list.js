import { doneTaskTotal, listGroup, listTemplate, taskInput, taskTotal } from "./selectors.js";

export const updateTaskTotal = () => {
    const lists = document.querySelectorAll(".list");
    taskTotal.innerText = lists.length;
}

export const updateDoneTaskTotal = () => {
    const lists = document.querySelectorAll(".list input:checked");
    doneTaskTotal.innerText = lists.length;
}

export const createNewList = (currentTask) => {
    const list = listTemplate.content.cloneNode(true);
    list.querySelector(".list").id = "list" + Date.now();
    list.querySelector(".list-task").innerText = currentTask;
    return list;
}

export const deleteList = (listId) => {
    const currentList = document.querySelector(`#${listId}`);
    if (window.confirm("Are you sure to delete?")) {
        currentList.classList.add("animate__animated", "animate__hinge");
        currentList.addEventListener("animationend", () => {
            currentList.remove();
            updateTaskTotal();
            updateDoneTaskTotal();
        })
    }
}

export const editList = (listId) => {
    const currentList = document.querySelector(`#${listId}`);
    const listDoneCheck = currentList.querySelector(".list-done-check");
    const listTask = currentList.querySelector(".list-task");
    const listEditBtn = currentList.querySelector(".list-edit-btn");
    listEditBtn.setAttribute("disabled", true);
    listDoneCheck.setAttribute("disabled", true);
    const currentTask = listTask.innerText;
    const newTaskInput = document.createElement("input");
    newTaskInput.className = "border border-stone-950 px-2 py-1 font-mono w-[180px] focus-visible:outline-none";
    newTaskInput.value = currentTask;
    listTask.after(newTaskInput);
    newTaskInput.focus();
    listTask.classList.add("hidden");

    newTaskInput.addEventListener("blur", () => {
        listEditBtn.removeAttribute("disabled");
        listDoneCheck.removeAttribute("disabled");
        listTask.innerText = newTaskInput.value;
        listTask.classList.remove("hidden");
        newTaskInput.remove();
    })
}

export const doneList = (listId) => {
    const currentList = document.querySelector(`#${listId}`);
    const listDoneCheck = currentList.querySelector(".list-done-check");
    const listTask = currentList.querySelector(".list-task");
    const listDelBtn = currentList.querySelector(".list-del-btn");
    const listEditBtn = currentList.querySelector(".list-edit-btn");

    updateDoneTaskTotal();
    listTask.classList.toggle("line-through");
    currentList.classList.toggle("duration-200");
    currentList.classList.toggle("opacity-20");
    currentList.classList.toggle("scale-90");
    if (listDoneCheck.checked) {
        listEditBtn.setAttribute("disabled", true);
    } else {
        listEditBtn.removeAttribute("disabled");
    }

    updateDoneTaskTotal();

}

export const addList = (text) => {
    listGroup.append(createNewList(text));
    taskInput.value = null;
    updateTaskTotal();
}