// SELECTORS
const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const listGroup = document.querySelector("#listGroup");
const taskTotal = document.querySelector("#taskTotal");
const doneTaskTotal = document.querySelector("#doneTaskTotal");
const deleteAll = document.querySelector("#deleteAll");
const doneAll = document.querySelector("#doneAll");
const listTemplate = document.querySelector("#listTemplate");

// ACTIONS (BUSINESS LOGIC)
const updateTaskTotal = () => {
    // count list and update
    const lists = document.querySelectorAll(".list");
    taskTotal.innerText = lists.length;
}

const updateDoneTaskTotal = () => {
    // count done list and update
    const lists = document.querySelectorAll(".list input:checked");
    doneTaskTotal.innerText = lists.length;
}

const createNewList = (currentTask) => {
    const list = listTemplate.content.cloneNode(true);
    list.querySelector(".list").id = "list" + Date.now();
    list.querySelector(".list-task").innerText = currentTask;
    return list;
}

const deleteList = (listId) => {
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

const editList = (listId) => {
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

const doneList = (listId) => {
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

const addList = (text) => {
    listGroup.append(createNewList(text)); // mount list to list group
    taskInput.value = null;
    updateTaskTotal();
}

// HANDLERS
const listGroupHandler = (event) => {
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

const addTaskBtnHandler = () => {
    if (taskInput.value.trim()) {
        addList(taskInput.value)
    } else {
        alert("You must input a task");
    }
}

const taskInputHandler = (event) => {
    if (event.key === "Enter") {
        if (taskInput.value.trim()) {
            addList(taskInput.value);
        } else {
            alert("You must input a task");
        }
    }
}

const deleteAllHandler = () => {
    if (window.confirm("Are you sure to delete all lists?")) {
        const allLists = listGroup.querySelectorAll(".list");
        allLists.forEach((list) => list.remove())
    }
}

const doneAllHandler = () => {
    if (window.confirm("Are you sure to done all lists")) {
        const allLists = document.querySelectorAll(".list");
        allLists.forEach((list) => {
            list.querySelector(".list-done-check").checked = true;
            doneList(list.id);
        })
    }
}

// LISTENERS
addTaskBtn.addEventListener("click", addTaskBtnHandler);
taskInput.addEventListener("keyup", taskInputHandler);
listGroup.addEventListener("click", listGroupHandler);
deleteAll.addEventListener("click", deleteAllHandler);
doneAll.addEventListener("click", doneAllHandler);