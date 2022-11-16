import './style.css';
import addTodo from './modules/createTodo';
import renderTodos from './modules/renderTodos';
import clearCompleted from './modules/clearCompletedTodo';
import registerGraggableEventListeners from './modules/draggableSort';

const createTodoForm = document.querySelector('#todo-form');
const insertIcon = document.querySelector('.insert-icon');
const clearCompletedBtn = document.querySelector('.todo-clear');

renderTodos();

clearCompletedBtn.addEventListener('click', () => {
  clearCompleted();
});

insertIcon.addEventListener('click', () => {
  addTodo(createTodoForm);
});

createTodoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo(createTodoForm);
});

registerGraggableEventListeners();
