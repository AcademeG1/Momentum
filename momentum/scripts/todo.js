const todoBtn = document.querySelector('.todo');
const body = document.body;

todoBtn.addEventListener('click', () => {
    if (document.querySelector('.todoContainer') == undefined) {
        const todoContainer = document.createElement('div');
        todoContainer.className = 'todoContainer';

        const todoMenu = document.createElement('div');
        todoMenu.className = 'todoMenu';
        todoMenu.textContent = 'Today';


        const todoUl = document.createElement('div');
        todoUl.className = 'todoUl';

        const todoInput = document.createElement('input');
        todoInput.className = 'todoInput';
        todoInput.type = 'text';
        todoInput.placeholder = 'New Todo'
        todoInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {

                const li = document.createElement('li');
                li.className = 'li-task'
                const check = document.createElement('input');
                check.type = 'checkbox';
                check.style.marginRight = '10px'
                check.addEventListener('click', () => {
                    check.nextElementSibling.style.textDecoration = 'line-through';
                })
                const span = document.createElement('span');
                span.textContent = todoInput.value;
                li.append(check, span);
                todoUl.append(li)

                todoInput.value = ''
            }
        })

        todoContainer.append(todoMenu, todoUl, todoInput);

        body.prepend(todoContainer);
    } else {
        document.querySelector('.todoContainer').remove();
    }  
})