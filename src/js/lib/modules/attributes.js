import $ from "../core"; // Импортируем основную функцию для добавления методов в её prototype

// Взаимодействие с атрибутами
$.prototype.setAttribute = function (attr, value) {
  // Установить атрибут
  if (!attr || !value) {
    return this;
  }

  for (let i = 0; i < this.length; i++) {
    this[i].setAttribute(attr, value);
  }
  return this; // Из метода возвращаем объект для возможности использовать цепочку вызовов(chaining)
};

$.prototype.getAttribute = function (attr) {
  // Получить атрибут
  for (let i = 0; i < this.length; i++) {
    return this[i].getAttribute(attr);
  }
  return this;
};
