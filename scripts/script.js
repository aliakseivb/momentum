function showTime() {
    const date = new Date();
    let days = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
    let months = ['Cтудзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'];
    document.querySelector('.time').textContent = date.toLocaleTimeString();
    const day = document.querySelector('.date');
    const options2 = {day: 'numeric'};
    day.textContent = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.toLocaleDateString('be-Be', options2)}`;
    setTimeout(showTime, 1000);
    const greetimg = document.querySelector('.greeting');
    date.getHours() >= 0 && date.getHours() < 6 ? greetimg.textContent = 'Добрай ночы, '
        : date.getHours() >= 6 && date.getHours() < 12 ? greetimg.textContent = 'Добрай раніцы, '
            : date.getHours() >= 12 && date.getHours() < 18 ? greetimg.textContent = 'Добры дзень, '
                : greetimg.textContent = 'Добры вечар, ';

    window.partOfDay = Math.ceil(date.getHours() / 6);
}

showTime();

document.getElementById('optic').addEventListener('click', () => {
    document.getElementById('optic').classList.remove('name-optic');
});


function setLocalStorage() {
    localStorage.setItem('name', document.getElementById('optic').value);
    localStorage.setItem('city', document.querySelector('.city').value);
}

window.addEventListener('beforeunload', setLocalStorage);
const winLarg = {
    '2': 1.2,
    '3': 0.9,
    '4': 0.6,
    '5': 0.4,
    '6': 0.3,
    '7': 0.2,
    '8': 0.16,
    '9': 0.11,
    '10': 0.09,
    '11': 0.008
};
const winMid = {
    '2': 1.7,
    '3': 1.1,
    '4': 0.72,
    '5': 0.47,
    '6': 0.35,
    '7': 0.26,
    '8': 0.2,
    '9': 0.15,
    '10': 0.1,
    '11': 0.07
};
const winSmall = {
    '2': 3.5,
    '3': 2.1,
    '4': 1.4,
    '5': 1,
    '6': 0.7,
    '7': 0.5,
    '8': 0.35,
    '9': 0.23,
    '10': 0.17,
    '11': 0.05
};
const winLLL = {
    '2': 7,
    '3': 4.5,
    '4': 3,
    '5': 2,
    '6': 1.5,
    '7': 1.1,
    '8': 0.8,
    '9': 0.6,
    '10': 0.3,
    '11': 0.2
};

function getLocalStorage() {
    if (localStorage.getItem('name') || localStorage.getItem('city')) {
        document.getElementById('optic').value = localStorage.getItem('name');
        document.querySelector('.city').value = localStorage.getItem('city');
        document.getElementById('optic').classList.remove('name-optic');
        getWeather(localStorage.getItem('city'));
        for (let key in winLarg) {
            if (window.innerWidth > 5000 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winLarg[key]}vw`;
            } else if (window.innerWidth > 2000 && window.innerWidth < 3000 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winSmall[key]}vw`;
            } else if (window.innerWidth > 3000 && window.innerWidth < 5000 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winMid[key]}vw`
            } else if (window.innerWidth < 2000 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winLLL[key]}vw`
            }
        }
    }
}

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
});

window.onresize = () => {
    for (let key in winLarg) {
        if (window.innerWidth > 5000 && localStorage.getItem('name').length === parseInt(key)) {
            document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winLarg[key]}vw`;
        } else if (window.innerWidth < 3000 && localStorage.getItem('name').length === parseInt(key)) {
            document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winSmall[key]}vw`;
        } else if (window.innerWidth > 3000 && window.innerWidth < 5000 && localStorage.getItem('name').length === parseInt(key)) {
            document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winMid[key]}vw`
        }
    }
};

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const city = document.querySelector('.city');
city.value = 'Минск';

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=be&appid=ca3165c4315a2e6a8d6f02c0a5de77ca&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = Math.ceil(`${data.main.temp}`) + '°C';
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

getWeather();


city.addEventListener('change', function setCity() {
    getWeather(city.value);
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
    let textNum = setQuote(0, 23);
    document.querySelector('.quote').textContent = `"${data[textNum].text}"`;
    document.querySelector('.author').textContent = data[textNum].author;
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
let lastElem = document.querySelector('.player').lastChild.previousSibling;
// bar
let bar = document.createElement('div');
bar.classList.add('bar');
document.querySelector('.player').insertBefore(bar, lastElem);
// табло
let pres = document.createElement('div');
pres.classList.add('pres');
document.querySelector('.bar').append(pres);
//создаем прогресс-бар
let playLine = document.createElement('div');
playLine.classList.add('playLine');
document.querySelector('.bar').append(playLine);
// создаем прогресс-лайн
let progress = document.createElement('div');
progress.classList.add('progress');
progress.setAttribute('id', 'line');
document.querySelector('.playLine').append(progress);
progress.setAttribute('type', 'range');
progress.setAttribute('value', '0');
progress.setAttribute('step', '0.001');
// звук
let volumeContainer = document.createElement('div');
volumeContainer.classList.add('volume-container');
document.querySelector('.bar').append(volumeContainer);
let volume = document.createElement('div');
volume.classList.add('volume');
document.querySelector('.volume-container').append(volume);
// volchange
let volchange = document.createElement('div');
volchange.classList.add('volchange');
document.querySelector('.volume-container').append(volchange);
let change = document.createElement('div');
change.classList.add('change');
document.querySelector('.volchange').append(change);
// создаем элемент для отображения времени для плей и дюрейшн
let time = document.createElement('span');
time.classList.add('play-time');
document.querySelector('.bar').append(time);
// логика воспроизведения - паузы + анимация
document.querySelector('.play').addEventListener('click', () => {
    if (!isPlay) {
        playAudio()
        isPlay = !isPlay;
    } else {
        pauseAudio()
        isPlay = !isPlay;
    }
    document.querySelector('.play').classList.toggle('pause');
});

const timeChange = bar.querySelector('.playLine');

timeChange.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(timeChange).width;
    audio.currentTime =  e.offsetX /
        parseInt(sliderWidth)*(parseInt(playList[playNum].duration.split(':')[0]) * 60 + parseInt(playList[playNum].duration.split(':')[1]));
    bar.querySelector(".progress").style.width = e.offsetX + '%';
}, false)
function playAudio() {
    audio.src = playList[playNum].src;
    audio.play(playNum);
    colorText(playNum);
    let outTime
    audio.addEventListener('timeupdate', () => {
        audio.currentTime.toFixed(0) < 10 ?
            outTime = `0:0${audio.currentTime.toFixed(0)}`
            : audio.currentTime.toFixed(0) < 60 ?
                outTime = `0:${audio.currentTime.toFixed(0)}`
                : outTime = `${Math.floor((audio.currentTime.toFixed(0) / 60)).toString().padStart(2, '0')}:${(audio.currentTime.toFixed(0) % 60).toString().padStart(2, '0')}`
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
}

function pauseAudio() {
    audio.pause();
    document.querySelector('.play-list').children[playNum].classList.remove('active');
    document.querySelector('.play-list').children[playNum].style.color = 'white';
    document.querySelector('.play-list').children[playNum].style.textShadow = "none";
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
        playAudio(playNum);
        colorText(playNum);
    }
}

document.querySelector('.play-list').addEventListener('click', function (event) {
    if (event.target.classList.contains('active') || event.target.classList.contains('pause')) {
        pauseAudio();
        document.querySelector('.play').classList.remove('pause');
    } else if (!event.target.classList.contains('active')) {
        if (!event.target) {
            event.target.classList.add('active')
        }
        document.querySelector('.play').classList.add('pause');
        playList.forEach(function (e, i) {
            if (event.target.textContent === e["title"]) {
                playNum = i;
            }
        })
        playAudio(playNum);
        isPlay = !isPlay;
    }
})

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
    if (e.target.classList.contains('off')){
        audio.volume = .75;
        bar.querySelector(".change").style.width = '75%';
        document.querySelector('.volume').classList.remove('off');
    } else {
        audio.volume = 0;
        bar.querySelector(".change").style.width = '0%';
        document.querySelector('.volume').classList.add('off');
    }
});






