import $ from "../core"; // Импортируем основную функцию для добавления методов в её prototype

// Обработчики событий
$.prototype.on = function (eventName, callback) {
  // Включить обработчик(имя события, функция которая должна выполниться)
  if (!eventName || !callback) {
    return this;
  }

  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener(eventName, callback);
  }
  return this; // Из метода возвращаем объект для возможности использовать цепочку вызовов(chaining)
};

$.prototype.off = function (eventName, callback) {
  // Выключить обработчик(имя события, функция которая должна выполниться)
  if (!eventName || !callback) {
    return this;
  }

  for (let i = 0; i < this.length; i++) {
    this[i].removeEventListener(eventName, callback);
  }
  return this;
};

$.prototype.click = function (handler) {
  // Обработать событие клика(функция которая выполниться)
  for (let i = 0; i < this.length; i++) {
    if (handler) {
      this[i].addEventListener("click", handler);
    } else {
      this[i].click(); // Если не передан handler, сработает виртуальный клик
    }
  }
  return this;
};
