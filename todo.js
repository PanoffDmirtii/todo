let todoList = [];
const todo = document.getElementById('input-todo-text');
const btnAdd = document.getElementById('todo-btn-add');
const btnClear = document.getElementById('todo-btn-clear');
const todoListItem = document.querySelector('.todo-list');

if (localStorage.getItem('todo')) {
  const itemsLocal = JSON.parse(localStorage.getItem('todo'));
  todoList = itemsLocal;
  renderTodo()
}

function renderTodo() {
  const listTodoItems = todoList.map((item, index) => {
    return `
      <li>
        <div style="display: flex; justify-content: space-between">
           <div style="display: flex; align-items: center">
                <input id="${item.value}-index" type="checkbox" class="todo-checkbox"/>
                <label for="${item.value}-index"">${item.value}</label>
           </div>
           <div  style="display: flex; align-items: center">${item.date}</div>
        </div>
        
      </li>
    `
  }).join('');
  todoListItem.innerHTML = listTodoItems;
  btnClear.style.display = todoList.length > 0 ? 'block' : 'none';
}

function addTodo(event) {
  const valueTodo = todo.value;
  if (!valueTodo || (event.type === 'keypress' && event.keyCode !== 13)) return;

  const objTodo = {
    value: valueTodo,
    checked: false,
    date: new Date().toDateString()
  };
  todoList.push(objTodo);
  localStorage.setItem('todo', JSON.stringify(todoList))
  todo.value = '';
  renderTodo()
}

btnAdd.addEventListener('click', addTodo);
todo.addEventListener('keypress', addTodo);

btnClear.addEventListener('click', () => {
  localStorage.clear();
  todoList = [];
  renderTodo()
});
