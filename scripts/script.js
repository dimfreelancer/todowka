'use strict';

console.log('hello');



const initTodo = (selector) => {
    const wrapper = document.querySelector(selector);
    wrapper.classList.add('container');

    wrapper.textContent = 'Hello world';
}



initTodo('.app');