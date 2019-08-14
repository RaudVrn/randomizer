let drink_name = document.querySelector('#randomize__name');
let button = document.querySelector('#randomize__button');
let drinks = [
  'Хреновица',
  'Клюковка',
  'Облепиховица',
  'Вишневица',
  'Смородиновица',
  'Сливочница',
  'Медовица',
  'Луговица',
  'Перцовица',
];
let counter = 0;

let changeNum = function(i) {
  let currentDrink;
  if (i === 29) {
    drink_name.style.color = 'red';
  }
  drink_name.innerText = drinks[Math.floor(Math.random() * drinks.length)];
  if (i === 29) {
    currentDrink = drink_name.innerText;
    drinks.splice(drinks.indexOf(currentDrink), 1);
    console.log(drinks);
  }
};
let randomize = function() {
  drink_name.style.color = 'black';
  for (let i = 0; i < 30; i++) {
    setTimeout(changeNum, i * (50 + i * 1.2), i);
  }
  counter++;
  if (counter > 0) {
    button.innerText = 'Продолжить Вакханалию';
  }
};

button.addEventListener('click', randomize );
