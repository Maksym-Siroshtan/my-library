import $ from "../core"; // Импортируем основную функцию для добавления методов в её prototype

// Взаимодействие с css свойством display
$.prototype.hide = function () {
  // Скрываем найденные элементы
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      // При отсутствии свойста style у перебираемого элемента, пропускаем его
      continue;
    }
    this[i].style.display = "none";
  }
  return this; // Из метода возвращаем объект для возможности использовать цепочку вызовов(chaining)
};

$.prototype.show = function () {
  // Показываем найденные элементы
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }
    this[i].style.display = "";
  }
  return this;
};

$.prototype.toggle = function () {
  // Тоглим найденные элементы
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }

    if (this[i].style.display === "none") {
      this[i].style.display = "";
    } else {
      this[i].style.display = "none";
    }
  }
  return this;
};
