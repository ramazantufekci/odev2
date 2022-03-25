let ulDom = document.querySelector('#list');
let task = document.querySelector('#task');
let toastSuccess = document.querySelector(".success");
let toastError = document.querySelector(".error");
let toastDelete = document.querySelector(".delete");
let taskList = [];
ulDom.addEventListener('click',ulIslemleri);

function newElement(){
    let taskValue = task.value.trim();
    if(taskValue.length==0){
        toastGoster(toastError);
    }else{
        todoEkle(taskValue);
    }
    

}

//taskList e ekleme yapar
function todoEkle(item){
    const todo = {
        id:Date.now(),
        name:item,
        completed:false
    };
    taskList.push(todo);
    addLocalStorage(taskList);
    task.value = '';
    toastGoster(toastSuccess);
}
//local storage a todoları ekler
function addLocalStorage(taskList){
    localStorage.setItem('todos',JSON.stringify(taskList));
    todoIsle(taskList);
}

function todoIsle(taskList){
    ulDom.innerHTML = '';
    taskList.forEach(function(item){
        const checked = item.completed?'checked':null;
        const li = document.createElement("li");
        li.setAttribute('class','item');
        li.setAttribute('data-key',item.id);
        if(item.completed === true){
            li.classList.add('checked');
        }

        li.innerHTML = `
        ${item.name}
        <button type="button" class="btn btn-danger btn-sm float-right">X</button>
        `;
        ulDom.append(li);
    })
}

function toastGoster(toast){
    let toastShow = new bootstrap.Toast(toast);
    toastShow.show(); 
}

function toggle(id) {
    taskList.forEach(function(item) {
      // use == not ===, because here types are different. One is number and other is string
      if (item.id == id) {
        // toggle the value
        item.completed = !item.completed;
      }
    });
  
    addLocalStorage(taskList);
  }

  function todoSil(id) {
    // filters out the <li> with the id and updates the todos array
    taskList = taskList.filter(function(item) {
      // use != not !==, because here types are different. One is number and other is string
      return item.id != id;
    });
  
    // update the localStorage
    addLocalStorage(taskList);
  }
//ul event i
function ulIslemleri(e){
    //li için işlem yapar
    if (e.target.classList.contains('item')) {
        toggle(e.target.getAttribute('data-key'));
    }
    else {
        //butona baılmışsa işlem yapar
        if(e.target.type === 'button'){
            todoSil(e.target.parentElement.getAttribute('data-key'));
            toastGoster(toastDelete);
        }
    }
}
//sayfa ilk açıldığında todo ları getirir
function getLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
      taskList = JSON.parse(reference);
      todoIsle(taskList);
    }
}

getLocalStorage();



