function showTime() {
    const date = new Date();
    document.querySelector('.time').textContent = date.toLocaleTimeString();
    setInterval(showTime, showDate, showGreeting, 1000);
}

showTime();

function showDate(lang = 'ru-Ru') {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    document.querySelector('.date').textContent = date.toLocaleDateString(lang, options);
}

showDate('en-En');

function getTimeOfDay() {
    const date = new Date();
    const timeCycle = ['morning', 'afternoon', 'evening', 'night'];
    return timeCycle[Math.floor(date.getHours()/6)-1];
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    document.querySelector('.greeting').textContent = `Good ${timeOfDay}`;
}

showGreeting();

function setLocalStorage() {
    const name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);


function getLocalStorage() {
    const name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);

function getRandomNum() {
    const num = String(Math.floor(Math.random() * (21 - 1) + 1));
    return num.padStart(2, '0');
}

async function setBg(number) {
    const timeOfDay = getTimeOfDay();
    let bgNum = number;
    // document.body.style.background = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`
    let img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = function() {
        document.body.style.backgroundImage = 'url(' + img.src + ')';
    };
}

let randomNum = getRandomNum();
setBg(randomNum);

document.querySelector('.slide-next').addEventListener('click', getSlideNext);
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev);

function getSlideNext() {
    if (randomNum === '20' || +randomNum + 1 === 21) {
        randomNum = '01';
    } else {
        randomNum++;
        randomNum = String(randomNum).padStart(2, '0')
    }
    setBg(randomNum);
}

function getSlidePrev() {
    if (randomNum === '0' || +randomNum - 1 === 0) {
        randomNum = '20';
    } else {
        randomNum--;
        randomNum = String(randomNum).padStart(2, '0')
    }
    setBg(randomNum);
}