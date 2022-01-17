let tasks = [];//let because its goign to change when we modify
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.text}</label>
            <img src="bin.svg" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

function renderList() {
    taskList.innerHTML = '';
    //below loop will render the html list to the length of tasks array
    for (let i = 0; i < tasks.length; i++) {

        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete(taskId) {
    
    const task = tasks.filter(function (task) {
        return task.id == taskId;
       
    })
    if (task.length > 0) {
        
        const currentTask = task[0];//Here if array is greater the 0 length means we have a task return in above so setting it current task
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Task is toggled");
        return;
    }
    else {
        showNotification("Could not toggle task");
    }
}

function deleteTask(taskId) {
    //getting new tasks which are not going to be deleted and saving them to newTask
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask(task) {
    if (tasks) {
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task cannot be added');

}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    //catching presed key in event
    if (e.key == 'Enter') {
        //catching the values if key "enter" is pressed
        const text = e.target.value;
        console.log(text);
        //if is empty then show no values 
        if (!text) {
            showNotification('Task text can not be empty');
            return;
        }
        //creating task object
        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }
        //setting placeholder to empty and calling add task so that user can add new task
        e.target.value = '';
        addTask(task);

    }



}

function initializeApp(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}
initializeApp();
//getting eveny of keypress


//handling click events
function handleClickListener(e) {
    const target = e.target;
    console.log(target);
    if (target.className == 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className == 'custom-checkbox'){
        const taskId = target.id;
        markTaskAsComplete(taskId);
        return;
    }
}
