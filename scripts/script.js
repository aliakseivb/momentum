function showTime() {
    const date = new Date();
    let days = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
    let months = ['Cтудзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'];
    const time = document.querySelector('.time');
    time.textContent = date.toLocaleTimeString();
    // function showDate() {
    const day = document.querySelector('.date');
    const options1 = {month: 'numeric'};
    const options2 = {day: 'numeric'};
    day.textContent = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.toLocaleDateString('be-Be', options2)}`;
    setTimeout(showTime, 1000);
    const greetimg = document.querySelector('.greeting');
    date.getHours() < 6 ? greetimg.textContent = 'Добрай ночы, '
        : date.getHours() >= 6 && date.getHours() < 12 ? greetimg.textContent = 'Добрай раніцы, '
            : date.getHours() >= 12 && date.getHours() < 18 ? greetimg.textContent = 'Добры дзень, '
                : greetimg.textContent = 'Добры вечар, ';
}

showTime();

document.getElementById('optic').addEventListener('click', () => {
    document.getElementById('optic').classList.remove('name-optic');
});

function setLocalStorage() {
    localStorage.setItem('name', document.getElementById('optic').value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        document.getElementById('optic').value = localStorage.getItem('name');
    }
}

window.addEventListener('load', getLocalStorage)
