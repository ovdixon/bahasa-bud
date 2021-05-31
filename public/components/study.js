import { list } from "postcss";

class timerNavigation {
    constructor(tabs, containers){
        this.containers = containers;
        this.tabs = tabs;
        this.currentTimer = null;
    }

    setTimer(timerId){
        this.currentTimer = timerId.split('-')[0];
        this.tabs.forEach((tab) => {
            tab.classList.remove('active-tab');
            if (tab.id == timerId){
                tab.classList.add('active-tab');
            }
        })
        
        this.containers.forEach((container) => {
			container.style.display = 'none';
		})
        var somelem = document.getElementById(timerId)
        document.getElementById(this.currentTimer).style.display = 'block';
    }
}



export function classicTimer(timer){
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

//https://stackoverflow.com/questions/34558116/re-starting-a-timer-after-stopping-it

export function pomodoroTimer(Timer){
    let startTimer = document.getElementById('startPomodoro');
    let setSession = document.getElementById('setSession');
    let setBreak = document.getElementById('setBreak');

    startTimer.addEventListener('click', event => {
        setPomodoro(Timer, 25);
    });

    setSession.addEventListener('click', event => {
        event.preventDefault();
        setPomodoro(Timer, sessionLength.value);
    });

    setBreak.addEventListener('click', event => {
        event.preventDefault();
        setPomodoro(Timer, breakLength.value);
    });
}

function setPomodoro(Timer, time){
    let startTimer = document.getElementById('startPomodoro');
    let pauseTimer = document.getElementById("pausePomodoro");
    let resetTimer = document.getElementById("resetPomodoro");
    var pomodoro = new Timer();
    pomodoro.start({countdown: true, startValues: {minutes: parseInt(time)}});

    startTimer.addEventListener('click', event => {
        pomodoro.start();
    });

    pauseTimer.addEventListener('click', event => {
        pomodoro.pause();
    });
    
    resetTimer.addEventListener('click', event => {
        document.getElementById('pomodoroTimer').innerHTML = "00:"+time+":00";
        pomodoro.reset();
    });

    pomodoro.addEventListener('secondsUpdated', function (e) {
        document.getElementById('pomodoroTimer').innerHTML = pomodoro.getTimeValues().toString();
    }); 
}


// FLASH

var flashCardArray = [];
var cardIndex; 

export function addFlashCard(question, answer){ 
    var active;
    if (flashCardArray.length == 0){
        active = true;
    } else {
        active = false;
    }
    let card = {
        question,
        answer,
        active
    }
    flashCardArray.push(card);
    renderFlashCards();
}

export function renderFlashCards(){
    let question = document.getElementById('qanda');
    if (flashCardArray.length == 0){
    } else{
        while(question.firstChild) question.removeChild(question.firstChild);
        indexFlashCard();
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
        flashCardArray[cardIndex].active = false;
        if (dir == true){
            if ((cardIndex+1)==flashCardArray.length){
                flashCardArray[0].active = true;
            } else {
                flashCardArray[cardIndex + 1].active = true;
            }
        }
        else if (dir == false){
            if ((cardIndex-1) < 0){
                flashCardArray[flashCardArray.length-1].active = true;
            } else {
                flashCardArray[cardIndex - 1].active = true;
            }
        }
        renderFlashCards();
    }
}

export function deleteFlashCard(){
    flashCardArray.splice(cardIndex, 1);
    cardIndex - 1;
    renderFlashCards();
}

export function emptyTaskList(){
    let taskList = document.getElementById('task-list');
    let emptyList = document.createElement('li');
    emptyList.textContent = "Add some tasks"
    taskList.appendChild(emptyList);
}

export function getAcronym(words){
    
    const generator = require('@devdhera/acronym');
    let showAcronym = document.getElementById('showAcronym');


    generator(words, (err, resp) => {
        if (err) {
        console.log(err);
    }
        showAcronym.textContent = resp;
    });
}

function indexFlashCard(){
    for (var i=0; i<flashCardArray.length; i++){
        if (flashCardArray[i].active == true){
            cardIndex = i;
        }
    }
}




export default timerNavigation
