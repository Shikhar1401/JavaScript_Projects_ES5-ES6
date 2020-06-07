//UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event listeners

loadEventListeners();

// Load All Event Listener

function loadEventListeners(){

//DOM load Event
document.addEventListener('DOMContentLoaded',getTasks);
// Add task Event
form.addEventListener('submit', addtask);

//remove task event
taskList.addEventListener('click',removeTask);

// clear tasks
clearBtn.addEventListener('click',cleartasks);

//filter tasks
filter.addEventListener('keyup',filterTasks);

//
}

//Get Tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
    // create text node and append to li
        li.appendChild(document.createTextNode(task));
    //create new link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>'
    // append link to li
        li.appendChild(link);
    // append to ul
        taskList.appendChild(li);
    
    });
}

//Add Task
function addtask(e) {
    if(taskInput.value === ''){
        alert('Add Task');
    }

//Create Li
    const li = document.createElement('li');
    li.className = 'collection-item';
// create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
//create new link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>'
// append link to li
    li.appendChild(link);
// append to ul
    taskList.appendChild(li);

//store in local storage
storeTaskInLocalStorage(taskInput.value);

//clear input
    taskInput.value = ' ';
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')){
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.remove();
            
        //remove task from local storage;
        
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent == task){
            tasks.splice(index, 1);
            // tasks.splice(index, task);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function cleartasks(){

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.textContent;
       
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display= 'block';
        }else{
            task.style.display = 'none'
        }
    });
    // console.log(taskList.children.taskContent.contains());
    console.log(e.target.value)
}

