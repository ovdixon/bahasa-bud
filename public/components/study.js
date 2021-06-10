import { list } from "postcss";

// NPM library sources
const generator = require('@devdhera/acronym');

class timerNavigation {
    // create timer nav object and set values of object properties
    constructor(tabs, containers){
        this.containers = containers;
        this.tabs = tabs;
        this.currentTimer = null;
    }
    // set class of active timer and clear class of non-active timer
    setTimer(timerId){
        this.currentTimer = timerId.split('-')[0];
        this.tabs.forEach((tab) => {
            tab.classList.remove('active-tab');
            if (tab.id == timerId){
                tab.classList.add('active-tab');
            }
        })
        // hide non active timer
        this.containers.forEach((container) => {
			container.style.display = 'none';
		})
        document.getElementById(this.currentTimer).style.display = 'block'; // show active timer
    }
}



export function classicTimer(timer){
    // timer control buttons
    let startTimer = document.getElementById("startClassic");
    let pauseTimer = document.getElementById("pauseClassic");
    let resetTimer = document.getElementById("resetClassic");

    startTimer.addEventListener('click', event => {
        timer.start();
    });
    
    pauseTimer.addEventListener('click', event => {
        timer.pause();
    });
    
    resetTimer.addEventListener('click', event => {
        timer.reset();
    });
    
    // update timer values in html
    timer.addEventListener('secondsUpdated', function (e) {
        document.getElementById('classicTime').innerHTML = timer.getTimeValues().toString();
    });
    
    
    timer.addEventListener('started', function (e) {
        document.getElementById('classicTime').innerHTML = timer.getTimeValues().toString();
    });
    
    timer.addEventListener('reset', function (e) {
        document.getElementById('classicTime').innerHTML = timer.getTimeValues().toString();
    });

}

export function pomodoroTimer(Timer){
    // default pomodoro times
    var pomodoroStart = 25;
    var pomodoroBreak = 5;
    
    // pomodoro control buttons and custom inputs
    let startTimer = document.getElementById('startPomodoro');
    let pauseTimer = document.getElementById("pausePomodoro");
    let resetTimer = document.getElementById("resetPomodoro");
    let setSession = document.getElementById('sessionLength');
    let setBreak = document.getElementById('breakLength');

    // set html value of default start time
    document.getElementById('pomodoroTimer').innerHTML = "00:"+pomodoroStart+":00";

    // listen to change to start time and update html accordingly
    setSession.addEventListener('input', function (evt) {
        pomodoroStart = this.value;
        document.getElementById('pomodoroTimer').innerHTML = "00:"+pomodoroStart+":00";
        pomodoro.stop();
    });

    // listen to change to break time and update html accordingly
    setBreak.addEventListener('input', function (evt) {
        pomodoroBreak = this.value;
        document.getElementById('pomodoroTimer').innerHTML = "00:"+pomodoroBreak+":00";
    });

    // create new easytimer.js object
    var pomodoro = new Timer();
    
    startTimer.addEventListener('click', event => {
        var t = document.getElementById('pomodoroTimer').innerHTML.split(':');
        var mins = parseInt(t[1]);
        pomodoro.start({countdown: true, startValues: {minutes: mins}, target: {minutes: 0}}); // set timer as countdown with starting value from input value
    });

    pauseTimer.addEventListener('click', event => {
        pomodoro.pause();
    });
    
    resetTimer.addEventListener('click', event => {
        document.getElementById('pomodoroTimer').innerHTML = "00:"+pomodoroStart+":00";
        pomodoro.reset();
        pomodoro.pause();
    });

    pomodoro.addEventListener('secondsUpdated', function (e) {
        document.getElementById('pomodoroTimer').innerHTML = pomodoro.getTimeValues().toString();
    }); 

    // once session time is finished start break timer
    pomodoro.addEventListener('targetAchieved', function (e) {
        pomodoro.start({countdown: true, startValues: {minutes: pomodoroBreak}});
    });
}
// array to store card objects
var flashCardArray = [];
var cardIndex; 

export function addFlashCard(question, answer){ 
    var active;
    // if no cards added then first card will be active
    if (flashCardArray.length == 0){
        active = true;
    } else {
        active = false;
    }
    // new card object with values frpm add card input
    let card = {
        question,
        answer,
        active
    }
    // add new card to array and render card stack
    flashCardArray.push(card);
    renderFlashCards();
}

export function renderFlashCards(){
    let question = document.getElementById('qanda');
    if (flashCardArray.length == 0){
    } else{ // if card stack not empty render cards
        while(question.firstChild) question.removeChild(question.firstChild);
        indexFlashCard();
        // redner flash cards to html through card values
        let questionText = document.createElement("li");
        questionText.classList.add("questionText");
        let answerText = document.createElement("li");
        answerText.classList.add("answerText");
        questionText.innerText = flashCardArray[cardIndex].question;
        answerText.innerText = flashCardArray[cardIndex].answer;
        question.appendChild(questionText);
        question.appendChild(answerText);
    }
}

export function nextFlashCard(dir){
    if (flashCardArray.length !== 0){
        flashCardArray[cardIndex].active = false; // set current card value as not active
        // dir = true refers to direction going to next card
        if (dir == true){
            // set active value of next card as true
            if ((cardIndex+1)==flashCardArray.length){
                flashCardArray[0].active = true;
            } else {
                flashCardArray[cardIndex + 1].active = true;
            }
        }
        // dir = false refers going back to previous card
        else if (dir == false){
            if ((cardIndex-1) < 0){
                flashCardArray[flashCardArray.length-1].active = true;
            } else {
                flashCardArray[cardIndex - 1].active = true;
            }
        }
        // render cards with new active status
        renderFlashCards();
    }
}

// function for finding numerical index of currently active flash card
function indexFlashCard(){
    for (var i=0; i<flashCardArray.length; i++){
        if (flashCardArray[i].active == true){
            cardIndex = i;
        }
    }
}

// if no tasks added show empty state message
export function emptyTaskList(){
    let taskList = document.getElementById('task-list');
    let emptyList = document.createElement('li');
    emptyList.textContent = "Add some tasks"
    taskList.appendChild(emptyList);
}

export function getAcronym(words){
    let showAcronym = document.getElementById('showAcronym');

    // new generator object from acronym library
    generator(words, (err, resp) => {
        if (err) {
        console.log(err);
    }
    // display newly created acronym on page
        let listItem = document.createElement('li');
        listItem.textContent = resp +" = "+words;
        showAcronym.appendChild(listItem);
    });
}

export default timerNavigation
