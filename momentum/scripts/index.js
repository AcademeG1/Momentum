function showTime() { // функция времени
    const date = new Date();
    document.querySelector('.time').textContent = date.toLocaleTimeString();
    setInterval(showTime, showDate, showGreeting, 1000);
}

showTime();

function showDate(lang = 'ru-Ru') { // функция даты
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    document.querySelector('.date').textContent = date.toLocaleDateString(lang, options);
}

showDate('en-En');

function getTimeOfDay() { // функция врмени дня
    const date = new Date();
    const timeCycle = ['morning', 'afternoon', 'evening', 'night'];
    return timeCycle[Math.floor(date.getHours()/6)-1];
}

function showGreeting() { // вывод пожелания с функцией времени дня
    const timeOfDay = getTimeOfDay();
    document.querySelector('.greeting').textContent = `Good ${timeOfDay}`;
}

showGreeting();

function setLocalStorage() { // запись имени в локал
    const name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage); // перед обновление


function getLocalStorage() { // получение имени из локал
    const name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage); // перед загрузкой

function getRandomNum() { // функция рандома
    const num = String(Math.floor(Math.random() * (21 - 1) + 1));
    return num.padStart(2, '0');
}

async function setBg(number) { // установка фона
    const timeOfDay = getTimeOfDay();
    let bgNum = number;
    // document.body.style.background = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`
    let img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = function() {
        document.body.style.backgroundImage = 'url(' + img.src + ')';
    };
}

let randomNum = getRandomNum(); // получения числа от 1 до 20
setBg(randomNum); // и устновка фона

document.querySelector('.slide-next').addEventListener('click', getSlideNext); // кнопка вперед
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev); // кнопка назад

function getSlideNext() { // кнопка вперед, обработка
    if (randomNum === '20' || +randomNum + 1 === 21) {
        randomNum = '01';
    } else {
        randomNum++;
        randomNum = String(randomNum).padStart(2, '0')
    }
    setBg(randomNum);
}

function getSlidePrev() { // кнопка назад обработка
    if (randomNum === '0' || +randomNum - 1 === 0) {
        randomNum = '20';
    } else {
        randomNum--;
        randomNum = String(randomNum).padStart(2, '0')
    }
    setBg(randomNum);
}

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

city.addEventListener('change', () => { // отслеживание события изменения города
    getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`);
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
})

async function getWeather(url) { // асинхронная функция для получения погоды
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=ru&appid=a4d4f1ee98bf610a89f036359e940935&units=metric`;
    const res = await fetch(url)
    const data = await res.json();
    // console.log(data.weather[0].id, data.weather[0].description, data.main.temp)
    if (data.cod === 200) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        document.querySelector('.weather-error').textContent = '';
    } else {
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        document.querySelector('.weather-error').textContent = `${data.message}`;
    }
    
}

getWeather('https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=ru&appid=a4d4f1ee98bf610a89f036359e940935&units=metric');

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() { // генератор цитат
    const fileRoute = './data.json';
    const res = await fetch(fileRoute);
    const data = await res.json();
    console.log(data);
    const randomQuotesNumber = Math.floor(Math.random()*data.length);
    quote.textContent = `${data[randomQuotesNumber].text}`;
    author.textContent = `${data[randomQuotesNumber].author}`;
 }

// или
// function getQuotes() {
//     const fileRoute = './data.json';
//     fetch(fileRoute)
//         .then(res => res.json())
//         .then(
//             (data) => console.log(data)
//         );
// }
 getQuotes();
 document.querySelector('.change-quote').addEventListener('click', getQuotes);