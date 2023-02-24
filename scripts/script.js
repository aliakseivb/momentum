let days
let months
let conditions
let toDo
let timeOfDay
let enter
let language = localStorage.getItem('language');
const timeNow = document.querySelector('.time')
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

const setbtn = document.createElement('div');
setbtn.classList.add('set-btn');
document.querySelector('.footer').append(setbtn);
const set = document.createElement('div');
set.classList.add('set');
document.querySelector('.footer').append(set);

const languageEl = document.createElement('div');
languageEl.classList.add('languageEl');
document.querySelector('.set').append(languageEl);
languageEl.textContent = 'Select language';
const wrapLanguage = document.createElement('div');
wrapLanguage.classList.add('wrapLanguage');
document.querySelector('.set').append(wrapLanguage);
wrapLanguage.addEventListener('click', (e) => {
    language = e.target.textContent;
    changeGreetingLang(language);
    wrapLanguage.classList.toggle('lang-opacity');
    languageEl.classList.toggle('lang-active');

})
languageEl.addEventListener('click', function (e) {
    wrapLanguage.classList.toggle('lang-opacity');
    languageEl.classList.toggle('lang-active');
    wrapSource.classList.remove('source-opacity');
    sourceEl.classList.remove('source-active');
    todoEl.classList.remove('todo-active');
})

const sourceEl = document.createElement('div');
sourceEl.classList.add('sourceEl');
document.querySelector('.set').append(sourceEl);
sourceEl.textContent = 'Image source';
const wrapSource = document.createElement('div');
wrapSource.classList.add('wrapSource');
document.querySelector('.set').append(wrapSource);
const git = document.createElement('div');
git.classList.add('git');
git.textContent = 'GIT';
document.querySelector('.wrapSource').append(git);
const unsplash = document.createElement('div');
unsplash.classList.add('unsplash');
document.querySelector('.wrapSource').append(unsplash);
unsplash.textContent = 'Unsplash';
const flickr = document.createElement('div');
flickr.classList.add('flickr');
flickr.textContent = 'Flickr';
document.querySelector('.wrapSource').append(flickr);

sourceEl.addEventListener('click', function (e) {
    wrapSource.classList.toggle('source-opacity');
    sourceEl.classList.toggle('source-active');
    wrapLanguage.classList.remove('lang-opacity');
    languageEl.classList.remove('lang-active');
    todoEl.classList.remove('todo-active');
})


const todoEl = document.createElement('div');
todoEl.classList.add('todoEl');
todoEl.textContent = 'ToDo';
document.querySelector('.set').append(todoEl);

const setClose = document.createElement('div');
setClose.classList.add('setClose');
document.querySelector('.set').append(setClose);
const wrapBe = document.createElement('div');
wrapBe.classList.add('wrapBe');
document.querySelector('.wrapLanguage').append(wrapBe);
wrapBe.textContent = 'be';
const wrapEn = document.createElement('div');
wrapEn.classList.add('wrapEn');
document.querySelector('.wrapLanguage').append(wrapEn);
wrapEn.textContent = 'en';

const todo = document.createElement('div');
todo.classList.add('todo');
document.querySelector('.footer').append(todo);


// закрыть меню по клику вне его
document.addEventListener('click', e => {
    if (!e.target === set || !e.target === set.contains(e.target)
        && !(e.target === setClose)
        && set.classList.contains('open')) {
        //!!!!!!!!!!!!!!!!!!!!!!!! --- >>>>>   то же самое но другими словами
        // let target = e.target;
        // let its_menu = target === set || set.contains(target);
        // let its_hamburger = target === setClose;
        // let menu_is_active = set.classList.contains('open');
        // if (!its_menu && !its_hamburger && menu_is_active) {
        document.querySelector('.set').classList.remove('open');
        document.querySelector('.set-btn').classList.remove('close');
        languageEl.classList.remove('lang-active');
        wrapSource.classList.remove('source-opacity');
    }
})
setbtn.addEventListener('click', e => {
    e.stopPropagation();
    document.querySelector('.set').classList.add('open');
    document.querySelector('.set-btn').classList.add('close');
})

setClose.addEventListener('click', () => {
    document.querySelector('.set').classList.remove('open')
    document.querySelector('.set-btn').classList.remove('close');
})

const wrapOption = document.createElement('div');
wrapOption.classList.add('wrapOption');
document.querySelector('.header').append(wrapOption);
const angle = document.createElement('div');
angle.classList.add('angle');
document.querySelector('.wrapOption').append(angle);
const optionLanguage = document.createElement('div');
optionLanguage.classList.add('optionLanguage');
document.querySelector('.wrapOption').append(optionLanguage);
const optionLanguageBe = document.createElement('div');
optionLanguageBe.classList.add('optionLanguageBe');
document.querySelector('.optionLanguage').append(optionLanguageBe);
optionLanguageBe.textContent = 'be';
const optionLanguageEn = document.createElement('div');
optionLanguageEn.classList.add('optionLanguageEn');
document.querySelector('.optionLanguage').append(optionLanguageEn);
optionLanguageEn.textContent = 'en';
document.querySelector('.angle').addEventListener('click', function (e) {
    document.querySelector('.optionLanguage').classList.toggle('open');
})


//  еще один способ закрыть меню по клику вне его
window.onclick = function (event) {
    if (!event.target.matches('.angle')) {
        let dropdowns = document.getElementsByClassName("optionLanguage");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('open')) {
                openDropdown.classList.remove('open');
            }
        }
    } else {
        document.querySelector('.optionLanguage').addEventListener("click", function (e) {
            language = e.target.textContent;
            changeGreetingLang(language);
            getWeather(localStorage.getItem('city'), localStorage.getItem('language'));
            document.querySelector('.name').placeholder = enter;
            document.querySelector('.optionLanguage').classList.toggle('open')
        })
    }
}
const greetingTranslation =
    {
        'be': [
            ['Добрай ранiцы', 'Добры дзень', 'Добры вечар', 'Добрай ночы'],
            ['Вецер', 'Вiльготнасць'],
            'Зрабiць',
            ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
            ['Cтудзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
            'назавiце сябе...'
        ],
        'en': [['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
            ['Wind', 'Humidity'],
            'Todo',
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'enter your name...'
        ]
    }

function changeGreetingLang(lang = 'be') {
    if (lang === 'en') {
        days = greetingTranslation.en[3];
        months = greetingTranslation.en[4];
        conditions = greetingTranslation.en[1];
        toDo = greetingTranslation.en[2];
        timeOfDay = greetingTranslation.en[0];
        enter = greetingTranslation.en[5];
    } else {
        days = greetingTranslation.be[3];
        months = greetingTranslation.be[4];
        conditions = greetingTranslation.be[1];
        toDo = greetingTranslation.be[2];
        timeOfDay = greetingTranslation.be[0];
        enter = greetingTranslation.be[5];
    }
    getWeather(localStorage.getItem('city'), localStorage.getItem('language'));
}

changeGreetingLang()

function showTime() {
    const date = new Date();
    timeNow.textContent = date.toLocaleTimeString();
    let options = {day: 'numeric'};
    day.textContent = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.toLocaleDateString('be-Be', options)}`;
    setTimeout(showTime, 1000);
    date.getHours() >= 0 && date.getHours() < 6 ? greeting.textContent = `${timeOfDay[3]}, `
        : date.getHours() >= 6 && date.getHours() < 12 ? greeting.textContent = `${timeOfDay[0]}, `
            : date.getHours() >= 12 && date.getHours() < 18 ? greeting.textContent = `${timeOfDay[1]}, `
                : greeting.textContent = `${timeOfDay[2]}, `;

    window.partOfDay = Math.ceil(date.getHours() / 6);
}

showTime();

document.getElementById('optic').addEventListener('click', () => {
    document.getElementById('optic').classList.remove('name-optic');
});

const winWidth = {
    '2': 2.2,
    '3': 1.7,
    '4': 1.1,
    '5': 0.8,
    '6': 0.6,
    '7': 0.45,
    '8': 0.31,
    '9': 0.25,
    '10': 0.15,
    '11': 0.12
};
const winMid = {
    '2': 2.8,
    '3': 2,
    '4': 1.4,
    '5': 1,
    '6': 0.8,
    '7': 0.55,
    '8': 0.45,
    '9': 0.35,
    '10': 0.24,
    '11': 0.17
};
const winSmall = {
    '2': 4,
    '3': 2.3,
    '4': 1.5,
    '5': 1.2,
    '6': 0.9,
    '7': 0.5,
    '8': 0.5,
    '9': 0.4,
    '10': 0.17,
    '11': 0.14
};

function setLocalStorage() {
    localStorage.setItem('name', document.getElementById('optic').value);
    localStorage.setItem('city', document.querySelector('.city').value);
    localStorage.setItem('placeholder', enter);
    localStorage.setItem('language', language);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name') || localStorage.getItem('city')) {
        document.getElementById('optic').value = localStorage.getItem('name');
        document.querySelector('.city').value = localStorage.getItem('city');
        document.getElementById('optic').classList.remove('name-optic');
        getWeather(localStorage.getItem('city'), localStorage.getItem('language'));
        document.querySelector('.name').placeholder = localStorage.getItem('placeholder');
        changeGreetingLang(localStorage.getItem('language'))
        for (let key in winWidth) {
            if (window.innerWidth > 2500 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winWidth[key]}vw`
            } else if (window.innerWidth > 2000 && window.innerWidth < 2500 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winMid[key]}vw`;
            } else if (window.innerWidth < 2000 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winSmall[key]}vw`
            }
        }
    }
    localStorage.getItem('placeholder', enter);
    localStorage.setItem('language', language);
}

window.onresize = () => {
    for (let key in winWidth) {
        if (window.innerWidth > 2500 && localStorage.getItem('name').length === parseInt(key)) {
            document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winWidth[key]}vw`
        } else if (window.innerWidth > 2000 && window.innerWidth < 2500 && localStorage.getItem('name').length === parseInt(key)) {
            document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winMid[key]}vw`;
        } else if (window.innerWidth < 2000 && localStorage.getItem('name').length === parseInt(key)) {
            document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winSmall[key]}vw`
        }

    }
};

window.addEventListener('load', getLocalStorage)
let randomNum = 0;

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = (Math.floor(Math.random() * (max - min)) + min).toString();
    if (randomNum.length === 1) {
        randomNum = `0${randomNum}`;
    }
}

getRandomNum(1, 23);

function getTimeOfDay() {
    const date = new Date();
    if (date.getHours() >= 0 && date.getHours() < 6) {
        return 'night'
    } else if (date.getHours() >= 6 && date.getHours() < 12) {
        return 'morning'
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
        return 'afternoon'
    } else {
        return 'evening'
    }
}

function setBg() {
    const img = new Image();
    img.src = "https://raw.githubusercontent.com/AlexBoronin/momentum/main/assets/img/" + getTimeOfDay() + '/' + randomNum + ".webp";
    img.onload = () => {
        document.body.style.backgroundImage = "url(" + img.src + ")";
    };
}

setBg();

/// работа с API
let linkSource = 1;
window.addEventListener('click', function (event) {
    if (event.target === document.querySelector('.unsplash')) {
        linkSource = 2;
        console.log(linkSource)
    } else if (event.target === document.querySelector('.flickr')) {
        linkSource = 3;
        console.log(linkSource)
    }
})

async function getLinkToImageSplash() {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=zk44jRDumDM_lYXQWII3tA7WzyuDpAEzvaQWXY4241c';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)
}

async function getLinkToImageFlickr() {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cb7ce9acd1c422b0032c76710eee008e&tags=nature&extras=url_l&format=json&nojsoncallback=1';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)
}

getLinkToImageFlickr()

const prev = document.querySelector('.slide-prev');
const next = document.querySelector('.slide-next');
prev.addEventListener('click', function getSlidePrev() {
    if (parseInt(randomNum) < 10) {
        randomNum = (parseInt(randomNum) - 1).toString();
        if (randomNum.length === 1) {
            randomNum = `0${randomNum}`;
        }
    } else {
        randomNum = (parseInt(randomNum) - 1).toString();
    }
    if (parseInt(randomNum) === 0) {
        randomNum = (22).toString();
    }
    setBg();
});
next.addEventListener('click', function getSlideNext() {
    if (linkSource === 1) {
        if (parseInt(randomNum) < 10) {
            randomNum = (parseInt(randomNum) + 1).toString();
            if (randomNum.length === 1) {
                randomNum = `0${randomNum}`;
            }
        } else {
            randomNum = (parseInt(randomNum) + 1).toString();
        }
        if (parseInt(randomNum) === 23) {
            randomNum = 0 + (1).toString();
        }
        setBg();
    } else if (linkSource === 2) {
        getLinkToImage();
    }

});

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const city = document.querySelector('.city');
// if(!localStorage.getItem('city')){
//     city.textContent = 'Мiнск';
// }else {
//     city.textContent = localStorage.getItem('city');
// }
// console.log(localStorage.getItem('city'))
city.textContent = localStorage.getItem('city') || 'Мiнск'
async function getWeather(city, lang = 'be') {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=260d225c65e849f7ad9e4bef2b25de91&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = Math.ceil(`${data.main.temp}`) + '°C';
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${conditions[0]}: ${data.wind.speed} m/s`;
    humidity.textContent = `${conditions[1]}: ${data.main.humidity}%`;
}

getWeather();


city.addEventListener('change', function setCity() {
    getWeather();
});

// ---- > высказывания

async function getQuotes() {
    const quotes = 'https://raw.githubusercontent.com/AlexBoronin/momentum/main/assets/date.json';
    const res = await fetch(quotes);
    const data = await res.json();
    setText(data);
}

getQuotes();

let rotate = 0;

document.querySelector('.change-quote').addEventListener('click', () => {
    rotate += 360;
    document.querySelector('.change-quote').style.transform = "rotate(" + rotate + "deg)";
    getQuotes();
});

function setQuote(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = (Math.floor(Math.random() * (max - min)) + min).toString();
    return randomNum
}

function setText(data) {
    if (language === 'en') {
        let textNum = setQuote(0, Object.keys(data[0]).length);
        document.querySelector('.quote').textContent = `"${data[1][textNum].text}"`;
        document.querySelector('.author').textContent = data[1][textNum].author;
    } else {
        let textNum = setQuote(0, Object.keys(data[1]).length);
        document.querySelector('.quote').textContent = `"${data[0][textNum].text}"`;
        document.querySelector('.author').textContent = data[0][textNum].author;
    }

}


// --- > ПЛЕЕР
import playList from './playList.js';  // импортируем дынные по названию трека, его местоположении и продолжительности

let isPlay = false; // устанавливаем начальный флаг для логики стар/стоп
const audio = new Audio(); // создаем объект
let playNum = 0; // выбор - стартовый номер трека после загрузки страницы

// средствами JS создаем элементы HTML для отображения предустановленного плейлиста
playList.forEach(el => {
    const li = document.createElement('li');
    document.querySelector('.play-list').append(li);
    li.classList.add('play__list__item');
    li.textContent = el["title"];
})
const lastElem = document.querySelector('.player').lastChild.previousSibling;
// bar
const bar = document.createElement('div');
bar.classList.add('bar');
document.querySelector('.player').insertBefore(bar, lastElem);
// табло
const pres = document.createElement('div');
pres.classList.add('pres');
document.querySelector('.bar').append(pres);
//создаем прогресс-бар
const playLine = document.createElement('div');
playLine.classList.add('playLine');
document.querySelector('.bar').append(playLine);
// создаем прогресс-лайн
const progress = document.createElement('div');
progress.classList.add('progress');
progress.setAttribute('id', 'line');
document.querySelector('.playLine').append(progress);
progress.setAttribute('type', 'range');
progress.setAttribute('value', '0');
progress.setAttribute('step', '0.001');
// звук
const volumeContainer = document.createElement('div');
volumeContainer.classList.add('volume-container');
document.querySelector('.bar').append(volumeContainer);
const volume = document.createElement('div');
volume.classList.add('volume');
document.querySelector('.volume-container').append(volume);
// volchange
const volchange = document.createElement('div');
volchange.classList.add('volchange');
document.querySelector('.volume-container').append(volchange);
const change = document.createElement('div');
change.classList.add('change');
document.querySelector('.volchange').append(change);
// создаем элемент для отображения времени для плей и дюрейшн
const time = document.createElement('span');
time.classList.add('play-time');
document.querySelector('.bar').append(time);


// логика воспроизведения - паузы + анимация
document.querySelector('.play').addEventListener('click', () => {
    console.log(1)
    if (!isPlay) {
        playAudio();
        isPlay = true;
    } else if (document.querySelector('.play').classList.contains('pause')) {
        pauseAudio();
    }
    document.querySelector('.play').classList.toggle('pause');
});

const timeChange = bar.querySelector('.playLine');
let currentTime = 0;
timeChange.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(timeChange).width;
    audio.currentTime = e.offsetX /
        parseInt(sliderWidth) * (parseInt(playList[playNum].duration.split(':')[0]) * 60 + parseInt(playList[playNum].duration.split(':')[1]));
    bar.querySelector(".progress").style.width = e.offsetX + '%';
    currentTime = audio.currentTime;
}, false);

function playAudio() {
    audio.src = playList[playNum].src;
    audio.play(playNum);
    audio.currentTime = currentTime;
    colorText(playNum);
    let outTime
    audio.addEventListener('timeupdate', () => {
        audio.currentTime.toFixed(0) < 10 ?
            outTime = `0:0${audio.currentTime.toFixed(0)}`
            : audio.currentTime.toFixed(0) < 60 ?
                outTime = `0:${audio.currentTime.toFixed(0)}`
                : outTime = `${Math.floor((audio.currentTime.toFixed(0) / 60)).toString()}:${(audio.currentTime.toFixed(0) % 60).toString().padStart(2, '0')}`
        time.textContent = `${outTime} / ${playList[playNum].duration}`;
        progress.style.width = `${audio.currentTime.toFixed(0) / (parseInt(playList[playNum].duration.split(':')[0]) * 60 + parseInt(playList[playNum].duration.split(':')[1])) * 100}%`;
        if (progress.style.width === '100%') {
            playNext();
        }
    });
    document.querySelector('.play-time').classList.add('visible');
    document.querySelector('.progress').classList.add('visible');
    document.querySelector('.playLine').classList.add('visible');
    document.querySelector('.pres').classList.add('visible');
    document.querySelector('.pres').textContent = playList[playNum].title;
    document.querySelector('.volume').classList.add('visible');
    isPlay = true;
}

function pauseAudio() {
    audio.pause();
    document.querySelector('.play-list').children[playNum].classList.remove('active');
    document.querySelector('.play-list').children[playNum].style.color = 'white';
    document.querySelector('.play-list').children[playNum].style.textShadow = "none";
    isPlay = false;
}

document.querySelector('.play-next').addEventListener('click', () => {
    playNext();
});
document.querySelector('.play-prev').addEventListener('click', () => {
    playPrev();
});

function playNext() {
    if (isPlay) {
        if (playNum === playList.length - 1) {
            playNum = 0;
        } else {
            playNum += 1;
        }
        currentTime = 0;
        playAudio(playNum);
        colorText(playNum);
    }
}

function playPrev() {
    if (isPlay) {
        if (playNum === 0) {
            playNum = playList.length - 1;
        } else {
            playNum -= 1;
        }
        currentTime = 0;
        playAudio(playNum);
        colorText(playNum);
    }
}

document.querySelector('.play-list').addEventListener('click', function (event) {
    if (event.target.classList.contains('active')
        || (event.target.classList.contains('active') && (event.target.classList.contains('pause')))) {
        pauseAudio();
        document.querySelector('.play').classList.remove('pause');
        document.querySelector('.active').classList.remove('active');
    } else if (!event.target.classList.contains('active') && !document.querySelector('.play').classList.contains('pause')) {
        playList.forEach(function (e, i) {
            if (e["title"] === event.target.textContent) {
                event.target.classList.add('active');
                document.querySelector('.play').classList.add('pause');
                document.querySelector('.pres').textContent = event.target.textContent;
                currentTime = 0;
                playNum = i;
                playAudio(playNum);
            }
        })
    } else if (!event.target.classList.contains('active') && document.querySelector('.play').classList.contains('pause')) {
        playList.forEach(function (e, i) {
            if (e["title"] === event.target.textContent) {
                event.target.classList.add('active');
                document.querySelector('.pres').textContent = event.target.textContent;
                currentTime = 0;
                playNum = i;
                playAudio(playNum);
            }
        })
    }
})
// event.target.classList.contains('play__list__item')) {
// document.querySelector('.play').classList.add('pause');
// playList.forEach(function (e, i) {
//     if (e["title"] === document.querySelector('.active').textContent) {
//         document.querySelector('.active').classList.remove('active');
//         event.target.textContent === e["title"]
//         currentTime = 0;
//         playAudio(i);
//         isPlay = !isPlay;
//         event.target.classList.add('active')
//     }
//
//
function colorText() {
    for (let i = 0; i <= playList.length - 1; i++) {
        if (i === playNum) {
            document.querySelector('.play-list').children[i].style.color = '#f6d1d1';
            document.querySelector('.play-list').children[i].style.textShadow = "0 0 10px white";
            document.querySelector('.play-list').children[i].classList.add('active');
        } else {
            document.querySelector('.play-list').children[i].style.color = 'white';
            document.querySelector('.play-list').children[i].style.textShadow = "none";
            document.querySelector('.play-list').children[i].classList.remove('active');
        }
    }
}


const volumeChange = bar.querySelector('.volchange');
volumeChange.addEventListener('click', e => {
    audio.volume = .75;
    const sliderWidth = window.getComputedStyle(volumeChange).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    bar.querySelector(".change").style.width = newVolume * 100 + '%';
}, false)

document.querySelector('.volume').addEventListener('click', (e) => {
    if (e.target.classList.contains('off')) {
        audio.volume = .75;
        bar.querySelector(".change").style.width = '75%';
        document.querySelector('.volume').classList.remove('off');
    } else {
        audio.volume = 0;
        bar.querySelector(".change").style.width = '0%';
        document.querySelector('.volume').classList.add('off');
    }
});









