const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown;

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const timestamp = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(timestamp);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((timestamp - Date.now()) / 1000);
        console.log(secondsLeft);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    //Math.floor(取得最大整數)
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    console.log({minutes, remainderSeconds});

    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);

    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour -  12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){
    // e.preventDefault 避免form.submit 跳轉
    e.preventDefault();
    // this 的用法 不能用ES6的函數方式
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})