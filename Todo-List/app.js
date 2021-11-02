"use strict";

const getDataBase = () => JSON.parse(localStorage.getItem("todoList")) ?? [];

const setDataBase = (database) =>
  localStorage.setItem("todoList", JSON.stringify(database));

const createItem = (todo, status, index) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `
        <input type="checkbox" ${status} data-indicator=${index}>
        <div> ${todo}  </div>
        <input type="button" value="X" data-indicator=${index}>
    `;
  document.getElementById("todoList").appendChild(item);
};

const clearTodo = () => {
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const renderScreen = () => {
  clearTodo();
  const database = getDataBase();
  database.forEach((item, index) => createItem(item.todo, item.status, index));
};

const addItem = (event) => {
  const key = event.key;
  if (key === "Enter") {
    const database = getDataBase();
    database.push({ todo: event.target.value, status: "" });
    setDataBase(database);
    renderScreen();
    event.target.value = "";
  }
};

const removeItem = (index) => {
  const database = getDataBase();
  database.splice(index, 1);
  setDataBase(database);
  renderScreen();
};

const updateItem = (index) => {
  const database = getDataBase();
  database[index].status = database[index].status === "" ? "checked" : "";
  setDataBase(database);
  renderScreen();
};

const clickItem = (event) => {
  const element = event.target;
  if (element.type === "button") {
    const index = element.dataset.indicator;
    removeItem(index);
  } else if (element.type === "checkbox") {
    const index = element.dataset.indicator;
    updateItem(index);
  }
};

document.getElementById("newItem").addEventListener("keypress", addItem);
document.getElementById("todoList").addEventListener("click", clickItem);
renderScreen();
