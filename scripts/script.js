'use strict';

const createToDo = (title, form, list) => {
    const todoContainer = document.createElement('div');
    const todoRow = document.createElement('div');
    const todoHeader = document.createElement('h1');
    const wrapperForm = document.createElement('div');
    const wrapperList = document.createElement('div');

    todoContainer.classList.add('container');
    todoRow.classList.add('row');
    todoHeader.classList.add('text-center', 'mb-5');
    wrapperForm.classList.add('col-lg-6', 'col-md-12');
    wrapperList.classList.add('col-lg-6', 'col-md-12');

    todoHeader.textContent = title;

    wrapperForm.append(form);
    wrapperList.append(list);
    todoRow.append(wrapperForm, wrapperList);
    todoContainer.append(todoHeader, todoRow);
    return todoContainer;
};

const createFormTodo = () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const textArea = document.createElement('textarea');
    const btnSubmit = document.createElement('button');

    input.placeholder = 'Наименование'; //input.setAttribute('placeholder', 'наименование');
    textArea.placeholder = 'Описание';  //textArea.setAttribute('placeholder', 'описание');
    
    btnSubmit.textContent = 'Добавить';
    btnSubmit.type = 'submit';

    form.classList.add('form-group');
    input.classList.add('form-control', 'mb-3');
    textArea.classList.add('form-control', 'mb-3');
    btnSubmit.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');

    form.append(input, textArea, btnSubmit);
    return { input, textArea, btnSubmit, form };
};

const createListTodo = () => {
    const listTodo = document.createElement('ul');
    listTodo.classList.add('list-group');
    return listTodo;
};

const createItemTodo = (id, titleItem) => {
    const itemTodo = document.createElement('li');
    const btnItem = document.createElement('button');

    itemTodo.classList.add('list-group-item', 'p-0', 'mb-3', 'border-0');
    btnItem.classList.add('list-item', 'btn', 'btn-light', 'btn-lg', 'btn-block', 'border-dark', 'rounded-pill');
    btnItem.textContent = titleItem;
    btnItem.id = id;
    itemTodo.append(btnItem);

    return itemTodo;
};

const addTodoItem = (todoData, listTodo, nameTodo, descriptionTodo) => {
    const id = `todo${(+new Date()).toString(16)}`;//создаем псевдо временно уникальный id дела, дата в мс, в строку hex
    const itemTodo = createItemTodo(id, nameTodo);

    todoData.push({ id, nameTodo, descriptionTodo }); //пушим литерал обкта
    
    listTodo.append(itemTodo);
    console.log('todoData: ', todoData);
};


const createModal = () => {
    const modalElem = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalBody = document.createElement('div');
    const modalFooter = document.createElement('div');
    const itemTitle = document.createElement('h2');
    const itemDescription = document.createElement('p');
    const btnClose = document.createElement('button');
    const btnReady = document.createElement('button');
    const btnDelete = document.createElement('button');


    modalElem.classList.add('modal');
    modalDialog.classList.add('modal-dialog');
    modalContent.classList.add('modal-content');
    modalHeader.classList.add('modal-header');
    modalBody.classList.add('modal-body');
    modalFooter.classList.add('modal-footer');
    itemTitle.classList.add('modal-title');
    btnClose.classList.add('close', 'btn-modal');
    btnReady.classList.add('btn', 'btn-success', 'btn-modal');
    btnDelete.classList.add('btn', 'btn-danger', 'btn-delete', 'btn-modal');

    btnClose.innerHTML = '&times;';
    btnReady.textContent = 'Выполнено';
    btnDelete.textContent = 'Удалить';


    modalDialog.append(modalContent);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalHeader.append(itemTitle, btnClose);
    modalBody.append(itemDescription);
    modalFooter.append(btnReady, btnDelete);

    modalElem.append(modalDialog);

    // modalElem.classList.add('d-block'); //TODO временно показать модальное окно

    const closeModal = (event) => {
        const target = event.target;
        console.log('target: ', target);
        if (target.classList.contains('btn-modal') || target === modalElem) {
            modalElem.classList.remove('d-block');
        } 
        // if (target === btnClose || target === modalElem) {
        //     modalElem.classList.remove('d-block');
        // } 
    }

    
    const showModal = (titleTodo, descriptionTodo) => {
        modalElem.classList.add('d-block');//сделать видимой
        itemTitle.textContent = titleTodo;
        itemDescription.textContent = descriptionTodo;
    }
    
    modalElem.addEventListener('click', closeModal); //btnClose.addEventListener('click', closeModal);
    return { modalElem, btnReady, btnDelete, showModal, closeModal }; //возвращаем в другое место для управления
}; //createModal

const initTodo = (selector, titleTodo) => {
    const todoData = [];

    const wrapper = document.querySelector(selector);
    const formTodo = createFormTodo();
    const listTodo = createListTodo();
    const modal = createModal();
    const todoApp = createToDo(titleTodo, formTodo.form, listTodo);

    document.body.append(modal.modalElem); //временно помещаем модальное окно
    wrapper.append(todoApp);
    
    formTodo.form.addEventListener('submit', event => {
        event.preventDefault();

        formTodo.input.classList.remove('is-invalid');
        formTodo.textArea.classList.remove('is-invalid');
        
        if (formTodo.input.value.trim() && formTodo.textArea.value) {
           
            addTodoItem(todoData, listTodo, formTodo.input.value, formTodo.textArea.value);
            formTodo.form.reset();
        } else {
            if (!formTodo.input.value) {
                formTodo.input.classList.add('is-invalid');
            }
            if (!formTodo.textArea.value) {
                formTodo.textArea.classList.add('is-invalid');
            }
        }
    });

    listTodo.addEventListener('click', event => {
        const target = event.target;
        console.log('target: ', target);

        if (target.classList.contains('list-item')) {
            const item = todoData.find( (elem) => elem.id === target.id); // ! здесь была опечатка
            modal.showModal(item.nameTodo, item.descriptionTodo);
        }
    });

} //initTodo



initTodo('.app', 'Список дел');