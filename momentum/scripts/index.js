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
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
    const name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)