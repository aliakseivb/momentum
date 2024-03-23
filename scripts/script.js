let days
let months
let conditions
let timeOfDay
let enter
let widthInput = 0;
let language = localStorage.getItem('language') || 'be';
const timeNow = document.querySelector('.time')
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const city = document.querySelector('.city');


window.addEventListener('beforeunload', setLocalStorage);

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('name').length) {
    userName.classList.remove('optic');
    userName.value = localStorage.getItem('name');
    getWeather(localStorage.getItem('city').length ? city.value = localStorage.getItem('city')
        : false, localStorage.getItem('language') || 'be');
    changeGreetingLang(localStorage.getItem('language'));
  } else {
    localStorage.getItem('city').length ? city.value = localStorage.getItem('city') : city.placeholder = "Минск";
    getWeather(city.placeholder);
  }

  count = getToDoData() ? getToDoData().count : 0;
  all.classList.add('show');
  if (userName.value) {

    widthInput = returnWidth(userName.value);
    userName.style.width = widthInput + 'px';
    widthInput = 0;
    return
  }
  widthInput = returnWidth(userName.placeholder);
  userName.style.maxWidth = widthInput + 'px';
  widthInput = 0;
});
window.addEventListener('resize', () => {
  if (userName.value) {
    widthInput = returnWidth(userName.value);
    userName.style.width = widthInput + 'px';
    widthInput = 0;
  } else {
    widthInput = returnWidth(userName.placeholder);
    userName.style.width = widthInput + 'px';
    widthInput = 0;
  }
});

function returnWidth(str) {
  let size = (window.innerWidth <= 800 && window.innerWidth > 450) ? 32 : (window.innerWidth <= 450) ? 22 : 60;
  const shadowElem = document.createElement('span');
  shadowElem.style.fontSize = size + 'px';
  shadowElem.innerText = str;
  document.body.append(shadowElem);
  widthInput = shadowElem.offsetWidth;
  shadowElem.remove()
  return widthInput;
}

userName.addEventListener('change', () => {
  if (!userName.value) {
    userName.classList.add('optic');
    userName.style.width = returnWidth(userName.placeholder) + 'px';
    return
  }
  userName.classList.remove('optic');
  userName.style.width = returnWidth(userName.value) + 'px';
});

userName.addEventListener('input', () => {
  if (!userName.value) {
    userName.style.width = returnWidth(userName.placeholder) + 'px';
    return
  }
  userName.classList.remove('optic');
  userName.style.width = returnWidth(userName.value) + 'px';
});

userName.addEventListener('blur', () => {
  if (!userName.value) {
    userName.classList.add('optic');
    userName.style.width = returnWidth(userName.placeholder) + 'px';
    return
  }
  userName.classList.remove('optic');
  userName.style.width = returnWidth(userName.value) + 'px';
});


const setBtn = document.createElement('div');
setBtn.classList.add('setBtn');
document.querySelector('.footer').append(setBtn);
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
  getWeather(localStorage.getItem('city'), e.target.textContent);
  getQuotes();
  wrapLanguage.classList.toggle('lang-opacity');
  languageEl.classList.toggle('lang-active');
});
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
  todoEl.classList.remove('todoEl-active');
});

const textContainer = document.createElement('div')
textContainer.classList.add('textContainer')
document.querySelector('.footer').append(textContainer);
const todoEl = document.createElement('div');
todoEl.classList.add('todoEl');
todoEl.textContent = 'ToDo';
document.querySelector('.set').append(todoEl);

const todoButton = document.createElement('div');
todoButton.classList.add('todoButton');
todoButton.textContent = 'ToDo';
document.querySelector('.footer').append(todoButton);

todoButton.addEventListener('click', () => {
  todoContainer.classList.toggle('todoopen');
})

const todoContainer = document.createElement('div')
todoContainer.classList.add('todoContainer');
document.querySelector('.footer').append(todoContainer);
const todoInnerOptions = document.createElement('div')
todoInnerOptions.classList.add('todoInnerOptions');
todoContainer.append(todoInnerOptions);
const todoViewCompleted = document.createElement('div')
todoViewCompleted.classList.add('todoViewCompleted');
todoViewCompleted.dataset['name'] = 'seeCompleted';
todoViewCompleted.textContent = 'See completed';
document.querySelector('.todoInnerOptions').append(todoViewCompleted);
const todoViewAll = document.createElement('div')
todoViewAll.classList.add('todoViewAll');
todoViewAll.dataset['name'] = 'seeAll';
todoViewAll.textContent = 'See all';
document.querySelector('.todoInnerOptions').append(todoViewAll);
const todoDeleteCompleted = document.createElement('div')
todoDeleteCompleted.classList.add('todoDeleteCompleted');
todoDeleteCompleted.dataset['name'] = 'deleteCompleted';
todoDeleteCompleted.textContent = 'Delete completed'
document.querySelector('.todoInnerOptions').append(todoDeleteCompleted);
const todoDeleteAll = document.createElement('div')
todoDeleteAll.classList.add('todoDeleteAll');
todoDeleteAll.dataset['name'] = 'deleteAll';
todoDeleteAll.textContent = 'Delete all'
document.querySelector('.todoInnerOptions').append(todoDeleteAll);

const todoOptions = document.createElement('div');
todoOptions.classList.add('todoOptions');
todoContainer.append(todoOptions);
const today = document.createElement('div');
today.className = 'whatShow today';
today.dataset['name'] = 'today';
today.textContent = 'Today';
document.querySelector('.todoOptions').append(today);
const before = document.createElement('div');
before.className = 'whatShow before';
before.dataset['name'] = 'before';
before.textContent = 'Before';
document.querySelector('.todoOptions').append(before);
const all = document.createElement('div');
all.className = 'whatShow all';
all.dataset['name'] = 'all';
all.textContent = 'All';
document.querySelector('.todoOptions').append(all);
const todoMenu = document.createElement('div');
todoMenu.classList.add('todoMenu');
document.querySelector('.todoOptions').append(todoMenu);

todoMenu.addEventListener('click', (e) => {
  const toDoData = getToDoData();
  e.stopPropagation()
  before.classList.toggle('close-at-menu');
  today.classList.toggle('close-at-menu');
  all.classList.toggle('close-at-menu');
  inputText.classList.toggle('close-at-menu');
  todoInnerOptions.classList.toggle('open-at-menu-grow');
  checkContainer.classList.toggle('fade');
  checkContainer.innerHTML = '';
  if (document.querySelector('.completedToDo')) {
    document.querySelector('.completedToDo').remove();
  }
  if (document.querySelector('.closeCompleted')) {
    document.querySelector('.closeCompleted').removeEventListener('click', close);
  }
  if (toDoData) {
    toDoData.toDoItemArray.forEach(item => {
      checkContainer.insertAdjacentHTML(`beforeend`, `<label id=${item.id} class="lbl"><input type="checkbox" ${item.done ? 'checked' : ''} class="inp-todo"><span>${item.text}</span></label>`);
    });
  } else {
    // some code here
  }
});


const checkContainer = document.createElement('div');
checkContainer.classList.add('checkContainer');
todoContainer.append(checkContainer);
const inputText = document.createElement('input');
inputText.classList.add('inputText');
inputText.setAttribute('type', 'text');
inputText.setAttribute('id', 'todotext');
if (localStorage.getItem('language') === 'en') {
  inputText.setAttribute('placeholder', 'New ToDo');
} else if (localStorage.getItem('language') === 'be') {
  inputText.setAttribute('placeholder', 'Дадаць запіс');
}
inputText.setAttribute('autocomplete', 'off');
todoContainer.append(inputText);

/*todo работаем с ToDo*/
let count = 0;

function setToDoData(data) {
  localStorage.setItem('toDoData', JSON.stringify(data));
}

function getToDoData() {
  return JSON.parse(localStorage.getItem('toDoData'))
}

/*todo если в локал-стораж не вносились тудушки, или длина листа-тудушек равна 0 - показываем приветственное окно*/
if (!getToDoData() || !getToDoData().toDoItemArray || !getToDoData().toDoItemArray.length) {
  const todoGreetings = document.createElement('div');
  todoGreetings.classList.add('todoGreetings');
  todoGreetings.textContent = 'Make Your New ToDo';
  todoContainer.append(todoGreetings);
  if (todoGreetings) {
    todoGreetings.addEventListener('click', () => {
      todoGreetings.classList.add('todoGreetings-hidden');
      inputText.classList.add('inputText-active');
      todoOptions.classList.add('visible');
    });
  }
  /*todo если тудушки уже есть, рисуем их и устанавливаем счетчик всех тудушек в значение из локал-стоража*/
} else {
  inputText.classList.add('inputText-active');
  todoOptions.classList.add('visible');
  const toDoData = getToDoData();
  toDoData.toDoItemArray.forEach(item => {
    checkContainer.insertAdjacentHTML(`beforeend`, `<label id=${item.id} class="lbl"><input type="checkbox" ${item.done ? 'checked' : ''} class="inp-todo"><span>${item.text}</span></label>`);
  });
}

/*todo слушаем клик по чекбоксу */
checkContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const toDoData = getToDoData();
    toDoData.toDoItemArray.forEach(item => {
      if (e.target.parentElement.id === item.id) {
        if (item['done'] === true) {
          item['done'] = false;
        } else if (item['done'] === false) {
          item['done'] = true;
        }
      }
    });
    setToDoData(toDoData);
  }
});


if (todoOptions) {
  todoOptions.addEventListener('click', ev => {
    if (ev.target.classList.contains('whatShow')) {
      ev.stopPropagation()
      document.querySelectorAll('.whatShow').forEach(item => {
        item.classList.remove('show');
      });
      ev.target.classList.add('show');
      const toDoData = getToDoData();
      if (!toDoData) {
        return
      }
      checkContainer.innerHTML = '';
      switch (ev.target.dataset.name) {
        case 'all': {
          toDoData.toDoItemArray.forEach(item => {
            checkContainer.insertAdjacentHTML(`beforeend`, `<label id=${item.id} class="lbl"><input type="checkbox" ${item.done ? 'checked' : ''} class="inp-todo"><span>${item.text}</span></label>`);
          });
          break;
        }
        case 'today': {
          toDoData.toDoItemArray.forEach(item => {
            if (item.date === new Date().toLocaleDateString()) {
              checkContainer.insertAdjacentHTML(`beforeend`, `<label id=${item.id} class="lbl"><input type="checkbox" ${item.done ? 'checked' : ''} class="inp-todo"><span>${item.text}</span></label>`);
            }
          });
          break;
        }
        case 'before': {
          toDoData.toDoItemArray.forEach(item => {
            if (item.date !== new Date().toLocaleDateString()) {
              checkContainer.insertAdjacentHTML(`beforeend`, `<label id=${item.id} class="lbl"><input type="checkbox" ${item.done ? 'checked' : ''} class="inp-todo"><span>${item.text}</span></label>`);
            }
          });
          break;
        }
      }
    }
  });
}

if (todoInnerOptions) {
  todoInnerOptions.addEventListener('click', ev => {
    const toDoData = getToDoData();
    if (!toDoData || !toDoData.toDoItemArray || !toDoData.toDoItemArray.length) {
      before.classList.toggle('close-at-menu');
      today.classList.toggle('close-at-menu');
      all.classList.toggle('close-at-menu');
      inputText.classList.toggle('close-at-menu');
      todoInnerOptions.classList.toggle('open-at-menu-grow');
      checkContainer.classList.toggle('fade');
      return
    }
    switch (ev.target.dataset.name) {
      case 'seeCompleted': {
        if (document.querySelector('.completedToDo')) {
          return;
        }
        const completed = document.createElement('div');
        completed.className = 'completedToDo';
        toDoData.toDoItemArray.forEach(item => {
          if (item.done) {
            completed.insertAdjacentHTML(`beforeend`, `<label id=${item.id} class="lbl"><input type="checkbox" ${item.done ? 'checked' : ''} class="inp-todo"><span>${item.text}</span></label>`);
          }
        });
        if (completed.children.length < 1) {
          if (localStorage.getItem('language') === 'en') {
            completed.innerText = 'no entries';
          } else {
            completed.innerText = 'нічога не знойдзена';
          }
        }
        const cross = document.createElement('div');
        cross.className = 'closeCompleted';
        completed.append(cross);
        document.querySelector('.body').append(completed);
        const close = () => {
          completed.remove();
        }
        completed.addEventListener('click', e => {
          if (e.target.tagName.toLowerCase() === 'input') {
            toDoData.toDoItemArray.forEach(item => {
              if (e.target.parentElement.id === item.id) {
                if (item['done'] === true) {
                  item['done'] = false;
                } else if (item['done'] === false) {
                  item['done'] = true;
                }
              }
            });
            setToDoData(toDoData);
          }
        })
        cross.addEventListener('click', close);
        break;
      }
      case 'seeAll': {
        before.classList.toggle('close-at-menu');
        today.classList.toggle('close-at-menu');
        all.classList.toggle('close-at-menu');
        document.querySelectorAll('.whatShow').forEach(item => {
          item.classList.remove('show');
        });
        all.classList.add('show');
        inputText.classList.toggle('close-at-menu');
        todoInnerOptions.classList.toggle('open-at-menu-grow');
        checkContainer.innerHTML = '';
        checkContainer.classList.toggle('fade');
        if (document.querySelector('.completedToDo')) {
          document.querySelector('.completedToDo').remove();
        }
        if (document.querySelector('.closeCompleted')) {
          document.querySelector('.closeCompleted').removeEventListener('click', close);
        }
        toDoData.toDoItemArray.forEach(item => {
          checkContainer.insertAdjacentHTML(`beforeend`, `<label id=${item.id} class="lbl"><input type="checkbox" ${item.done ? 'checked' : ''} class="inp-todo"><span>${item.text}</span></label>`);
        });
        break;
      }
      case 'deleteCompleted': {
        toDoData.toDoItemArray = toDoData.toDoItemArray.filter(item => item.done === false);
        toDoData.toDoItemArray.forEach((item, index) => {
          item['id'] = item.id.split('-')[0] + '-' + (index + 1);
        })
        toDoData.count = toDoData.toDoItemArray.length;
        checkContainer.innerHTML = '';
        setToDoData(toDoData);
        if (document.querySelector('.completedToDo')) {
          document.querySelector('.completedToDo').remove();
        }
        if (document.querySelector('.closeCompleted')) {
          document.querySelector('.closeCompleted').removeEventListener('click', close);
        }
        break;
      }
      case 'deleteAll': {
        count = 0;
        localStorage.removeItem('toDoData');
        before.classList.toggle('close-at-menu');
        today.classList.toggle('close-at-menu');
        all.classList.toggle('close-at-menu');
        document.querySelectorAll('.whatShow').forEach(item => {
          item.classList.remove('show');
        });
        all.classList.add('show');
        inputText.classList.toggle('close-at-menu');
        todoInnerOptions.classList.toggle('open-at-menu-grow');
        checkContainer.innerHTML = '';
        checkContainer.classList.toggle('fade');
        if (document.querySelector('.completedToDo')) {
          document.querySelector('.completedToDo').remove();
        }
        if (document.querySelector('.closeCompleted')) {
          document.querySelector('.closeCompleted').removeEventListener('click', close);
        }
        break;
      }
    }
  });
}

function clear() {
  inputText.value = "";
}

/*todo добавляем новые todo в todo контейнер и локал-стораж*/
inputText.addEventListener('change', () => {
  count++
  if (inputText.value) {
    const toDoData = {
      count: count
    }
    checkContainer.insertAdjacentHTML(`beforeend`, `<label id=todo-${count} class="lbl"><input type="checkbox" class="inp-todo"><span>${inputText.value}</span></label>`);
    if (!getToDoData() || !getToDoData().toDoItemArray || !getToDoData().toDoItemArray.length) {
      toDoData.toDoItemArray = [];
      const toDoItem = {
        id: checkContainer.children[checkContainer.children.length - 1].id,
        done: !!checkContainer.children[checkContainer.children.length - 1].children[0].checked,
        text: checkContainer.children[checkContainer.children.length - 1].children[1].innerText,
        date: new Date().toLocaleDateString(),
      }
      toDoData.toDoItemArray.push(toDoItem);
      setToDoData(toDoData);
    } else {
      const data = getToDoData();
      const toDoItem = {
        id: checkContainer.children[checkContainer.children.length - 1].id,
        done: !!checkContainer.children[checkContainer.children.length - 1].children[0].checked,
        text: checkContainer.children[checkContainer.children.length - 1].children[1].innerText,
        date: new Date().toLocaleDateString()
      }
      data.count = count;
      data.toDoItemArray.push(toDoItem);
      setToDoData(data);
    }
  }
  clear();
})

document.querySelector('.todoEl').addEventListener('click', function () {
  wrapSource.classList.remove('source-opacity');
  sourceEl.classList.remove('source-active');
  wrapLanguage.classList.remove('lang-opacity');
  languageEl.classList.remove('lang-active');
  todoEl.classList.toggle('todoEl-active');
  todoContainer.classList.toggle('todoopen');
})

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
    document.querySelector('.set').classList.remove('open');
    document.querySelector('.setBtn').classList.remove('close');
    languageEl.classList.remove('lang-active');
    wrapLanguage.classList.remove('lang-opacity');
    sourceEl.classList.remove('source-active');
    wrapSource.classList.remove('source-opacity');
    todoEl.classList.remove('todoEl-active');
  }
})
setBtn.addEventListener('click', e => {
  e.stopPropagation();
  document.querySelector('.set').classList.add('open');
  document.querySelector('.setBtn').classList.add('close');
})

setClose.addEventListener('click', () => {
  document.querySelector('.set').classList.remove('open')
  document.querySelector('.setBtn').classList.remove('close');
  wrapSource.classList.remove('source-opacity');
  sourceEl.classList.remove('source-active');
  wrapLanguage.classList.remove('lang-opacity');
  languageEl.classList.remove('lang-active');
  todoEl.classList.remove('todoEl-active');
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
      getQuotes();
      getWeather(localStorage.getItem('city'), e.target.textContent);
      document.querySelector('.name').placeholder = enter;
      document.querySelector('.optionLanguage').classList.toggle('open')
    });
  }
}
const greetingTranslation =
    {
      'be': [
        ['Добрай ранiцы', 'Добры дзень', 'Добры вечар', 'Добрай ночы'],
        ['Вецер', 'Вiльготнасць'],
        'Дадаць запіс',
        ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
        ['Cтудзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
        'назавiце сябе...',
        ['Змянiць мову', 'Крыніцы малюнкаў', 'Нататкi'],
        ['Сёння', 'Раней', 'Ўсё', 'Глядзець завершанае', 'Глядзець ўсё', 'Выдаліць завершанае', 'Выдаліць ўсё', '',]
      ],
      'en': [
        ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
        ['Wind', 'Humidity'],
        'Add New ToDo',
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'enter your name...',
        ['Select language', 'Image source', 'ToDo'],
        ['Today', 'Before', 'All', 'See completed', 'See all', 'Delete completed', 'Delete all']
      ]
    }

function changeGreetingLang(lang = 'be') {
  localStorage.setItem('language', lang);
  if (lang === 'en') {
    days = greetingTranslation.en[3];
    months = greetingTranslation.en[4];
    conditions = greetingTranslation.en[1];
    timeOfDay = greetingTranslation.en[0];
    enter = greetingTranslation.en[5];
    languageEl.textContent = greetingTranslation.en[6][0];
    sourceEl.textContent = greetingTranslation.en[6][1];
    todoEl.textContent = greetingTranslation.en[6][2];
    todoButton.textContent = greetingTranslation.en[6][2];
    today.textContent = greetingTranslation.en[7][0];
    before.textContent = greetingTranslation.en[7][1];
    all.textContent = greetingTranslation.en[7][2];
    todoViewCompleted.textContent = greetingTranslation.en[7][3];
    todoViewAll.textContent = greetingTranslation.en[7][4];
    todoDeleteCompleted.textContent = greetingTranslation.en[7][5];
    todoDeleteAll.textContent = greetingTranslation.en[7][6];
    inputText.setAttribute('placeholder', greetingTranslation.en[2]);
    if (document.querySelector('.todoGreetings')) {
      document.querySelector('.todoGreetings').textContent = greetingTranslation.en[2];
    }
  } else {
    days = greetingTranslation.be[3];
    months = greetingTranslation.be[4];
    conditions = greetingTranslation.be[1];
    timeOfDay = greetingTranslation.be[0];
    enter = greetingTranslation.be[5];
    languageEl.textContent = greetingTranslation.be[6][0];
    sourceEl.textContent = greetingTranslation.be[6][1];
    todoEl.textContent = greetingTranslation.be[6][2];
    todoButton.textContent = greetingTranslation.be[6][2];
    today.textContent = greetingTranslation.be[7][0];
    before.textContent = greetingTranslation.be[7][1];
    all.textContent = greetingTranslation.be[7][2];
    todoViewCompleted.textContent = greetingTranslation.be[7][3];
    todoViewAll.textContent = greetingTranslation.be[7][4];
    todoDeleteCompleted.textContent = greetingTranslation.be[7][5];
    todoDeleteAll.textContent = greetingTranslation.be[7][6];
    inputText.setAttribute('placeholder', greetingTranslation.be[2]);
    if (document.querySelector('.todoGreetings')) {
      document.querySelector('.todoGreetings').textContent = greetingTranslation.be[2];
    }

  }
  getWeather(localStorage.getItem('city'), localStorage.getItem('language'));
}

changeGreetingLang();

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

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('language', language);
}

// function getLocalStorage() {
//   if (localStorage.getItem('name')) {
//     document.getElementById('optic').value = localStorage.getItem('name');
//     document.querySelector('.city').value = localStorage.getItem('city');
//     document.getElementById('optic').classList.remove('optic');
//     getWeather(localStorage.getItem('city'), localStorage.getItem('language'));
//     changeGreetingLang(localStorage.getItem('language'));
//   }
//   localStorage.setItem('language', language);
// }


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
  if (linkSource === 1) {
    const img = new Image();
    img.src = "https://raw.githubusercontent.com/AlexBoronin/momentum/main/assets/img/" + getTimeOfDay() + '/' + randomNum + ".webp";
    img.onload = () => {
      document.body.style.backgroundImage = "url(" + img.src + ")";
    };
  } else if (linkSource === 2) {
    getLinkToImageSplash();
  } else if (linkSource === 3) {
    getLinkToImageFlickr();
  }
}


/*todo работа с API погоды*/
let linkSource = 1;
window.addEventListener('click', function (event) {
  if (event.target === document.querySelector('.git')) {
    linkSource = 1;
    document.querySelector('.sourceEl').classList.remove('source-active');
    document.querySelector('.wrapSource').classList.remove('source-opacity');
    setBg()
  } else if (event.target === document.querySelector('.unsplash')) {
    linkSource = 2;
    document.querySelector('.sourceEl').classList.remove('source-active');
    document.querySelector('.wrapSource').classList.remove('source-opacity');
    setBg()
  } else if (event.target === document.querySelector('.flickr')) {
    linkSource = 3;
    document.querySelector('.sourceEl').classList.remove('source-active');
    document.querySelector('.wrapSource').classList.remove('source-opacity');
    setBg()
  }
})

async function getLinkToImageSplash() {
  const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=5m3CSy9wnRfmqHju9qJz8XvuqDQMyNFcvSF3RqoKB8c';
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.tags[setQuote(0, data.tags.length)].source.cover_photo.urls.regular;
  img.onload = () => {
    document.body.style.backgroundImage = "url(" + img.src + ")";
  };
}

async function getLinkToImageFlickr() {
  const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=083fd94699507eb26b98c882993ea07d&tags=nature&extras=url_l&format=json&nojsoncallback=1';
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.photos.photo[setQuote(0, data.photos.photo.length)].url_l;
  img.onload = () => {
    document.body.style.backgroundImage = "url(" + img.src + ")";
  };
}

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


async function getWeather(town = 'Минск', language = 'be') {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=${language}&appid=fcab25aa13ff1f57dc7fb3c098fd5113&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data['weather'][0].id}`);
    temperature.textContent = Math.ceil(Number(`${data['main']['temp']}`)) + '°C';
    weatherDescription.textContent = data['weather'][0].description;
    wind.textContent = `${conditions[0]}: ${data['wind'].speed} m/s`;
    humidity.textContent = `${conditions[1]}: ${data['main']['humidity']}%`;
  }
}


city.addEventListener('change', function () {
  getWeather(city.value, language);
});

/*todo ---- > высказывания*/
async function getQuotes() {
  const quotes = 'https://raw.githubusercontent.com/AlexBoronin/momentum/main/assets/date.json';
  const res = await fetch(quotes);
  const data = await res.json();
  setText(data);
}

getQuotes();

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', () => {
  changeQuote.classList.add('rotate');
  setTimeout(() => {
    changeQuote.classList.remove('rotate');
  }, 1000);

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


/*todo --- > ПЛЕЕР */
import playList from './playList.js'; // импортируем дынные по названию трека, его местоположении и продолжительности

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



