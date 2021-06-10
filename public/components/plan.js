// array to store task objects
var taskListArray = [];

export function addTask(taskDescription, dueDate, estimatedTime, priorityRating, completionStatus) {
  // new task object
    let task = {
      taskDescription,
      dueDate,
      priorityRating,
      estimatedTime,
      completionStatus
    };
    // add newly created task to array
    taskListArray.push(task);
    // set task lists to local storage
    setStorage();
    // render covery quadrants with new task
    renderCovey(task);
}

function renderCovey(task){
  let item = document.createElement('li');
  item.innerHTML = task.taskDescription;
  // urgency and importance values decide which quadrant the task will be placed
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
  // create to remove task from covey and task list
  let delButton = document.createElement("button")
  let delButtonText = document.createTextNode("x")
  delButton.appendChild(delButtonText);
  delButton.classList.add("delTask");
  item.appendChild(delButton);

  
  // if remove button clicked remove from array and 
  delButton.addEventListener("click", function(event){
    event.preventDefault; // prevent page reload on click
    item.remove();
    let index = taskListArray.indexOf(task);
    if(index !== -1) {
      taskListArray.splice(index, 1); // remove task from array
    }
    setStorage(); //update local storage
  })
}
// function to calculate the importance of task based on input values
function importanceCalc(rating){
  if (rating === "High" || rating === "Medium"){
    return true
  }
  else {
    return false
  }
}

// function to calcualte task urgency based on input
function urgencyCalc(taskDate){
  let urgencyDate = averageDate(taskListArray); // set an urgency date with function
  let dueDate = new Date(taskDate);
  // if duedate is sooner than urgency date the task is considered urgent
  if (dueDate < urgencyDate){
    return true;
  }
  else {
    return false;
  }
}

function averageDate(taskListArray){
  let len = taskListArray.length;
  // if more than one task added
  // find the average due date of tasks and that becomes the urgency date
  // tasks with a due date less than the average are considerd urgent
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
  // if no tasks added
  // urgency date becomes deafualts to a date in 3 days time
  else {
    let someDate = new Date();
    let daysToAdd = 3;
    someDate.setDate(someDate.getDate() + daysToAdd); 
    return someDate
  }
}

// tasks are stored as an array of objects
// array is first stringified before JSON is set to storage
function setStorage(){
  localStorage.setItem("tasks",JSON.stringify(taskListArray));
  // call function to update tasks list on study page
  showTasks();
}

function showTasks(){
  // get array of tasks from local storage
  let storedTasks =  JSON.parse(localStorage.getItem("tasks"));
  let taskList = document.getElementById('task-list');
  while(taskList.firstChild) taskList.removeChild(taskList.firstChild);

  for (var i=0; i<storedTasks.length; i++){
      var taskValue = storedTasks[i].taskDescription;
      let taskCompleted = storedTasks[i].completionStatus;
      let taskUrgency = urgencyCalc(storedTasks[i].dueDate);
      let Taskimportance = importanceCalc(storedTasks[i].priorityRating);

      // display indicators for urgency & importance of tasks
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
      // if task is clicked set it as completed
      // tasks with class completed are then styles with a strikethrough
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
