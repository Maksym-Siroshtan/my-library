import $ from "../core"; // Импортируем основную функцию для добавления методов в её prototype

// Взаимодействие с классами
$.prototype.addClass = function (...classNames) {
  // Добавляем классы
  for (let i = 0; i < this.length; i++) {
    if (!this[i].classList) {
      // При отсутствии свойста classList у перебираемого элемента, пропускаем его
      continue;
    }

    this[i].classList.add(...classNames);
  }
  return this; // Из метода возвращаем объект для возможности использовать цепочку вызовов(chaining)
};

$.prototype.removeClass = function (...classNames) {
  // Удаляем классы
  for (let i = 0; i < this.length; i++) {
    if (!this[i].classList) {
      continue;
    }

    this[i].classList.remove(...classNames);
  }
  return this;
};

$.prototype.toggleClass = function (className) {
  // Тоглим класс
  for (let i = 0; i < this.length; i++) {
    if (!this[i].classList) {
      continue;
    }

    this[i].classList.toggle(className);
  }
  return this;
};

$.prototype.containsClass = function (className) {
  // Проверяем наличие класса
  for (let i = 0; i < this.length; i++) {
    if (!this[i].classList) {
      continue;
    }

    return this[i].classList.contains(className);
  }
  return this;
};
