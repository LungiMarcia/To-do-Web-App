function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  var task = {
    text: taskText,
    date: new Date(),
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  displayTasks();
  taskInput.value = "";
}

function deleteTask(index, list) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function toggleTask(index, list) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function displayTasks() {
  var pendingTasksList = document.getElementById("pendingTasks");
  var completedTasksList = document.getElementById("completedTasks");

  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  tasks.forEach(function (task, index) {
    var li = document.createElement("li");
    li.textContent = task.text + " - " + task.date.toLocaleString();
    li.className = task.completed ? "completed" : "";

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
      deleteTask(index);
    };

    var completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.onclick = function () {
      toggleTask(index);
    };

    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);

    if (task.completed) {
      completedTasksList.appendChild(li);
    } else {
      pendingTasksList.appendChild(li);
    }
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();
