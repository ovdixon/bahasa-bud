import { list } from "postcss";

// NPM library sources
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');  
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const generator = require('@devdhera/acronym');

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
    var pomodoroStart = 25;
    var pomodoroBreak = 5;
    
    let startTimer = document.getElementById('startPomodoro');
    let pauseTimer = document.getElementById("pausePomodoro");
    let resetTimer = document.getElementById("resetPomodoro");
    let setSession = document.getElementById('sessionLength');
    let setBreak = document.getElementById('breakLength');

    document.getElementById('pomodoroTimer').innerHTML = "00:"+pomodoroStart+":00";

    setSession.addEventListener('input', function (evt) {
        
        pomodoroStart = this.value;
        document.getElementById('pomodoroTimer').innerHTML = "00:"+pomodoroStart+":00";
        pomodoro.stop();
    });

    setBreak.addEventListener('input', function (evt) {
        pomodoroBreak = this.value;
        document.getElementById('pomodoroTimer').innerHTML = "00:"+pomodoroBreak+":00";
    });

    var pomodoro = new Timer();
    
    startTimer.addEventListener('click', event => {
        var t = document.getElementById('pomodoroTimer').innerHTML.split(':');
        var mins = parseInt(t[1]);
        pomodoro.start({countdown: true, startValues: {minutes: mins}, target: {minutes: 0}});
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

    pomodoro.addEventListener('targetAchieved', function (e) {
        pomodoro.start({countdown: true, startValues: {minutes: pomodoroBreak}});
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
    
    
    let showAcronym = document.getElementById('showAcronym');

    generator(words, (err, resp) => {
        if (err) {
        console.log(err);
    }
        let listItem = document.createElement('li');
        listItem.textContent = resp +" = "+words;
        showAcronym.appendChild(listItem);
    });
}

function indexFlashCard(){
    for (var i=0; i<flashCardArray.length; i++){
        if (flashCardArray[i].active == true){
            cardIndex = i;
        }
    }
}

/*

var docDefinition = {
    content: [
      {
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          widths: [ 250, 250],
          heights: [175, 175],
          alignment : 'center',
  
          body: [
            [ '\n \n \n \nFirst', 'Second' ],
            [ 'Value 1', 'Value 2']
          ]
        }
      }
    ]
  };



  export function printFlashCards(){
    console.log('pdf')
    pdfMake.createPdf(docDefinition).download();
    
}

*/


// WORKAROUND FOR VERTICALLY CENTRE TEXT IN TABLE CELL - https://github.com/bpampuch/pdfmake/issues/74#issuecomment-726181063
function findInlineHeight(cell, maxWidth, usedWidth = 0) {
    let calcLines = (inlines) => {
        if (inlines == undefined)
            return {
                height: 0,
                width: 0,
            };
        let currentMaxHeight = 0;
        for (const currentNode of inlines) {
            usedWidth += currentNode.width;
            if (usedWidth > maxWidth) {
              currentMaxHeight += currentNode.height;
              usedWidth = currentNode.width;
            } else {
              currentMaxHeight = Math.max(currentNode.height, currentMaxHeight);
            }
        }
        return {
            height: currentMaxHeight,
            width: usedWidth,
        };
    }
    if (cell._offsets) {
      usedWidth += cell._offsets.total;
    }
    if (cell._inlines && cell._inlines.length) {
        return calcLines(cell._inlines);
    }  else if (cell.stack && cell.stack[0]) {
        return cell.stack.map(item => {
            return calcLines(item._inlines);
        }).reduce((prev, next) => {
            return {
            height: prev.height + next.height,
            width: Math.max(prev.width + next.width)
            };
        });
    } else if (cell.table) {
      let currentMaxHeight = 0;
      for (const currentTableBodies of cell.table.body) {
        const innerTableHeights = currentTableBodies.map((innerTableCell) => {
          const findInlineHeight = this.findInlineHeight(
            innerTableCell,
            maxWidth,
            usedWidth
          );

          usedWidth = findInlineHeight.width;
          return findInlineHeight.height;
        });
        currentMaxHeight = Math.max(...innerTableHeights, currentMaxHeight);
      }
      return {
        height: currentMaxHeight,
        width: usedWidth,
      };
    } else if (cell._height) {
      usedWidth += cell._width;
      return {
        height: cell._height,
        width: usedWidth,
      };
    }

    return {
      height: null,
      width: usedWidth,
    };
}

function applyVerticalAlignment(node, rowIndex, align) {
    const allCellHeights = node.table.body[rowIndex].map(
      (innerNode, columnIndex) => {
        const mFindInlineHeight = findInlineHeight(
          innerNode,
          node.table.widths[columnIndex]._calcWidth
        );
        return mFindInlineHeight.height;
      }
    );
    const maxRowHeight = Math.max(...allCellHeights);
    node.table.body[rowIndex].forEach((cell, ci) => {
      console.log(cell, maxRowHeight, allCellHeights[ci])
      if (allCellHeights[ci] && maxRowHeight > allCellHeights[ci]) {
        let topMargin;
        if (align === 'bottom') {
          topMargin = maxRowHeight - allCellHeights[ci];
        } else if (align === 'center') {
          topMargin = (maxRowHeight - allCellHeights[ci]) / 2;
        }
        if (cell._margin) {
          cell._margin[1] = topMargin;
        } else {
          cell._margin = [0, topMargin, 0, 0];
        }
      }
    });
}


export default timerNavigation
