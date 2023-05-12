import $ from "../core"; // Импортируем основную функцию для добавления методов в её prototype

// Взаимодействие с анимациями fadeIn, fadeOut
$.prototype.animateOverTime = function (duration, callback, final) {
  // ***Функция которая будет запускать анимации. Принимает duration - продолжительность, callback - функция которая будет выполняться после запуска анимации, final - функция которая выполнится после того как анимация отработала. Единственный обязательный параметр duration, остальные можно опустить***
  let timeStart; // В начале undefined, нужна чтобы запустить анимацию

  function _animateOverTime(time) {
    // Техническая функция для requestAnimationFrame() которая каждый раз при запуске получает time
    if (!timeStart) {
      // Т.к timeStart == undefined, условие сработает
      timeStart = time; // Начинаем анимацию, записываем полученный time в переменную timeStart
    }

    let timeElapsed = time - timeStart; // Отслеживаем прогресс анимации, каждый раз берём время time, которое нам приходит и отнимаем наше начальное время
    let complection = Math.min(timeElapsed / duration, 1); // Переменная complection будет отвечать за изменение параметров на странице. timeElapsed / duration - вычисляем от 0.01 до 1 и далее..., но как только значение будет > "1" Math.min() вернёт второй аргумент "1", т.к. он будет минимальным. Это нужно для того чтобы не сломать css стили, т.к. свойство opacity в интервале от 0 до 1

    callback(complection); // Теперь при каждом запуске анимации будем изменять значение свойства opacity в зависимости от complection

    if (timeElapsed < duration) {
      // Пока прогресс времени будет меньше продолжительности запускаем анимацию
      requestAnimationFrame(_animateOverTime);
    } else {
      if (typeof final === "function") {
        // Иначе, если анимация закончилась, а также передана функция final(), запустим её
        final();
      }
    }
  }
  return _animateOverTime; // Для того чтобы использовать функцию в других методах, возвращаем её
};

$.prototype.fadeIn = function (duration, display, final) {
  // ***Показывает на странице элементы через анимацию fadeIn***
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = display || "block"; // Установим элементам display: 'block', т.к. если будет "none", мы не увидим opacity

    const _fadeIn = (complection) => {
      // Напишем техническую функцию которая принимает изменяемый параметр complection для запуска анимации. Она будет изменять opacity от 0 до 1. Пишем функцию в виде => для сохранения контекста вызова(this)
      this[i].style.opacity = complection;
    };

    const ani = this.animateOverTime(duration, _fadeIn, final); // Теперь из prototype нашего объекта можем вытащить метод animateOverTime в который необходимо передать 3 аргумента duration - продолжительность, которую мы установим при вызове метода fadeIn, callback - функция которая будет выполняться после запуска анимации, final - (необязательный) аргумент - функция которая выполнится после того как анимация отработала.
    requestAnimationFrame(ani); // Воспроизвести анимацию
  }
  return this;
};

$.prototype.fadeOut = function (duration, final) {
  // ***Скрывает элементы на странице через анимацию fadeOut***
  for (let i = 0; i < this.length; i++) {
    const _fadeOut = (complection) => {
      // Напишем техническую функцию которая принимает изменяемый параметр complection для запуска анимации. Она будет изменять opacity от 1 до 0. Пишем функцию в виде => для сохранения контекста вызова(this)
      this[i].style.opacity = 1 - complection; // С каждым запуском элемент будет становиться более прозрачным, т.к. complection будет увеличиваться
      if (complection === 1) {
        // Если true, нам далее нет смысла уменьшать прозрачность, т.к. достигли предела
        this[i].style.display = "none"; // Установим элементам display: 'none'
      }
    };

    const ani = this.animateOverTime(duration, _fadeOut, final); // Теперь из prototype нашего объекта можем вытащить метод animateOverTime в который необходимо передать 3 аргумента duration - продолжительность, которую мы установим при вызове метода fadeOut, callback - функция которая будет выполняться после запуска анимации, final - (необязательный) аргумент - функция которая выполнится после того как анимация отработала.
    requestAnimationFrame(ani); // Воспроизвести анимацию
  }
  return this;
};

$.prototype.fadeToggle = function (duration, display, final) {
  // ***Тоглим элементы на странице через анимацию fadeToggle***
  for (let i = 0; i < this.length; i++) {
    if (window.getComputedStyle(this[i]).display === 'none') { 
      // Если display: 'none', задаём 'block' и запускаем _fadeIn(показываем)
      this[i].style.display = display || "block";

      const _fadeIn = (complection) => {
        this[i].style.opacity = complection;
      };
  
      const ani = this.animateOverTime(duration, _fadeIn, final);
      requestAnimationFrame(ani);
    } else {
      // Иначе, если display: 'block', запускаем _fadeOut(скрываем) и задаём 'none'
      const _fadeOut = (complection) => {
        this[i].style.opacity = 1 - complection;
        if (complection === 1) {
          this[i].style.display = "none";
        }
      };
  
      const ani = this.animateOverTime(duration, _fadeOut, final);
      requestAnimationFrame(ani);
    }
  }
  return this;
};
