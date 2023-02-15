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
    date.getHours() < 6 ? greetimg.textContent = 'Добрай ночы '
        : date.getHours() >= 6 && date.getHours() < 12 ? greetimg.textContent = 'Добрай раніцы '
            : date.getHours() >= 12 && date.getHours() < 18 ? greetimg.textContent = 'Добры дзень '
                : greetimg.textContent = 'Добры вечар ';
}
showTime();




// function setLocalStorage() {
// (function () {
//
//     document.getElementById('optic').addEventListener('click', () => {
//         document.getElementById('optic').classList.remove('name-optic');
//     });
//     // document.getElementById('optic').value.length > 0 && !document.getElementById('optic').onfocus
//     //     document.getElementById('optic').classList.remove('name-optic');
//     // }
// }());

(function () {

    document.getElementById('optic').addEventListener('click', () => {
        document.getElementById('optic').classList.remove('name-optic');
    });
    // document.getElementById('optic').value.length > 0 && !document.getElementById('optic').onfocus
    //     document.getElementById('optic').classList.remove('name-optic');
    // }
}());



// document.getElementsByName('.name').
//
//         document.getElementById('optic').classList.remove('name-optic');
//     }
//
//     //     = () => {
//     //     document.querySelectorAll('.name-optic').remove('name-optic');
//     // }
//     localStorage.setItem('name', name.value);
// }
// window.addEventListener('beforeunload', setLocalStorage)
// function getLocalStorage() {
//     if(localStorage.getItem('name')) {
//         name.value = localStorage.getItem('name');
//     }
// }
// window.addEventListener('load', getLocalStorage)
