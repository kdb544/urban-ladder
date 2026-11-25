let inputTask = document.getElementById("inputTask");
let addTask = document.getElementById("addTask");
let taskList = document.querySelector(".list");

let notes = document.querySelector(".notes textarea");
let focus = document.querySelector(".focus textarea");
let remember = document.querySelector(".remInput");

function getTasks(){
    try {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
        return [];
    }
}

addTask.addEventListener("click", function (){
    let task = inputTask.value.trim();
    
    if (task === ""){
        return;
    }
    
    let tasks = getTasks();

    tasks.push({
        text: task,
        completed:false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputTask.value = "";
    displayTasks();
});

function displayTasks(){

    taskList.innerHTML = "";
    let tasks = getTasks();
    tasks.forEach(function(task, index){
    let li = document.createElement("li");
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    let span = document.createElement("span");
    span.textContent = task.text;

    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.setAttribute("aria-label", "Delete task");

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-trash";

    deleteButton.appendChild(deleteIcon);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    checkbox.addEventListener("change", function () {
        tasks[index].completed = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        if (checkbox.checked){
            span.style.textDecoration = "line-through";
        }else{
            span.style.textDecoration = "none";
        }
        });

        deleteButton.addEventListener("click", function(){

            tasks.splice(index,1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        });

        if (task.completed){
            span.style.textDecoration = "line-through";
        }
    });
}

notes.addEventListener("input", function(){
    localStorage.setItem("notes", notes.value);
});

focus.addEventListener("input", function(){
    localStorage.setItem("focus", focus.value);
});

remember.addEventListener("input", function(){
    localStorage.setItem("remember", remember.value);
})

function loadData(){
    notes.value = localStorage.getItem("notes") || "";
    focus.value = localStorage.getItem("focus") || "";
    remember.value = localStorage.getItem("remember") || "";
}

inputTask.addEventListener("keydown", function(event){

    if (event.key === "Enter"){
        addTask.click();
    }
});

displayTasks();
loadData();