'use strict';

const createToDo = (title) => {
    const todoContainer = document.createElement('div');
    const todoHeader = document.createElement('h1');

    todoContainer.classList.add('container');
    todoHeader.textContent = title;

    todoContainer.append(todoHeader);
    return todoContainer;
};


const initTodo = (selector, titleTodo) => {
    const wrapper = document.querySelector(selector);
    const todoApp = createToDo(titleTodo);


    wrapper.append(todoApp);
}



initTodo('.app', 'Список дел');