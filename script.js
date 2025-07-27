let task_section = document.getElementById('task_section');
let tasks = 1
let increment = 1
let store_task = []
let feature_add_task = () => {
  if (task_section.children[0].className == 'empty_msg') {
    task_section.children[0].remove()
  };
  let user_input = document.getElementById('user_task');
  task_section.insertAdjacentHTML('beforeend',
    `<div id="new_task">
    <h3 id="task_name"><button onclick="striking(this)" id="tick_mark_btn"></button>${user_input.value}</h3>
      <button id="Edit_Task" onclick="feature_edit(this)">        <i><img src="icons/icons8-edit-100.png" alt="" srcset=""></i></button>
      <button id="remove_task" onclick="feature_remove_task(this)">
        <i id='delete_btn'><img src="icons/icons8-delete.svg" alt="" srcset="" /></i>
      </button>`)
    user_input.value = ''
    store_task.push(task_section.children[tasks].innerText)
    for (let i = 0; i < increment; i++) {
    localStorage.setItem(`task ${i}`,store_task[i])
    }
    tasks++
    increment++
};
let striking = (currElement) => {
  let element = currElement.parentElement;
  element.classList.toggle('strike');
  let icon = document.createElement('i');
  let image = document.createElement("img")
  if (currElement.childElementCount == 0) {
    image.src = 'icons/icons8-tick-box-96.png'
    icon.className = 'task_complete_icon'
    icon.appendChild(image)
    currElement.appendChild(icon)
  }
  else if (currElement.childElementCount >= 1) {
    currElement.firstElementChild.remove();
  }
}
let feature_remove_task = (currElement) => {
  let task = currElement.parentElement;
  task.remove();
  if (task_section.childElementCount == 0) {
    let emptyMsg = document.createElement('h3');
    emptyMsg.className = ('empty_msg');
    emptyMsg.textContent = 'No tasks';
    task_section.appendChild(emptyMsg)
  };
  tasks = tasks - 1
}
let feature_edit = (currElement) => {
  if (currElement.textContent == 'Edit' || currElement.childElementCount == 1) {
    let task_name = currElement.parentElement.children[0].textContent;
    let task = currElement.parentElement.children[0];
    let edit_name = document.createElement('input');
    edit_name.type = 'text'
    edit_name.placeholder = 'Task Name'
    edit_name.value = task_name.trim();
    edit_name.className = 'input_edit_name'
    currElement.textContent = 'Save'
    currElement.parentElement.replaceChild(edit_name, task);
  }
  else if (currElement.textContent == 'Save') {
    let task_name = currElement.parentElement.children[0].value;
    let task = currElement.parentElement.children[0];
    let edit_name = document.createElement('h3');
    edit_name.id = 'task_name'
    edit_name.textContent = task_name.trim();
    edit_name.insertAdjacentHTML("afterbegin", `<button onclick="striking(this)" id="tick_mark_btn">
        </button>`)
    currElement.textContent = ' '
    currElement.insertAdjacentHTML('afterbegin', `<i><img src="icons/icons8-edit-100.png" alt="" srcset=""></i>`)
    currElement.parentElement.replaceChild(edit_name, task);
  };
}
let add_btn = document.getElementById('add_task_btn');
add_btn.addEventListener('click', feature_add_task);

let tick_btn = document.getElementById('tick_mark_btn');
add_btn.addEventListener('click', striking);