/**
 * @jest-environment jsdom
 */

import addTodo from '../src/modules/createTodo';
import createTodoDomMock from './__mock__/createTodoDomMock';

it('Add new todo', () => {
  localStorage.clear();
  createTodoDomMock('task 1');
  const createTodoForm = document.querySelector('#todo-form');
  addTodo(createTodoForm);
  const listContainer = document.querySelector('ul');

  expect(listContainer.children.length).toBe(1);
});