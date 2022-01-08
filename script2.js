const todos = document.querySelectorAll('.todo');
const remBtns = document.querySelectorAll('.remove');
const todoTextEl = document.querySelector("#todo-text");
const todoList = document.querySelector("#todo-list");

const setPendingTasks = () => {
    const todos = document.querySelectorAll('.todo');
    const pTasksEl = document.getElementById("p-tasks");
    let count = 0;
    for (let todo of todos) {
        if (todo.className == "todo") {
            count++;
        }
    }
    pTasksEl.innerText = count;
}

setPendingTasks();

const addTodo = () => {
    if (todoTextEl.value) {
        const divTodo = document.createElement('div');
        divTodo.className = "todo";
        const divTodoText = document.createElement('div');
        divTodoText.className = "todo-text";
        const todoTextNode = document.createTextNode(todoTextEl.value);
        divTodoText.appendChild(todoTextNode);
        const todoButton = document.createElement('button');
        todoButton.className = "remove";
        const todoButtonImg = document.createElement('img');
        todoButtonImg.src = "trash.png";
        todoButton.appendChild(todoButtonImg);
        divTodo.appendChild(divTodoText);
        divTodo.appendChild(todoButton);
        todoList.append(divTodo);
        setPendingTasks();
        todoTextEl.value = "";

        divTodo.addEventListener('click', () => {
            divTodo.classList.toggle('done');
            setPendingTasks();
        })

        todoButton.addEventListener('click', () => {
            divTodo.remove();
        })
    }
}


todos.forEach((todo) => {
    todo.addEventListener('click', () => {
        todo.classList.toggle('done');
        setPendingTasks();
    });
})


remBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.parentElement.remove();
        setPendingTasks();
    });
})

// To add todo using enter
todoTextEl.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})

const reset = () => {
    todoList.innerHTML = "";
    setPendingTasks();
}