let data = [];
let list_input = document.getElementById('task-input');
let listItem = document.getElementById('list-ul');
let pending = document.getElementById('pending')
let pending_data,




    renderList = (task) => {
        console.log(task);
        console.log("insider render");

        //creating list
        const li = document.createElement('li');
        li.innerHTML = `


        <input type="checkbox" id="${task.id}" ${task.completed?'checked':''} name="list" class="checked"}>
        <label for="${task.id}" class='label'>${task.title}</label>
        <span ><img src="https://cdn-icons.flaticon.com/png/512/3405/premium/3405244.png?token=exp=1642592747~hmac=d4e0c8bba262d3f84c5e1189822e17bc" class="del-icon" id="${task.id}"></span>
        <hr>
        `;
        listItem.append(li);
        task.completed ? li.style.textDecoration = 'line-through' : li.style.textDecoration = 'none'




    }
calculatePending = () => {
    pending_data = data.filter((pending_data) => { return pending_data.completed == false })
    console.log(pending_data, "----")
    pending.innerHTML = `Pending Tasks:${pending_data.length}`;
}
addTask = (text) => {
    const task = {
        title: text,
        // id: Math.floor(Math.random() * 10).toString(),
        id: Date.now().toString(),
        completed: false
    }
    data.push(task);
    console.log(data);
    console.log(pending, "peninf");
    displayList();
    return

}


displayList = () => {
    console.log("inner", listItem.innerHTML);
    calculatePending();
    listItem.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        renderList(data[i]);
    }


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
    console.log(task, "toggle")
    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        displayList();
        return
    }


}
completeAll = () => {
    data.map(c=>c.completed=true)
    displayList();
}
clearAll = () => {
    data = [];
    console.log("inside")
    displayList();
    list_input.value = '';
    calculatePending();
}

handleClickListener = (e) => {
    const target = e.target;
    console.log(target);

    if (target.className == 'complete-all') {
        completeAll();
    }
    if (target.className == 'add' || e.key == 'Enter') {
        console.log(list_input.value);
        let text = list_input.value;
        if (text == '') {
            alert('Please enter a task first');
            return
        }
        list_input.value = '';
        addTask(text);
    }
    if (target.className == 'del-icon') {
        deleteTask(target.id);
    }
    if (target.className == 'clear-all') {
        clearAll();

    }
    if (target.className == 'checked') {
        toggleTask(target.id);
    }
}


document.addEventListener('click', handleClickListener);
list_input.addEventListener('keyup', handleClickListener);
