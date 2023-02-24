import playList from "./playlist.js";
import { greetingTranslation } from "./translete.js";
import { setBg } from "./showBgMethod.js";

let LANG;
let setting = [];
if (localStorage.getItem('setting') == null) {
    setting = [true, true, true, true];
} else {
    setting = JSON.parse(localStorage.getItem('setting'));
};

if (!setting[0]) {
    document.querySelector('.player').classList.toggle('disp');
}
if (!setting[1]) {
    document.querySelector('.weather').classList.toggle('disp');
}
if (!setting[2]) {
    document.querySelector('.searchPanel').classList.toggle('disp');
}
if (!setting[3]) {
    document.querySelector('.footer').classList.toggle('disp');
}

if (localStorage.getItem('lang') == null) {
    LANG = 'en';
} else {
    LANG = localStorage.getItem('lang');
}

let timer = setInterval(showTime, showDate, showGreeting, 1000);

if (localStorage.getItem('bgSelector') === null) {
    localStorage.setItem('bgSelector', JSON.stringify('standart'));
} 

function showTime() { // функция времени
    const date = new Date();
    document.querySelector('.time').textContent = date.toLocaleTimeString();
    clearInterval(timer);
    timer = setInterval(showTime, showDate, showGreeting, 1000);
}

showTime();

export function showDate(lang = 'ru-Ru') { // функция даты
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    document.querySelector('.date').textContent = date.toLocaleDateString(lang, options);
}

if (LANG == 'RU') {
    showDate('ru-Ru');
    getWeather(`https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=${'ru'}&appid=a4d4f1ee98bf610a89f036359e940935&units=metric`);
    showGreeting();
} else {
    showDate('en-En');
    getWeather(`https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=${'en'}&appid=a4d4f1ee98bf610a89f036359e940935&units=metric`);
    showGreeting();
}


function getTimeOfDay(lang) { // функция врмени дня
    const date = new Date();
    const timeCycle = greetingTranslation[LANG.toLowerCase()].timeDay;
    // if (date.getHours() > 4 && date.getHours() < 10) {
    //     return timeCycle[0];
    // } else if (date.getHours() > 10 && date.getHours() < 16) {
    //     return timeCycle[1];
    // } else if (date.getHours() > 16 && date.getHours() < 22) {
    //     return timeCycle[2];
    // } else {
    //     return timeCycle[3];
    // }
    return timeCycle[Math.floor(date.getHours()/6)-1];
}

function showGreeting() { // вывод пожелания с функцией времени дня
    const timeOfDay = getTimeOfDay(LANG.toLowerCase());
    document.querySelector('.greeting').textContent = `${timeOfDay}`;
}



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

// вынес отсюда

let randomNum = getRandomNum(); // получения числа от 1 до 20
if (JSON.parse(localStorage.getItem('bgSelector')) == 'standart') {
    setBg(randomNum, 'standart'); // и устновка фона
} else 
if (JSON.parse(localStorage.getItem('bgSelector')) == 'unsplash') {
    setBg(`https://api.unsplash.com/photos/random?orientation=landscape&query=${'nature'}&client_id=E8BRW2u_6WvCYHyNChd4OEa4g-l34ihoPPw_3lazJ10`, 'unsplash')
} else 
if (JSON.parse(localStorage.getItem('bgSelector')) == 'flickr') {
    setBg(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9c32d83e0a8290889207fb2cd9dfcd6b&tags=${'car'}&extras=url_l&format=json&nojsoncallback=1`, 'flickr');
}


document.querySelector('.slide-next').addEventListener('click', getSlideNext); // кнопка вперед
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev); // кнопка назад

function getSlideNext() { // кнопка вперед слайдера, обработка
    const settingBg = JSON.parse(localStorage.getItem('bgSelector'));
    console.log(settingBg)
    if (settingBg == 'standart') {
        if (randomNum === '20' || +randomNum + 1 === 21) {
            randomNum = '01';
        } else {
            randomNum++;
            randomNum = String(randomNum).padStart(2, '0')
        }
        setBg(randomNum, 'standart');
    }
    if (settingBg == 'unsplash') {
        if (localStorage.getItem('unsImage') !== null) {
            setBg(`https://api.unsplash.com/photos/random?orientation=landscape&query=${JSON.parse(localStorage.getItem('unsImage'))}&client_id=bOMyUtcGB20DmVVAJIHDRCFr34u_UQumcXVa0lpXpQM`, 'unsplash'); 
        } else {
            setBg(`https://api.unsplash.com/photos/random?orientation=landscape&query=${'nature'}&client_id=bOMyUtcGB20DmVVAJIHDRCFr34u_UQumcXVa0lpXpQM`, 'unsplash');
        }
    }
    if (settingBg == 'flickr') {
        if (localStorage.getItem('flickrImage') !== null) {
            setBg(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9c32d83e0a8290889207fb2cd9dfcd6b&tags=${JSON.parse(localStorage.getItem('flickrImage'))}&extras=url_l&format=json&nojsoncallback=1`, 'flickr');
        } else {
            setBg(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9c32d83e0a8290889207fb2cd9dfcd6b&tags=${'nature'}&extras=url_l&format=json&nojsoncallback=1`, 'flickr');
        }
        // setBg(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9c32d83e0a8290889207fb2cd9dfcd6b&tags=${'car'}&extras=url_l&format=json&nojsoncallback=1`, 'flickr');
    }
}

function getSlidePrev() { // кнопка назад слайдера обработка
    const settingBg = JSON.parse(localStorage.getItem('bgSelector'));
    console.log(settingBg)
    if (settingBg == 'standart') {
        if (randomNum === '0' || +randomNum - 1 === 0) {
            randomNum = '20';
        } else {
            randomNum--;
            randomNum = String(randomNum).padStart(2, '0')
        }
        setBg(randomNum, 'standart');
    }
    if (settingBg == 'unsplash') {
        setBg(`https://api.unsplash.com/photos/random?orientation=landscape&query=${'nature'}&client_id=E8BRW2u_6WvCYHyNChd4OEa4g-l34ihoPPw_3lazJ10`, 'unsplash');
    }
    if (settingBg == 'flickr') {
        setBg(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9c32d83e0a8290889207fb2cd9dfcd6b&tags=${'car'}&extras=url_l&format=json&nojsoncallback=1`, 'flickr');
    }
}

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

city.addEventListener('change', () => { // отслеживание события изменения города
    getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${'en'}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`);
})

export async function getWeather(url, lan) { // асинхронная функция для получения погоды
    const res = await fetch(url)
    const data = await res.json();
    if (data.cod === 200) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if (lan == 'en') {
            wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} m/s`;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;
        } else {
            wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
        }
        document.querySelector('.weather-error').textContent = '';
    } else {
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        document.querySelector('.weather-error').textContent = `${data.message}`;
    }
    
}

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() { // генератор цитат
    const fileRoute = './data.json';
    const res = await fetch(fileRoute);
    const data = await res.json();
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

 // плеер

const audio = new Audio();
let isPlay = false;
let playNum = 0;
const playBtn = document.querySelector('.play')
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListUl = document.querySelector('.play-list');
const audioTime = document.querySelector('.audio-time');
const inputVolume = document.querySelector('.input-volume');
const timeNow = document.querySelector('.time_now');
const timeEnd = document.querySelector('.time_end');

playList.forEach(item => {
    const li = document.createElement('li');
    li.className = 'play-item';
    li.textContent = item.title;
    playListUl.append(li);
})
let audioPlay
function playOrPauseAudio() {
    if (!isPlay) {
        audio.src = playList[playNum].src;
        audio.onloadeddata = () => { timeEnd.textContent = Math.round(audio.duration) < 60 ? `00:${Math.round(audio.duration)}` : `${new Date(Math.round(audio.duration) *  1000).toISOString().substr(14, 5)}`}
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        // audioTime.style.width = 0;
        audioPlay = setInterval(() => {
            audioTime.style.width = (Math.round(audio.currentTime * 100)) / Math.round(audio.duration) + '%';
            timeNow.textContent = `${new Date(Math.round(audio.currentTime) *  1000).toISOString().substr(14, 5)}`;
            if (Math.round(audio.currentTime) == Math.round(audio.duration)) {
                isPlay = true;
                clearInterval(audioPlay);
                toggleBtn();
                // playOrPauseAudio()
            }
        }, 10);
        showNowTrack();
        ;
    } else {
        audio.pause();
        clearInterval(audioPlay);
        isPlay = false;
    }
}
let saveTrack = document.body;
function showNowTrack() {
    saveTrack.classList.remove('item-active')
    playListUl.childNodes.forEach(item => {
        if (playList[playNum].title == item.textContent) {
            item.classList.add('item-active')
            saveTrack = item;
        }
    })
}

inputVolume.addEventListener('input', (event) => {
    console.log(event.target.value)
    audio.volume = event.target.value;
})

function toggleBtn() {
    playBtn.classList.toggle('pause');
}
playBtn.addEventListener('click', toggleBtn);

function next() {
    if (isPlay) {
        playNum++;
        playNum < playList.length ? playNum : playNum = 0;
        audio.src = playList[playNum].src;
        audio.play();
    } else {
        playNum++;
        playNum < playList.length ? playNum : playNum = 0;
    }
    showNowTrack();
}

function prev() {
    if (isPlay) {
        playNum--;
        playNum > 0 ? playNum : playNum = playList.length-1;
        audio.src = playList[playNum].src;
        audio.play();
    } else {
        playNum--;
        playNum > 0? playNum : playNum = playList.length-1;
    }
    showNowTrack();
}



playBtn.addEventListener('click', playOrPauseAudio);
playNext.addEventListener('click', next);
playPrev.addEventListener('click', prev);

const search = document.querySelector('.search');
const searchBtn = document.querySelector('.searchButton');

if (search.value.length == 0) {
    searchBtn.href = `https://yandex.by/search/`;
}

search.addEventListener('change', () => {
    searchBtn.href = `https://yandex.by/search/?text=${search.value}`;
})