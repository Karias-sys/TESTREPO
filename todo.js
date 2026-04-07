// todo app with add, remove and list functions
const fs = require('fs');
const path = require('path');

const TODO_FILE = path.join(__dirname, 'todos.json');

function loadTodos() {
    if (!fs.existsSync(TODO_FILE)) {
        return [];
    }
    const data = fs.readFileSync(TODO_FILE, 'utf-8');
    return JSON.parse(data);
}

function saveTodos(todos) {
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

function addTodo(task) {
    const todos = loadTodos();
    todos.push({ id: Date.now(), task });
    saveTodos(todos);
    console.log('Todo added:', task);
}

function removeTodo(id) {
    let todos = loadTodos();
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    if (todos.length === initialLength) {
        console.log('Todo not found with id:', id);
        return;
    }
    saveTodos(todos);
    console.log('Todo removed with id:', id);
}

function listTodos() {
    const todos = loadTodos();
    if (todos.length === 0) {
        console.log('No todos found.');
        return;
    }
    console.log('Todo List:');
    todos.forEach(todo => {
        console.log(`- [${todo.id}] ${todo.task}`);
    });
}

// Example usage
addTodo('Buy groceries');
addTodo('Walk the dog');
listTodos();
removeTodo(1); // Replace with actual ID from the list
listTodos();