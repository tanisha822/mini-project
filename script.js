document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const displayTasks = () => {
        taskList.innerHTML = '';
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                ${task}
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const task = taskInput.value.trim();
        if (task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            displayTasks();
        }
    };

    window.editTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = prompt('Edit task:', tasks[index]);
        if (newTask !== null) {
            tasks[index] = newTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        }
    };

    window.deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    displayTasks();
});
