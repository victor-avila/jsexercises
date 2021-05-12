const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', removeTasks);
    filter.addEventListener('keyup', filterTasks);
    document.addEventListener('DOMContentLoaded', getTasks);
}

function getTasks() {
  let tasks = [];
  if (localStorage.getItem('tasks') !== null ) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(addTaskToList)
}

function addTask(e) {
  if (!taskInput.value) {
    alert('Add a task');
  }
  else {
    addTaskToList(taskInput.value);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
  }
  e.preventDefault();
}

function addTaskToList(task) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="material-icons">remove_circle</i>';
  li.appendChild(link);
  taskList.appendChild(li);
}

function storeTaskInLocalStorage(task) {
  let tasks = [];
  if (localStorage.getItem('tasks') !== null ) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLS(e.target.parentElement.parentElement.firstChild.textContent);
    }
}

function removeTaskFromLS(task) {
  let tasks = [];
  if (localStorage.getItem('tasks') !== null ) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((item, index) => {
    if (item === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLS();
}

function clearTasksFromLS() {
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('li.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}