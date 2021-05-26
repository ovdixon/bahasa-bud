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

export default timerNavigation