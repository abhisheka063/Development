let data = [];
let list_input = document.getElementById('task-input');
const listItem = document.getElementById('list-ul');
let pending = document.getElementById('pending')
let pending_data = []




renderList = (task) => {
    // console.log("insider render");//this is just for testing

    //creating list
    const li = document.createElement('li');
    li.innerHTML = `


        <input type="checkbox" id="${String(task.id)}" ${(task.completed) ? 'checked' : ''} name="list" class="checked"}>
        <label for="${String(task.id)}" class='label'>${task.title}</label>
        <span ><img src="https://cdn-icons.flaticon.com/png/512/3405/premium/3405244.png?token=exp=1642592747~hmac=d4e0c8bba262d3f84c5e1189822e17bc" class="del-icon" id="${task.id}"></span>
        <hr>
        `;
    listItem.append(li);
    task.completed ? li.style.textDecoration = 'line-through' : li.style.textDecoration = 'none'




}
calculatePending = () => {
    pending_data = data.filter((pending_data) => { return pending_data.completed == false })
    pending.innerHTML = `Pending Tasks:${pending_data.length}`;
}
addTask = (text) => {
    const task = {
        title: text,
        id: Date.now(),
        completed: false
    }
    data.push(task);
    displayList();
    return

}


displayList = () => {
    calculatePending();
    listItem.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        renderList(data[i]);
    }
    // console.log("inner", listItem.innerHTML);--> This will give the no of li added/rendered here listItem is ul--->testing


}
deleteTask = (taskId) => {
    const task = data.filter((task) => {
        return task.id !== taskId;
    })
    //adding non selected tasks to task list and rendering updated
    data = task;
    displayList();
    return

}
toggleTask = (taskId) => {
    const task = data.filter(function (task) {
        return task.id == taskId;
    })
    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        displayList();
        return
    }


}
completeAll = () => {
    if (pending_data.length == 0) {
        alert('You have already completed all tasks or You dont have tasks in list');
        return
    }
    data.map(c => c.completed = true)
    displayList();
}
clearAll = () => {
    if (data.length == 0) {
        alert('Already cleared');
        return
    }
    data = [];
    displayList();
    list_input.value = '';
    calculatePending();
}
// fetching data from a api
async function gettingApiData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const task_data = await response.json();
        data = task_data.slice(0, 10);
        displayList();
    } catch (error) {
        console.log(error);
    }
}

handleClickListener = (e) => {
    const target = e.target;
    // console.log(list_input.value)
    if (target.id == 'complete-all') {
        completeAll();
    }
    if (target.className == 'add' || e.key == 'Enter') {
        let text = list_input.value;
        if (text == '') {
            alert('Please enter a task first');
            return
        }
        list_input.value = '';
        addTask(text);
    }
    if (target.className == 'del-icon') {
        //Here api id is number so coverting id to num
        deleteTask(Number(target.id));
    }
    if (target.id == 'clear-all') {
        clearAll();

    }
    if (target.className == 'checked') {
        //Here api id is number so coverting id to num
        toggleTask(Number(target.id));
    }
    if (target.id == 'Fetch-api') {
        gettingApiData();
        return
    }
}
// Initializers

document.addEventListener('click', handleClickListener);
list_input.addEventListener('keyup', handleClickListener);//separately to handle enter key event
// gettingApiData();
