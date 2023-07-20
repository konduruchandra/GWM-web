document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render existing tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add new task
    function addTask() {
        const task = taskInput.value.trim();
        if (task !== '') {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    }

    // Remove task
    function deleteTask(event) {
        if (event.target.classList.contains('delete-button')) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', deleteTask);

    // Initial render
    renderTasks();
});
