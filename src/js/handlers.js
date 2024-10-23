import { addList, deleteList, doneList, editList, updateTaskTotal } from "./list.js";
import { listGroup, taskInput } from "./selectors.js";

export const listGroupHandler = (event) => {
    const list = event.target.closest(".list");
    if (event.target.classList.contains("list-del-btn")) {
        deleteList(event.target.closest(".list").id);
    };

    if (event.target.classList.contains("list-edit-btn")) {
        editList(event.target.closest(".list").id);
    };

    if (event.target.classList.contains("list-done-check")) {
        doneList(event.target.closest(".list").id);
    };
}

export const addTaskBtnHandler = () => {
    if (taskInput.value.trim()) {
        addList(taskInput.value)
    } else {
        alert("You must input a task");
    }
}

export const taskInputHandler = (event) => {
    if (event.key === "Enter") {
        if (taskInput.value.trim()) {
            addList(taskInput.value);
        } else {
            alert("You must input a task");
        }
    }
}

export const deleteAllHandler = () => {
    if (window.confirm("Are you sure to delete all lists?")) {
        const allLists = listGroup.querySelectorAll(".list");
        allLists.forEach((list) => list.remove());
        updateTaskTotal();
    }
}

export const doneAllHandler = () => {
    if (window.confirm("Are you sure to done all lists")) {
        const allLists = document.querySelectorAll(".list");
        allLists.forEach((list) => {
            list.querySelector(".list-done-check").checked = true;
            doneList(list.id);
        })
    }
}