let drinksPlace = {
  PITNICA: [
    'Хреновица',
    'Клюковка',
    'Облепиховица',
    'Вишневица',
    'Смородиновица',
    'Сливочница',
    'Медовица',
    'Луговица',
    'Чесночница',
  ]
}

let custom = [];

let drinkName = document.querySelector('#randomize__name');
let burger = document.querySelector('.burger');
let headerCloseBtn = document.querySelector('.close-header');
let header = document.querySelector('header');
let button = document.querySelector('#randomize__button');
let buttonAgain = document.querySelector('#randomize__button_again');
let drinksSelect = document.querySelector('#drinks_select');
let newDrinkWrap = document.querySelector('.new-drink__wrap');
let newDrinkBtn = document.querySelector('#new_drink');
let newDrinkInput = document.querySelector('#new_drink_input');
let newDrinkGroupBtn = document.querySelector('#new_drink_group');
let newDrinkGroupInput = document.querySelector('#new_drink_group_input');
let newDrinkList = document.querySelector('.new-drink__list');
let deleteLocal = document.querySelector('#delete_local');
let drinks = [];
let inProcess = false;
let counter = 0;

function changeNum(i) {
  let currentDrink;
  if (i === 29) {
    drinkName.style.color = 'red';
  }
  drinkName.innerText = drinks[Math.floor(Math.random() * drinks.length)];
  if (i === 29) {
    currentDrink = drinkName.innerText;
    drinks.splice(drinks.indexOf(currentDrink), 1);
    if (drinks.length < 2) {
      button.style.display = 'none';
      buttonAgain.style.display = 'block'
    }
  }
}

function randomize() {
  inProcess = true;
  drinkName.style.color = 'black';
  for (let i = 0; i < 30; i++) {
    setTimeout(changeNum, i * (50 + i * 1.2), i);
  }
  counter++;
  if (inProcess) {
    button.innerText = 'Продолжить Вакханалию';
  }
}

function handleChangeDrinksSelect(event) {
  let { value } = event.target;
  
  if (value === 'CUSTOM') {
    setDefaultState();
    showInput();
  } else {
    setDefaultState();
    drinksPlace[value].forEach(item => drinks.push(item)) 
    closeHeader();
  }
}

function setDefaultDrinksSelect() {
  drinksPlace[drinksSelect.value].forEach(item => drinks.push(item))
}

function setDefaultState() {
  button.innerText = 'Начать Вакханалию';
  drinkName.innerText = 'Выбери что пьешь :)';
  inProcess = false
}

function showInput() {
  newDrinkWrap.style.display = 'flex';
}

function hideInput () {
  newDrinkWrap.style.display = 'none';
}

function openHeader() {
  header.style.display = 'block'
} 

function closeHeader() {
  header.style.display = 'none'
}

function handleAddNewDrink() {
  if (newDrinkInput.value.length) {
    custom.push(newDrinkInput.value)
    let listItem = document.createElement('li')
    listItem.classList.add('new-drink__item')
    listItem.innerHTML = `<p>${newDrinkInput.value}</p><div class="new-drink__item-delete"></div>`;
    newDrinkList.appendChild(listItem);
    listItem.querySelector('.new-drink__item-delete').addEventListener('click', handleDeleteDrink)
    newDrinkInput.value = '';
  }
}

function handleDeleteDrink(event) {
  let value = event.target.previousElementSibling.innerHTML;
  let listArray = newDrinkList.querySelectorAll('li');
  custom.splice(custom.indexOf(value), 1);
  listArray.forEach(item => {
    if (item.querySelector('p').innerText === value) {
      item.remove();
    }
  })
}

function handleSaveCustom() {
  if (newDrinkGroupInput.value.length && custom.length) {
    localStorage.setItem(newDrinkGroupInput.value, custom)
    setLocalDrinks();
    closeHeader();
    drinksSelect.value = newDrinkGroupInput.value;
    drinks = custom;
    hideInput();
  }
}

function setLocalDrinks() {
  for( let key in localStorage) {
    if (key === 'length') {
      break;
    }
    drinksPlace[key] = localStorage.getItem(key).split(',')
    let option = document.createElement('option')
    option.value = key;
    option.innerText = key;
    drinksSelect.appendChild(option);
  }
}

function handleRepeat() {
  
  drinksPlace[drinksSelect.value].forEach(item => drinks.push(item))
  drinkName.innerText = 'Выбери что пьешь :)'
  button.innerText = 'Начать Вакханалию!'
  buttonAgain.style.display = 'none';
  button.style.display = 'block';
  
}

button.addEventListener('click', randomize);
burger.addEventListener('click', openHeader);
headerCloseBtn.addEventListener('click', closeHeader);
drinksSelect.addEventListener('change', handleChangeDrinksSelect);
newDrinkBtn.addEventListener('click', handleAddNewDrink);
newDrinkGroupBtn.addEventListener('click', handleSaveCustom);
buttonAgain.addEventListener('click', handleRepeat);
deleteLocal.addEventListener('click', function () {
  localStorage.clear();
  drinksSelect.innerHTML = `<option value="PITNICA">Чешская Питница г. Воронеж</option><option value="CUSTOM">НАЧИСЛИТЬ САМОСТОЯТЕЛЬНО</option>`
});
// drinksSelect.addEventListener('click', function () {
//   if (inProcess) {
//     let change = confirm('Если вы смените заведение, вакханалию придется начать заного. Продолжить?');
//     if (change) {
//       console.dir(drinksSelect)
//       drinksSelect.open();
//     }
//   }
// });
setDefaultDrinksSelect();
setLocalDrinks();
