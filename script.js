
let arr = [];
function renderTodo(todo) {
  localStorage.setItem("arr", JSON.stringify(arr));


  const list = document.querySelector(".todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    return;
  }

  const isChecked = todo.checked ? "done" : "";

  const newlist = document.createElement("li");

  newlist.setAttribute("class", `todo-item ${isChecked}`);
  newlist.setAttribute("data-key", todo.id);
  newlist.innerHTML = `
<input id="${todo.id}"  type="checkbox"/>
<label for "${todo.id}"  class="tick js-tick"></label>
<span>${todo.x}</span>
<button class="delete-todo js-delete-todo">
    <button class="delete-todo js-delete-todo">
        <svg fill= xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
    </button>
`;

  if (item) {
    list.replaceChild(newlist, item);
  } else {
    list.append(newlist);
  }

}

function myFunction(x) {
  const todoobject = {
    x,
    checked: false,
    id: Date.now(),
  };

  arr.push(todoobject);

  renderTodo(todoobject);
  console.log(arr);

}

function toggleDone(b) {
  const index = arr.findIndex((myitem) => myitem.id === Number(b));
  arr[index].checked = !arr[index].checked;
  renderTodo(arr[index]);
}

function deleteTodo(c) {
  const index = arr.findIndex((myitem) => myitem.id === Number(c));
  const emptytodo = {
    deleted: true,
    ...arr[index],
  };
  arr = arr.filter((myitem) => myitem.id !== Number(c));
  renderTodo(emptytodo);
}

const form = document.querySelector(".formselect");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector(".inputselect");

  const text = input.value.trim();

  if (text !== "") {
    myFunction(text);
    input.value = "";
  }
});

const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("arr");
  if (ref) {
    arr = JSON.parse(ref);
    arr.forEach((t) => {
      renderTodo(t);
    });
  }
});

