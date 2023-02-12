// console.log('module')
const toggleIcon = document.querySelector('.toggle-icon');
import { showDate, getWeather } from "./index.js";

if (localStorage.getItem('lang' == null)) {
    localStorage.setItem('lang', 'EN');
} 

const greetingTranslation = {
    en: {
        lang : 'en',
        timeDay : ['Good morning', 'Good afternoon', 'Good evening', 'Good night']
    },
    ru: {
        lang : 'ru',
        timeDay : ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи']
    }
}

toggleIcon.addEventListener('click', renderModal)
let setting = [true, true, true, true];
function renderModal() {
    if (localStorage.setting == undefined) {
        localStorage.setItem('setting', JSON.stringify(setting));
    } else {
        setting = JSON.parse(localStorage.getItem('setting'));
    }
    
    if (document.querySelector('.cont')) {
        document.querySelector('.cont').style.height = '0';
        document.querySelector('.cont').remove();
    } else {
        const cont = document.createElement('div');
        cont.className = 'cont';

        const title = document.createElement('div');
        title.className = 'titleModal';
        title.textContent = 'Settings';
        
        const wrapLang = document.createElement('div');
        const titleLang = document.createElement('span');
        titleLang.className = 'titleLang';
        titleLang.textContent = 'Lang version: ';
        const btnLang = document.createElement('button');
        btnLang.className = 'btnLang';
        if (localStorage.getItem('lang') == 'RU') {
            btnLang.textContent = 'RU';
        } else {
            btnLang.textContent = 'EN';
        }
        wrapLang.append(titleLang, btnLang);

        btnLang.addEventListener('click', () => {
            if (btnLang.textContent === 'EN') {
                btnLang.textContent = 'RU';
                document.querySelector('.city').placeholder = 'Минск';
                showDate('ru-Ru');
                getWeather(`https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=${'ru'}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`, 'en')    
                document.querySelector('.search').placeholder = 'Поиск';
                document.querySelector('.searchButton').textContent = 'Найти';
                localStorage.setItem('lang', 'RU');
                const date = new Date();
                document.querySelector('.greeting').textContent = `${greetingTranslation.ru.timeDay[Math.floor(date.getHours()/6)-1]}`
            } else {
                btnLang.textContent = 'EN';
                document.querySelector('.city').placeholder = 'Minsk';
                showDate('en-En');
                // wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
                // humidity.textContent = `Humidity: ${data.main.humidity}%`;
                getWeather(`https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=${'en'}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`, 'ru')     
                document.querySelector('.search').placeholder = 'Search';
                document.querySelector('.searchButton').textContent = 'Search';
                localStorage.setItem('lang', 'EN')
                const date = new Date();
                document.querySelector('.greeting').textContent = `${greetingTranslation.en.timeDay[Math.floor(date.getHours()/6)-1]}`
            }
        })

        const displaySetting = document.createElement('div');
        displaySetting.className = 'displaySetting';
        displaySetting.textContent = 'Display setting';

        const wrapDispPlayer = document.createElement('div');
        wrapDispPlayer.className = 'wrapDisp';
        const blockPlayer = document.createElement('span');
        blockPlayer.textContent = 'Player display: ';
        const blockPlayerCheckbox = document.createElement('input');
        blockPlayerCheckbox.className = 'check';
        blockPlayerCheckbox.id = 0;
        blockPlayerCheckbox.type = 'checkbox';
        blockPlayerCheckbox.checked = setting[0];
        wrapDispPlayer.append(blockPlayer, blockPlayerCheckbox);

        const wrapDispWeather = document.createElement('div');
        wrapDispWeather.className = 'wrapDisp';
        const blockWeather = document.createElement('span');
        blockWeather.textContent = 'Weather display: ';
        const blockWeatherCheckbox = document.createElement('input');
        blockWeatherCheckbox.className = 'check';
        blockWeatherCheckbox.type = 'checkbox';
        blockWeatherCheckbox.id = 1;
        blockWeatherCheckbox.checked = setting[1];
        wrapDispWeather.append(blockWeather, blockWeatherCheckbox);

        const wrapDispSearch = document.createElement('div');
        wrapDispSearch.className = 'wrapDisp';
        const blockSearch = document.createElement('span');
        blockSearch.textContent = 'Search display: ';
        const blockSearchCheckbox = document.createElement('input');
        blockSearchCheckbox.className = 'check';
        blockSearchCheckbox.type = 'checkbox';
        blockSearchCheckbox.id = 2;
        blockSearchCheckbox.checked = setting[2];
        wrapDispSearch.append(blockSearch, blockSearchCheckbox);

        const wrapDispQuots = document.createElement('div');
        wrapDispQuots.className = 'wrapDisp';
        const blockQuots = document.createElement('span');
        blockQuots.textContent = 'Quots display: ';
        const blockQuotsCheckbox = document.createElement('input');
        blockQuotsCheckbox.className = 'check';
        blockQuotsCheckbox.type = 'checkbox';
        blockQuotsCheckbox.checked = setting[3];
        blockQuotsCheckbox.id = 3;
        wrapDispQuots.append(blockQuots, blockQuotsCheckbox);

        const titleBackground = document.createElement('div');
        titleBackground.className = 'titleBackground'
        titleBackground.textContent = 'Setting background';

        const wrapStyleBack = document.createElement('div');
        wrapStyleBack.className = 'wrapStyleBack';

        const divWrapSpanF = document.createElement('div');
        divWrapSpanF.className = 'divWrapSpan';

        const itemApiZero = document.createElement('input');
        itemApiZero.name = 'itemApi';
        itemApiZero.type = 'radio';
        itemApiZero.id = 'idSecond';

        const spanZero = document.createElement('span');
        spanZero.textContent = 'Standart Image';

        const divWrapSpanZ = document.createElement('div');
        divWrapSpanZ.className = 'divWrapSpan';

        divWrapSpanZ.append(spanZero, itemApiZero);

        const itemApiFirst = document.createElement('input');
        itemApiFirst.name = 'itemApi';
        itemApiFirst.type = 'radio';
        itemApiFirst.id = 'idFirst';

        const spanFirst = document.createElement('span');
        spanFirst.textContent = 'Unsplash API';

        divWrapSpanF.append(spanFirst, itemApiFirst);

        const itemApiSecond = document.createElement('input');
        itemApiSecond.name = 'itemApi';
        itemApiSecond.type = 'radio';
        itemApiFirst.id = 'idSecond';

        const spanSecond = document.createElement('span');
        spanSecond.textContent = 'Flickr API';

        const divWrapSpanS = document.createElement('div');
        divWrapSpanS.className = 'divWrapSpan';

        divWrapSpanS.append(spanSecond, itemApiSecond);

        wrapStyleBack.append(divWrapSpanZ ,divWrapSpanF, divWrapSpanS);

        cont.append(title, wrapLang, displaySetting, wrapDispPlayer, wrapDispWeather, wrapDispSearch, wrapDispQuots, titleBackground, wrapStyleBack);
        document.body.append(cont);
        const checki = document.querySelectorAll('.check');
        checki.forEach(item => {
            console.log(item)
            item.addEventListener('input', () => {
                setting[item.id] = item.checked;
                console.log(setting)
                localStorage.setItem('setting', JSON.stringify(setting))
                // console.log('chacnge', item)
                if (item.id == '0') {
                    document.querySelector('.player').classList.toggle('disp');
                }
                if (item.id == '1') {
                    document.querySelector('.weather').classList.toggle('disp');
                }
                if (item.id == '2') {
                    document.querySelector('.searchPanel').classList.toggle('disp');
                }
                if (item.id == '3') {
                    document.querySelector('.footer').classList.toggle('disp');
                }
            })
        })
    }
}