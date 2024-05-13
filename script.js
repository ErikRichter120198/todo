// Funktion zum Laden der Todos von der API
function loadTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = ''; // Leert die Liste

            todos.forEach(todo => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled> ${todo.title}
                    <button onclick="deleteTodo(${todo.id})">Delete</button>
                `;
                todoList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading todos:', error));
}

// Funktion zum Hinzufügen eines Todos
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoTitle = todoInput.value.trim();

    if (todoTitle) {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: todoTitle,
                completed: false,
                userId: 1 // Beispielbenutzer-ID
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(() => {
            loadTodos(); // Lädt die Todos neu, um das hinzugefügte Todo anzuzeigen
            todoInput.value = ''; // Leert das Eingabefeld nach dem Hinzufügen
        })
        .catch(error => console.error('Error adding todo:', error));
    } else {
        alert('Please enter a todo!');
    }
}

// Funktion zum Löschen eines Todos
function deleteTodo(todoId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'DELETE',
    })
    .then(() => {
        loadTodos(); // Lädt die Todos neu, um das gelöschte Todo aus der Liste zu entfernen
    })
    .catch(error => console.error('Error deleting todo:', error));
}

// Beim Laden der Seite werden die Todos geladen
window.onload = loadTodos;
