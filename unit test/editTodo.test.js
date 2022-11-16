/**
 * @jest-environment jsdom
 */
import addTodo from '../src/modules/createTodo';
import { updateToDoTest } from '../src/modules/updateTodo';
import createTodoDomMock from './__mock__/createTodoDomMock';

describe('Add and Edit Todo', () => {
  it('Add new todo', () => {
    localStorage.clear();
    createTodoDomMock('task 1');
    const createTodoForm = document.querySelector('#todo-form');
    addTodo(createTodoForm);
    const listContainer = document.querySelector('ul');
    expect(listContainer.children.length).toBe(1);
  });

  it('Edit Todo', () => {
    let listContainer = document.querySelector('ul');
    const itemIndex = listContainer.children[0].id;
    updateToDoTest(itemIndex, 'edited task');
    listContainer = document.querySelector('ul');
    expect(listContainer.children[0].textContent.trim()).toBe('edited task');
  });
});
