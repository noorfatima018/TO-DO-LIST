const inputbox = document.getElementById("inputbox");
const addbtn = document.getElementById("addbtn");
const todolist = document.getElementById("todolist");
const clearAllBtn = document.getElementById("clearall");

let isEditMode = false;
let itemToEdit = null;

// Load saved todos from local storage
window.onload = () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(text => createTodoItem(text));
};

// Save to local storage
const saveToLocalStorage = () => {
    const todos = [];
    todolist.querySelectorAll("li p").forEach(p => {
        todos.push(p.innerText);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Create a new todo item
const createTodoItem = (text) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerText = text;
    li.appendChild(p);

    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Remove";
    li.appendChild(deletebtn);

    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    li.appendChild(editbtn);

    todolist.appendChild(li);
};

// Add or Edit functionality
const handleAddOrEdit = () => {
    const inputtext = inputbox.value.trim();
    if (inputtext.length <= 0) {
        alert("You must write something in your to-do");
        return;
    }

    if (isEditMode && itemToEdit) {
        itemToEdit.querySelector("p").innerText = inputtext;
        inputbox.value = "";
        addbtn.innerText = "Add";
        isEditMode = false;
        itemToEdit = null;
    } else {
        createTodoItem(inputtext);
        inputbox.value = "";
    }

    saveToLocalStorage();
};

// Handle clicks on Edit and Remove buttons
const updatetodo = (e) => {
    if (e.target.tagName === "BUTTON") {
        const li = e.target.parentElement;

        if (e.target.innerText === "Remove") {
            todolist.removeChild(li);
            saveToLocalStorage();
        }

        if (e.target.innerText === "Edit") {
            const p = li.querySelector("p");
            inputbox.value = p.innerText;
            isEditMode = true;
            itemToEdit = li;
            addbtn.innerText = "Edit";  // Change button label
        }
    }
};

// Clear all items
const clearAll = () => {
    todolist.innerHTML = "";
    localStorage.removeItem("todos");
    inputbox.value = "";
    addbtn.innerText = "Add";
    isEditMode = false;
    itemToEdit = null;
};

// Event Listeners
addbtn.addEventListener("click", handleAddOrEdit);
todolist.addEventListener("click", updatetodo);
clearAllBtn.addEventListener("click", clearAll);
inputbox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleAddOrEdit();
    }
});
