const addTodoBtn = document.querySelector('.add-todo');
const todoInput = document.querySelector('.input-todo');
const todosContainer = document.querySelector('.todos-container');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

addTodoBtn.addEventListener('pointerdown', () => {
  if (!todoInput.value) return;
  addTodo(todoInput.value);
  todos.push(todoInput.value);
  localStorage.setItem('todos', JSON.stringify(todos));
});

const addTodo = function(text) {
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo');

  const newTextTodo = document.createTextNode(text);

  const newDeleteTodo = document.createElement('span');
  newDeleteTodo.classList.add('delete-todo');
  newDeleteTodo.textContent = 'x';

  newDeleteTodo.addEventListener('pointerdown', () => {
    todos.splice(todos.indexOf(newTextTodo.textContent), 1);
    newTodo.remove();
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  newTodo.append(newTextTodo);
  newTodo.append(newDeleteTodo);
  todosContainer.append(newTodo);
};

for (t of todos) addTodo(t);