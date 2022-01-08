let todos = [
    {
        text: "Buy New Book",
        done: false,
        id: Date.now()
    }
];
const todoTextEl = document.querySelector("#todo-text");
const todoList = document.querySelector("#todo-list");

const setPendingTasks = () => {
    const todos = document.querySelectorAll('.todo-text');
    const pTasksEl = document.getElementById("p-tasks");
    let count = todos.length;
    for (let todo of todos) {
        if (todo.classList.contains("done")) {
            count--;
        }
    }
    pTasksEl.innerText = count;
}
setPendingTasks();

const addTodo = () => {
    if (todoTextEl.value) {
        const todoText = todoTextEl.value;
        todos.push({
            text: todoText,
            id: Date.now(),
            done: false
        });
        todoTextEl.value = "";
        setTodos();
    }
}

const setTodos = () => {
    todoList.innerHTML = todos.map((todo) => {
        return `
        <div class="todo" onclick="completed(${todo.id})">
        <div class="todo-text ${todo.done ? "done" : ""}">
            ${todo.text}
        </div>    
        <button onclick="remove(${todo.id})">
            <img src="trash.png">
        </button>
        </div>
        `
    }).join('');
    setPendingTasks();
}

setTodos();

const reset = () => {
    todos = [];
    todoList.innerHTML = "";
    setPendingTasks();
}

const remove = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    setTodos();
}

const completed = (id) => {
    let reqTodo = todos.filter(todo => todo.id == id);
    if (reqTodo[0].done) {
        reqTodo[0].done = false;
    } else {
        reqTodo[0].done = true;
    }
    setTodos();
    setPendingTasks();
}


// To add todo using enter
todoTextEl.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})