/**
 * @jest-environment jsdom
 */
import { markCompletedTest } from '../src/modules/completeTodo';
import addTodo from '../src/modules/createTodo';
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

  it('Mark completed todo', () => {
    let listContainer = document.querySelector('ul');
    const itemIndex = listContainer.children[0].id;
    markCompletedTest(itemIndex);
    listContainer = document.querySelector('ul');
    expect(listContainer.children[0].querySelector('input').checked).toBe(true);
  });
});
