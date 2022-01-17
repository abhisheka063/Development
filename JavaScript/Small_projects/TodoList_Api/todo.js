(function(){
    let tasks = [];//let because its goign to change when we modify
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');
    async function fetchTodoS() {
        //Get request
        // fetch('https://jsonplaceholder.typicode.com/todos')//its return a promise
        //     .then(function(response){
        //         //here it will request response code not data
        //         console.log(response);
        //         return response.json();//this will also return a promise so we can do .then
        //     }).then(function(data){
        //         //here this will get data
        //         console.log(data)
        //         tasks=data.slice(0,10);
        //         renderList();
        //     })
        //     .catch(function(error){
        //         console.log("error",error);
        //     })

        //using async await
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json()
            tasks = data.slice(0, 10);
            renderList();
        } catch (error) {
            console.log(error);
        }
    }



    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
                <label for="${task.id}">${task.title}</label>
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
            return task.id == Number(taskId);

        })
        if (task.length > 0) {

            const currentTask = task[0];//Here if array is greater the 0 length means we have a task return in above so setting it current task
            currentTask.completed = !currentTask.completed;
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
            return task.id !== Number(taskId);
        })
        tasks = newTasks;
        renderList();
        console.log(taskId)
        showNotification('Task deleted successfully');
    }

    function addTask(task) {



        if (tasks) {
            //using post to update server and local state
            fetch('https://jsonplaceholder.typicode.com/todos', {
                method: postMessage,
                headers: {
                    'Content-Type': 'application/josn',
                },
                body: JSON.stringify(task),
            }).then(function (response) {//its return a promise
                //here it will request response code not data
                console.log(response);
                return response.json();//this will also return a promise so we can do .then
            }).then(function (data) {
                //here this will get data
                console.log(data);
                tasks.push(task);
                renderList();
                showNotification('Task added successfully');
            })
                .catch(function (error) {
                    console.log("error", error);
                })


            // tasks.push(task);
            // renderList();
            // showNotification('Task added successfully');
            // return;
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
                title,
                id: Date.now(),
                completed: false
            }
            //setting placeholder to empty and calling add task so that user can add new task
            e.target.value = '';
            addTask(task);

        }
    }

    //getting every of keypress


    //handling click events
    function handleClickListener(e) {
        const target = e.target;
        console.log(target);
        if (target.className == 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }
        else if (target.className == 'custom-checkbox') {
            const taskId = target.id;
            markTaskAsComplete(taskId);
            return;
        }
    }

    function initializeApp() {
        fetchTodoS();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        document.addEventListener('click', handleClickListener);
    }
    initializeApp();

}) ();