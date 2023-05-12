import $ from "../core"; // Импортируем основную функцию для добавления методов в её prototype

// Методы для взаимодействия с элементами
$.prototype.html = function (content) {
  // ***Устанавливаем или получаем текст в выбранную ноду***
  for (let i = 0; i < this.length; i++) {
    if (content) {
      this[i].innerHTML = content; // В выбранный элемент устанавливаем текст переданный в аргумент метода
    } else {
      return this[i].innerHTML; // Если агрумент не задан, возвращаем текст
    }
  }
  return this;
};

$.prototype.eq = function (i) {
  // ***Находим элемент по указанному индексу***
  const swap = this[i]; // Сохраняем индекс указанного элемента
  const objLength = Object.keys(this).length; // Преобразуем в массив для получения длинны

  for (let i = 0; i < objLength; i++) {
    delete this[i]; // Очищаем свойства объекта
  }

  this[0] = swap; // На первую позицию в объект добавляем указанный элемент
  this.length = 1; // Устанавливаем свойство length равное 1 элементу
  return this;
};

$.prototype.index = function () {
  // ***Находим индекс указанного элемента одного родителя***
  const parent = this[0].parentNode; // Находим родителя нужного нам элемента
  const childs = [...parent.children]; // Находим всех потомков родителя

  const findMyIndex = (item) => {
    return item === this[0]; // Если item равен нужному на элементу возвращаем его
  };

  return childs.findIndex(findMyIndex); // Метод findIndex() работает для каждого элемента массива потомков
};

$.prototype.find = function (selector) {
  // ***Находим элементы по селектору внутри уже найденных элементов***
  let numberOfItems = 0; // Будет записано общее кол-во элементов которые подошли по selector
  let counter = 0; // Будет отвечать за количество новых записанных элементов в this

  const copyObj = Object.assign({}, this); // Чтобы избавиться от багов создадим копию основного объекта

  for (let i = 0; i < copyObj.length; i++) {
    // Идём циклом ко скопированному объекту
    const arr = copyObj[i].querySelectorAll(selector); // В каждом из скопированных элементов попробуем найти элементы подходящие по selector
    if (arr.length === 0) {
      continue; // Если ниодного элемента не найдено запустим continue
    }
    // Иначе идём далее
    for (let j = 0; j < arr.length; j++) {
      // Идём циклом по новому arr в который записаны элементы которые подошли по selector
      this[counter] = arr[j]; // В this перезаписываем найденные новые элементы по номерам
      counter++;
    }
    numberOfItems += arr.length; // Общее количество элементов которое было записано
  }
  this.length = numberOfItems; // Записываем длинну модифицированного объекта

  // Для того чтобы удалить хвостик старых ненужных элементов
  /*{
    0: node, // новый элемент
    1: node, // новый элемент
    2: node, // новый элемент
    3: node, // остаток старых ненужных элементов
    4: node  // остаток старых ненужных элементов
    length: 5
  }*/

  const objLength = Object.keys(this).length; // Преобразуем объект в массив для получения длинны
  for (; numberOfItems < objLength; numberOfItems++) {
    delete this[numberOfItems]; // Удалить отсаток ненужных элементов в объекте начиная от numberOfItems
  }

  /*{
  0: node, // новый элемент
  1: node, // новый элемент
  2: node, // новый элемент
  length: 3
  }*/

  return this;
};

$.prototype.closest = function (selector) {
  // ***Возвращаем ближайший родительский элемент (или сам элемент), который соответствует selector или null если таковых элементов нет***
  let counter = 0;

  for (let i = 0; i < this.length; i++) {
    if (!this[i].closest(selector)) {
      // Если элементов соответствующих selector нет(null), вернём объект
      return this;
    }

    this[i] = this[i].closest(selector); // В каждом элементе с помощью нативного closest() пытаемся найти данный selector, если находим записываем и инкрементим counter, чтобы знать сколько свойств записано
    counter++;
  }

  const objLength = Object.keys(this).length; // Преобразуем объект в массив для получения длинны
  for (; counter < objLength; counter++) {
    delete this[counter]; // Удалить отсаток ненужных элементов в объекте начиная от counter
  }
  return this;
};

$.prototype.siblings = function () {
  // ***Получить все соседние элементы не включая сам элемент***
  let numberOfItems = 0; // Будет записано общее кол-во элементов
  let counter = 0; // Будет отвечать за количество новых записанных элементов в this

  const copyObj = Object.assign({}, this); // Чтобы избавиться от багов создадим копию основного объекта

  for (let i = 0; i < copyObj.length; i++) {
    // Идём циклом ко скопированному объекту
    const arr = copyObj[i].parentNode.children; // В каждом из скопированных элементов получаем родителя и его детей
    for (let j = 0; j < arr.length; j++) {
      // Идём циклом по новому arr в который записаны элементы которые являются соседями
      if (copyObj[i] === arr[j]) {
        // Если элемент на котором произошло событие равен тому, который сейчас перебирается, исключаем его
        continue; // Пропускаем элемент, исключаем его из выборки
      }
      this[counter] = arr[j]; // В this перезаписываем найденные новые элементы по номерам, кроме исключённого
      counter++;
    }
    numberOfItems += arr.length - 1; // Общее количество элементов которое было записано, отнимаем(-1) т.к. исключили один элемент
  }
  this.length = numberOfItems; // Записываем длинну модифицированного объекта

  // Для того чтобы удалить хвостик старых ненужных элементов
  /*{
    0: node, // новый элемент
    1: node, // новый элемент
    2: node, // новый элемент
    3: node, // остаток старых ненужных элементов
    4: node  // остаток старых ненужных элементов
    length: 5
  }*/

  const objLength = Object.keys(this).length; // Преобразуем объект в массив для получения длинны
  for (; numberOfItems < objLength; numberOfItems++) {
    delete this[numberOfItems]; // Удалить отсаток ненужных элементов в объекте начиная от numberOfItems
  }

  /*{
  0: node, // новый элемент
  1: node, // новый элемент
  2: node, // новый элемент
  length: 3
  }*/

  return this;
};
