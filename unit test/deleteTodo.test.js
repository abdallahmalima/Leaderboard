/**
 * @jest-environment jsdom
 */
import addTodo from '../src/modules/createTodo';
import { deleteTodoTest } from '../src/modules/deleteTodo';
import createTodoDomMock from './__mock__/createTodoDomMock';

describe('Add and delete Todo', () => {
  it('Add new todo', () => {
    localStorage.clear();
    createTodoDomMock('task 1');
    const createTodoForm = document.querySelector('#todo-form');
    addTodo(createTodoForm);
    const listContainer = document.querySelector('ul');

    expect(listContainer.children.length).toBe(1);
  });

  it('Delete Todo', () => {
    let listContainer = document.querySelector('ul');
    const itemIndex = listContainer.children[0].id;
    deleteTodoTest(itemIndex);
    listContainer = document.querySelector('ul');

    expect(listContainer.children.length).toBe(0);
  });
});
