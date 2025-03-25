const list = document.querySelector(".list");

const noTasksMessage = document.querySelector(".textNoTasks");

const btnClear = document.querySelector(".button_large");


// //проверяем наличие задач в LS
const checkLS = () => {

  //забираем данные из LS
  const tasksLS = JSON.parse(localStorage.getItem("tasks"));

  console.log(tasksLS);

  if (tasksLS !== null) {

    //убираем поле "нет задач"
    noTasksMessage.classList.add("textNoTasks_none");
    
    for (let i=0; i<tasksLS.length; i++) {

      //создаем задачу в списке
      const item = document.createElement("li");
      item.classList.add("item");
      item.textContent = tasksLS[i].content;

      //создаем чекбокс к задаче
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.classList.add("checkbox"); 
      checkbox.id = tasksLS[i].id;
      const checkboxStatus = tasksLS[i].checkboxStatus;

      if (checkboxStatus === true) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }

      //создаем обертку для текста задачи и чекбокса
      const wrapTaskItem = document.createElement("div");
      wrapTaskItem.classList.add("wrapTaskItem");
      list.prepend(wrapTaskItem);
      
      //добавляем текст задачи и чекбокс в обертку
      wrapTaskItem.append(item, checkbox);
    }

    //включаем кнопку "очистить все задачи"
    btnClear.disabled = false;

    //если кликнули по чекбоксу
    list.addEventListener("click", function (evt) {
      if (evt.target.tagName === 'INPUT') {
        if (evt.target.checked) {
          for (let i=0; i<tasksLS.length; i++){
            if (tasksLS[i].id == evt.target.id) {
            tasksLS[i].checkboxStatus = true;
            localStorage.setItem("tasks", JSON.stringify(tasksLS));
            } 
          }
          return;
        } else {
          for (let i=0; i<tasksLS.length; i++){
            if (tasksLS[i].id == evt.target.id) {
            tasksLS[i].checkboxStatus = false;
            localStorage.setItem("tasks", JSON.stringify(tasksLS));
            }
          }
          return;
        }
      }
    })
  }
}

checkLS();


//добавляем новую задачу в список
const addTask = () => {

  //находим инпут
  const input = document.getElementById("inputElem");

  //берем значение из инпута
  const inputValue = document.getElementById("inputElem").value;

  //вывод ошибки, если инпут пустой
  const errorMessage = document.querySelector(".no_error");

  if (inputValue === "") {
    return errorMessage.classList.add("error");
  } else {
    errorMessage.classList.remove("error");
  }
  
  //убираем поле "нет задач"
  noTasksMessage.classList.add("textNoTasks_none");

  //создаем обертку для текста задачи и чекбокса
  const wrapTaskItem = document.createElement("div");
  wrapTaskItem.classList.add("wrapTaskItem");
  list.prepend(wrapTaskItem);

  //создаем задачу в списке
  const listItem = document.createElement("li");
  listItem.classList.add("item");

  //создаем чекбокс к задаче
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox"); 

  let checkboxStatus;

  //добавляем текст задачи и чекбокс в обертку
  wrapTaskItem.append(listItem, checkbox);

  //включаем кнопку "очистить все задачи"
  btnClear.disabled = false;

  //очищаем инпут от прошлой задачи
  input.value = "";

  //сохранить задачу с чекбоксом в объект
  class Task {
    constructor(content, checkboxStatus, id) {
      this.content = content;
      this.checkboxStatus = checkboxStatus;
      this.id = id;
    }
  }

  const task = new Task();
  task.content = inputValue;
  task.checkboxStatus = false;

  
  //записать объект в массив
  const tasksArr = [];
  tasksArr.push(task);

  //записать массив в хранилище 

  const tasksLS = JSON.parse(localStorage.getItem("tasks"));

  // console.log(tasksLS);

  if (tasksLS !== null) {
    const newTasksLS = tasksLS.concat(tasksArr);
    // console.log(newTasksLS);
    localStorage.setItem("tasks", JSON.stringify(newTasksLS));
    for (let i=newTasksLS.length-1; i>=0; i--) {
      newTasksLS.pop();
    }
    // console.log(localStorage);
  } else {
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    tasksArr.pop();
    // console.log(localStorage);
  }

  
  //записываем значение в список задач
  const newTasksLS = JSON.parse(localStorage.getItem("tasks"));


  for (let i=0; i<newTasksLS.length; i++) {
    listItem.textContent = newTasksLS[i].content;
  }

  //устанавливаем id для чекбоксов
  for (let i=0; i<newTasksLS.length; i++) {
    let idNumber = i+1;
    checkbox.setAttribute("id", idNumber);
    newTasksLS[i].id = idNumber;
    localStorage.setItem("tasks", JSON.stringify(newTasksLS));
  }

  // если кликнули по чекбоксу
  list.addEventListener("click", function (evt) {
    if (evt.target.tagName === 'INPUT') {
      if (evt.target.checked) {
        for (let i=0; i<newTasksLS.length; i++){
          if (newTasksLS[i].id == evt.target.id) {
            newTasksLS[i].checkboxStatus = true;
          localStorage.setItem("tasks", JSON.stringify(newTasksLS));
          } 
        }
        return;
      } else {
        for (let i=0; i<newTasksLS.length; i++){
          if (newTasksLS[i].id == evt.target.id) {
            newTasksLS[i].checkboxStatus = false;
          localStorage.setItem("tasks", JSON.stringify(newTasksLS));
          }
        }
        return;
      }
    }
  })
}

//функция очистить список от задач
const clearAllTasks = () => {
  
  //очистили хранилище
  localStorage.removeItem("tasks");

  //чистим DOM
  const removeChilds = (parent) => {
      while (parent.lastChild) {
          parent.removeChild(parent.lastChild);
      }
  };
  removeChilds(list); 

  //вернули поле "нет задач"
  noTasksMessage.classList.remove("textNoTasks_none");

  //отключаем кнопку
  btnClear.disabled = true;
}