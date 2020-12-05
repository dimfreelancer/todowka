'use strict';

const createToDo = (title, form) => {
    const todoContainer = document.createElement('div');
    const todoRow = document.createElement('div');
    const todoHeader = document.createElement('h1');
    const wrapperForm = document.createElement('div');
    const wrapperList = document.createElement('div');

    todoContainer.classList.add('container');
    todoRow.classList.add('row');
    todoHeader.classList.add('text-center', 'mb-5');
    wrapperForm.classList.add('col-6');
    wrapperList.classList.add('col-6');

    todoHeader.textContent = title;

    wrapperForm.append(form);
    todoRow.append(wrapperForm, wrapperList);
    todoContainer.append(todoHeader, todoRow);
    return todoContainer;
};

const createFormTodo = () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const textArea = document.createElement('textarea');
    const btnSubmit = document.createElement('button');

    btnSubmit.textContent = 'Добавить';
    btnSubmit.type = 'submit';

    form.classList.add('form-group');
    input.classList.add('form-control', 'mb-3');
    textArea.classList.add('form-control', 'mb-3');
    btnSubmit.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');

    form.append(input, textArea, btnSubmit);
    return { input, textArea, btnSubmit, form };
};


const initTodo = (selector, titleTodo) => {
    const wrapper = document.querySelector(selector);
    const formTodo = createFormTodo();
    const todoApp = createToDo(titleTodo, formTodo.form);

    wrapper.append(todoApp);
}



initTodo('.app', 'Список дел');