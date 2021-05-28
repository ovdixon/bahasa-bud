import { list } from "postcss";

class timerNavigation {
    constructor(tabs, containers){
        this.containers = containers;
        this.tabs = tabs;
        this.currentTimer = null;
    }

    setTimer(timerId){
        this.currentTimer = timerId;

        this.tabs.forEach((tab) => {
            tab.firstElementChild.classList.remove('active-tab');
            if (tab.id == timerId){
                tab.firstElementChild.classList.add('active-tab');
            }
        })
        this.containers.forEach((container) => {
			container.style.display = 'none';
		})
        var somelem = document.getElementById(timerId)
        document.getElementById(timerId+'-container').style.display = 'block';
    }
}



export function classicTimer(timer){
    let startTimer = document.getElementById("classic-container").getElementsByClassName("startTimer").item(0);
    let pauseTimer = document.getElementById("classic-container").getElementsByClassName("pauseTimer").item(0);
    let resetTimer = document.getElementById("classic-container").getElementsByClassName("resetTimer").item(0);

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

}

//https://stackoverflow.com/questions/34558116/re-starting-a-timer-after-stopping-it

export function pomodoroTimer(Timer){
    let startTimer = document.getElementById("pomodoro-container").getElementsByClassName("startTimer").item(0);
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
    let startTimer = document.getElementById("pomodoro-container").getElementsByClassName("startTimer").item(0);
    let pauseTimer = document.getElementById("pomodoro-container").getElementsByClassName("pauseTimer").item(0);
    let resetTimer = document.getElementById("pomodoro-container").getElementsByClassName("resetTimer").item(0);
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

var flashCardArray = [];

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
    setCardDeck(null);
}



export function setCardDeck(move){
    let question = document.getElementsByClassName('question')[0];
    let answer = document.getElementsByClassName('answer')[0];

    var cardIndex; 

    for (var i=0; i<flashCardArray.length; i++){
        if (flashCardArray[i].active == true){
            cardIndex = i;
        }
    }

    if (move === 'next'){
        cardIndex += 1;
    }

    console.log(cardIndex);
    console.log(flashCardArray);

    question.innerHTML = flashCardArray[cardIndex].question;
    answer.innerHTML = flashCardArray[cardIndex].answer;
 }

export default timerNavigation
