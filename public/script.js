import pageNavigation from './components/navigation'
import {addTask} from './components/plan'
import timerNavigation from './components/study'


const links = document.querySelectorAll('nav > ul > li > a');
const pages = document.querySelectorAll('.page-container');
const dividers = document.querySelectorAll('nav > ul > hr')


// PAGE NAV

var nav = new pageNavigation(links, pages, dividers);

nav.links.forEach(function(link) {
	link.addEventListener('click', function() {
		let pageId = nav.getHash(link)
		nav.setPage(pageId)
	})
})

// ADD TASK

const taskForm = document.querySelector('.add-task');

document.getElementById('add-task').addEventListener('click', function(event){
  event.preventDefault();
  let task = taskInput.value;
  let estimatedTime = estimatedTimeInput.value;
  let dueDate = dueDateInput.value;
  let priority = priorityInput.options[priorityInput.selectedIndex].value
  console.log('success')
  addTask(task, dueDate, estimatedTime, priority, false);
  //taskForm.reset();
})

// TIMER NAV

const timerContainers = document.querySelectorAll('.timer-container');
const timerTabs = document.querySelectorAll('.timer-tab');


var timerNav = new timerNavigation(timerTabs, timerContainers);1

timerNav.tabs.forEach(function(tab) {
  tab.addEventListener('click', function(){
    timerNav.setTimer(tab.id)
  })
})

// CLASSIC TIMER
var Timer = require("easytimer.js").Timer;
const startTimer = document.querySelectorAll('.startTimer')[0]
const pauseTimer = document.querySelectorAll('.pauseTimer')[0]
const resetTimer = document.querySelectorAll('.resetTimer')[0]

startTimer.click(function(){
  
})

var timer = new Timer();


startTimer.addEventListener('click', event => {
  timer.start();
});

pauseTimer.addEventListener('click', event => {
  timer.pause();
});

resetTimer.addEventListener('click', event => {
  timer.reset();
});


timer.addEventListener('secondsUpdated', function (e) {
  document.getElementById('classicTimer').innerHTML = timer.getTimeValues().toString();
});


timer.addEventListener('started', function (e) {
  document.getElementById('classicTimer').innerHTML = timer.getTimeValues().toString();
});

timer.addEventListener('reset', function (e) {
  document.getElementById('classicTimer').innerHTML = timer.getTimeValues().toString();
});



