/* IMPORT MODULES */
import pageNavigation from './components/navigation'
import {addTask} from './components/plan'
import timerNavigation, { classicTimer, pomodoroTimer, addFlashCard, nextFlashCard, renderFlashCards, emptyTaskList, getAcronym } from './components/study'

/* PAGE NAVIGATION */
const links = document.querySelectorAll('nav > ul > li > a');
const pages = document.querySelectorAll('.page-container');
const dividers = document.querySelectorAll('nav > ul > hr')

var nav = new pageNavigation(links, pages, dividers); // instantiate new page nav object from module

nav.links.forEach(function(link) { // listener for each link to set as new page
	link.addEventListener('click', function() {
		let pageId = nav.getHash(link);
		nav.setPage(pageId);
	}) 
})

/* ADD TASK */
const taskForm = document.querySelector('.add-tasks');

function addTaskForm(event){
  event.preventDefault(); // prevent page reloading on form submit
  let task = taskInput.value;
  let estimatedTime = estimatedTimeInput.value;
  let dueDate = dueDateInput.value;
  let priority = priorityInput.options[priorityInput.selectedIndex].value
  addTask(task, dueDate, estimatedTime, priority, false);
  taskForm.reset();
  return false; // onclick event so return false
}
window.addTaskForm = addTaskForm; // prevent window reload on form submit

emptyTaskList(); // if no tasks added show empty state message

/* TIMER NAVIGATION */
const timerContainers = document.querySelectorAll('.timers');
const timerTabs = document.querySelector('.tabs').querySelectorAll('h3');

var timerNav = new timerNavigation(timerTabs, timerContainers); //instantiate new timer nav object from module

timerNav.tabs.forEach(function(tab) {
  tab.addEventListener('click', function(){
    timerNav.setTimer(tab.id) //show timer on nav click
  })
})

/* CLASSIC TIMER */
var Timer = require("easytimer.js").Timer; // call easytimer.js library
var timer = new Timer();
classicTimer(timer);


/*  POMDOORO TIMER  */
pomodoroTimer(Timer); // call function from module

/* FLASH CARDS */

const nextCard = document.getElementById('nextCard');
const backCard = document.getElementById('backCard');

renderFlashCards(); // show added cards in stack

nextCard.addEventListener('click', function(){
  nextFlashCard(true);
})

backCard.addEventListener('click', function(){
  nextFlashCard(false);
})

var addCard = document.getElementById('addCard');
addCard.addEventListener('click', event => {
  event.preventDefault(); // prevent page reload on form submit
  let question = cardQuestion.value;
  let answer = cardAnswer.value;
  addFlashCard(question, answer); // create new card object from form values and add to stack
});


/* ACRONYM MAKER */
var generateAcronym = document.getElementById('generateAcronym');
generateAcronym.addEventListener('click', event => {
  event.preventDefault(); // prevent page reload on form submit
  let words = acronymWords.value; 
  console.log(words)
  getAcronym(words); // call acronym function from module
});

