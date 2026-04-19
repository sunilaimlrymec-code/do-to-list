let tasks = [];

// Load tasks when page opens
window.onload = function () {
let storedTasks = localStorage.getItem("tasks");


if (storedTasks) {
    tasks = JSON.parse(storedTasks);
}

displayTasks();


};

// Add new task
function addTask() {
let input = document.getElementById("taskInput");
let text = input.value.trim();


if (text === "") return;

let task = {
    text: text,
    completed: false
};

tasks.push(task);
saveTasks();
displayTasks();

input.value = "";


}

// Display all tasks
function displayTasks() {
let list = document.getElementById("taskList");
list.innerHTML = "";


tasks.forEach((task, index) => {
    let li = document.createElement("li");

    // TEXT
    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
        span.classList.add("completed");
    }

    // Toggle complete
    span.onclick = function () {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        displayTasks();
    };

    // EDIT button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function (e) {
        e.stopPropagation();

        let newText = prompt("Edit your task:", task.text);

        if (newText !== null && newText.trim() !== "") {
            tasks[index].text = newText.trim();
            saveTasks();
            displayTasks();
        }
    };

    // DELETE button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.onclick = function (e) {
        e.stopPropagation();
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    };

    // ✅ Append in correct order
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
});

console.log("Tasks:", tasks);


}

// Save tasks to LocalStorage
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}
