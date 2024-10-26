const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    }
});

function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Concluir';
    completeButton.className = 'complete';
    completeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        moveToCompleted(li);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit';
    editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const newTaskText = prompt('Edite a tarefa:', taskText);
        if (newTaskText) {
            li.textContent = newTaskText;
            li.appendChild(completeButton);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            saveTasks();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function moveToCompleted(li) {
    const completedLi = document.createElement('li');
    completedLi.textContent = li.firstChild.textContent;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        completedLi.remove();
        saveTasks();
    });

    completedLi.appendChild(deleteButton);
    completedTaskList.appendChild(completedLi);
    li.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        tasks.push({
            text: task.childNodes[0].textContent,
            completed: false,
        });
    });

    const completedTasks = [];
    document.querySelectorAll('#completedTaskList li').forEach(task => {
        completedTasks.push({
            text: task.childNodes[0].textContent,
            completed: true,
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    tasks.forEach(task => addTask(task.text));

    completedTasks.forEach(task => {
        const completedLi = document.createElement('li');
        completedLi.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remover';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            completedLi.remove();
            saveTasks();
        });

        completedLi.appendChild(deleteButton);
        completedTaskList.appendChild(completedLi);
    });
}
