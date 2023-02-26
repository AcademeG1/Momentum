import { greetingTranslation } from "./translete.js";
export async function setBg(number, flag) { // установка фона
    if (localStorage.getItem('bgSelector') == null) {
        localStorage.setItem('bgSelector', JSON.stringify('standart'));
    } 
    if (flag == 'standart') {
        let bgNum = number;
        const date = new Date();
        let img = new Image();
        const time = greetingTranslation.en.timeDay[Math.floor(date.getHours()/6)].split(' ')[1];
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${bgNum}.jpg`;
        img.onload = function() {
            document.body.style.backgroundImage = 'url(' + img.src + ')';
        };
    } else 
    if (flag == 'unsplash') {
        console.log(typeof number)
        const inf = await fetch(number);
        const data = await inf.json();
        console.log(data.urls.regular)
        let img = new Image();
        img.src = `${data.urls.regular}`;
        img.onload = function() {
            document.body.style.backgroundImage = 'url(' + img.src + ')';
        };
    } else 
    if (flag == 'flickr') {
        const inf = await fetch(number);
        const data = await inf.json();
        let img = new Image();
        img.src = `${await data.photos.photo[Math.floor(Math.random()*data.photos.photo.length)].url_l}`;
        img.onload = function() {
            document.body.style.backgroundImage = 'url(' + img.src + ')';
        };
    }
    
}