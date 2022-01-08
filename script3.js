const todoTextEl = document.querySelector("#todo-text");
const todoList = document.querySelector("#todo-list");
const sampleTodo = [{
    text: "Todo using Local Storage",
    done: false,
    id: Date.now()
}];

if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify(sampleTodo));
}

const setPendingTasks = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    const pTasksEl = document.getElementById("p-tasks");
    let count = todos.length;
    for (let todo of todos) {
        if (todo.done) {
            count--;
        }
    }
    pTasksEl.innerText = count;
}
setPendingTasks();

const setTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todoList.innerHTML = todos.map((todo) => {
        return `
        <div class="todo">
        <div class="todo-text ${todo.done ? "done" : ""}" onclick="completed(${todo.id})">
            ${todo.text}
        </div>    
        <button onclick="remove(${todo.id})">
            <img src="trash.png">
        </button>
        </div>
        `
    }).join('');
}
setTodos();

const completed = (id) => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    for (let todo of todos) {
        if (todo.id == id) {
            todo.done == true ? todo.done = false : todo.done = true;
        }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    setTodos();
    setPendingTasks();
}

const remove = (id) => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    const uTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(uTodos));
    setTodos();
    setPendingTasks();
}

const addTodo = () => {
    if (todoTextEl.value) {
        const todoText = todoTextEl.value;
        const todos = JSON.parse(localStorage.getItem("todos"));
        todos.push({
            text: todoText,
            id: Date.now(),
            done: false
        });
        todoTextEl.value = "";
        localStorage.setItem('todos', JSON.stringify(todos));
        setTodos();
        setPendingTasks();
    }
}

const reset = () => {
    localStorage.setItem('todos', '[]');
    setTodos();
    setPendingTasks();
}

// To add todo using enter
todoTextEl.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})