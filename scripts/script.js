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

function getLocalStorage() {
    if (localStorage.getItem('name') || localStorage.getItem('city')) {
        document.getElementById('optic').value = localStorage.getItem('name');
        document.querySelector('.city').value = localStorage.getItem('city');
        document.getElementById('optic').classList.remove('name-optic');
        getWeather(localStorage.getItem('city'));
        for (let key in winLarg) {
            if (window.innerWidth > 5000 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winLarg[key]}vw`;
            } else if (window.innerWidth < 3000 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winSmall[key]}vw`;
            } else if (window.innerWidth > 3000 && window.innerWidth < 5000 && localStorage.getItem('name').length === parseInt(key)) {
                document.querySelector('.name').style.maxWidth = `${50 - localStorage.getItem('name').length * winMid[key]}vw`
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
        randomNum = (23).toString();
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
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

getWeather();


city.addEventListener('change', function setCity() {
    getWeather(city.value);
});


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

function setText (data){
    let textNum = setQuote(0, 23);
    document.querySelector('.quote').textContent = `"${data[textNum].text}"`;
    document.querySelector('.author').textContent = data[textNum].author;
}


let isPlay = false;
const audio = new Audio();

document.querySelector('.play').addEventListener('click', () => {
    if (!isPlay){
        playAudio()
    } else{
        pauseAudio()
    }
});
function playAudio() {
    audio.src = 'https://raw.githubusercontent.com/AlexBoronin/momentum/main/assets/sounds/Jozsef Lendvay - Libertango.mp3';
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
}

function pauseAudio() {
    audio.pause();
    isPlay = false;
}





