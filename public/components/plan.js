var taskListArray = [];

export function addTask(taskDescription, dueDate, estimatedTime, priorityRating, completionStatus) {
    let task = {
      taskDescription,
      dueDate,
      priorityRating,
      estimatedTime,
      completionStatus
    };
    taskListArray.push(task);
    setStorage();
    renderCovey(task);
}

function renderCovey(task){
  let item = document.createElement('li');
  item.innerHTML = task.taskDescription
  let urgent = urgencyCalc(task.dueDate);
  let important = importanceCalc(task.priorityRating);

  if (urgent && important){
    var taskList = document.getElementById('iu-li');
  }
  else if (!urgent && important){
    var taskList = document.getElementById('nu-li');
  }
  else if (urgent && !important){
    var taskList = document.getElementById('in-li');
  }
  else{
    var taskList = document.getElementById('nn-li');
  }
  taskList.appendChild(item); 
  let delButton = document.createElement("button")
  let delButtonText = document.createTextNode("x")
  delButton.appendChild(delButtonText);
  delButton.classList.add("delTask");
  item.appendChild(delButton);

  

  delButton.addEventListener("click", function(event){
    event.preventDefault;
    item.remove();
    let index = taskListArray.indexOf(task);
    if(index !== -1) {
      taskListArray.splice(index, 1);
    }
    setStorage();
    
  })
  

}

function importanceCalc(rating){
  if (rating === "High" || rating === "Medium"){
    return true
  }
  else {
    return false
  }

}

[{"taskDescription":"hey","dueDate":"","priorityRating":"","estimatedTime":"","completionStatus":false}]

function urgencyCalc(taskDate){
  let urgencyDate = averageDate(taskListArray);
  let dueDate = new Date(taskDate);

  if (dueDate < urgencyDate){
    return true;
  }
  else {
    return false;
  }

}

function averageDate(taskListArray){
  let len = taskListArray.length;
  if (len > 1){
    let dateSum = 0
    for (let i=0;i<len;i++){
      let day = new Date(taskListArray[i].dueDate);
      dateSum += (day.getTime() / 1000); 
    }
    let averageUnix = (dateSum / len * 1000);
    let averageDate = new Date(averageUnix);
    return averageDate;
  }
  else {
    let someDate = new Date();
    let daysToAdd = 3;
    someDate.setDate(someDate.getDate() + daysToAdd); 
    return someDate
  }
}
  

function setStorage(){
  localStorage.setItem("tasks",JSON.stringify(taskListArray));
  let storedTasks =  JSON.parse(localStorage.getItem("tasks"));
  showTasks();
}

function showTasks(){
  let storedTasks =  JSON.parse(localStorage.getItem("tasks"));
  let taskList = document.getElementById('task-list');
  while(taskList.firstChild) taskList.removeChild(taskList.firstChild);

  for (var i=0; i<storedTasks.length; i++){
      var taskValue = storedTasks[i].taskDescription;
      let taskCompleted = storedTasks[i].completionStatus;
      let taskUrgency = urgencyCalc(storedTasks[i].dueDate);
      let Taskimportance = importanceCalc(storedTasks[i].priorityRating);
      if (taskUrgency === true){
        taskValue += "  ⏳";
      }
      if (Taskimportance === true){
        taskValue += " ❗️";
      }

      let listItem = document.createElement('li');
      listItem.classList.add('uncompleted');
      listItem.textContent = taskValue;
      taskList.appendChild(listItem);
      let iter = i;

      listItem.addEventListener('click', event => {

          if (listItem.className === 'uncompleted'){
              listItem.classList.remove('uncompleted');
              listItem.classList.add('completed');
          }
          else if (listItem.className === 'completed'){
              listItem.classList.remove('completed');
              listItem.classList.add('uncompleted');
          }
          

      });
  }
}
