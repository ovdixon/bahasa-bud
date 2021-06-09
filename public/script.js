import pageNavigation from './components/navigation'
import {addTask} from './components/plan'
import timerNavigation, { classicTimer, pomodoroTimer, addFlashCard, nextFlashCard, renderFlashCards, emptyTaskList, getAcronym, printFlashCards } from './components/study'

const links = document.querySelectorAll('nav > ul > li > a');
const pages = document.querySelectorAll('.page-container');
const dividers = document.querySelectorAll('nav > ul > hr')


// PAGE NAV


var nav = new pageNavigation(links, pages, dividers);

nav.links.forEach(function(link) {
	link.addEventListener('click', function() {
		let pageId = nav.getHash(link);
		nav.setPage(pageId);

	})
  
})




// ADD TASK

const taskForm = document.querySelector('.add-tasks');

function addTaskForm(event){
  event.preventDefault();
  let task = taskInput.value;
  let estimatedTime = estimatedTimeInput.value;
  let dueDate = dueDateInput.value;
  let priority = priorityInput.options[priorityInput.selectedIndex].value
  addTask(task, dueDate, estimatedTime, priority, false);
  taskForm.reset();
  return false;
}


window.addTaskForm = addTaskForm;

// TIMER NAV

const timerContainers = document.querySelectorAll('.timers');
const timerTabs = document.querySelector('.tabs').querySelectorAll('h3');



var timerNav = new timerNavigation(timerTabs, timerContainers);

timerNav.tabs.forEach(function(tab) {
  tab.addEventListener('click', function(){
    timerNav.setTimer(tab.id)
  })
})

// CLASSIC TIMER
var Timer = require("easytimer.js").Timer;

var timer = new Timer();

classicTimer(timer);


// POMDOORO TIMER
pomodoroTimer(Timer);

// SHOW TASKS
//let tasks = localStorage.getItem("tasks");


// FLASH CARDS

const nextCard = document.getElementById('nextCard');
const backCard = document.getElementById('backCard');
const deleteCard = document.getElementById('deleteCard');

renderFlashCards();

nextCard.addEventListener('click', function(){
  nextFlashCard(true);
})


backCard.addEventListener('click', function(){
  nextFlashCard(false);
})

/*
deleteCard.addEventListener('click', function(){
  deleteFlashCard();
})
*/

var addCard = document.getElementById('addCard');
addCard.addEventListener('click', event => {
  event.preventDefault();
  let question = cardQuestion.value;
  let answer = cardAnswer.value;
  addFlashCard(question, answer);
});

emptyTaskList();


// ACRONYM MAKER


var timerNav = new timerNavigation(timerTabs, timerContainers);

var generateAcronym = document.getElementById('generateAcronym');
generateAcronym.addEventListener('click', event => {
  event.preventDefault();
  let words = acronymWords.value;
  console.log(words)
  getAcronym(words);
});

