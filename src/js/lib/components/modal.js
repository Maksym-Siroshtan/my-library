import $ from "../core"; // Импортируем главную функцию $ для возможности изменять её функционал

$.prototype.modal = function(created) {
  function calcScroll() {
    // Функция calcScroll() используется для измерения размера сколла в браузере
    const div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  const scroll = calcScroll();

  for (let i = 0; i < this.length; i++) {
    // Перебираем триггеры с data-toggle="modal" и получаем атрибут 'data-target' элемента который сейчас перебирается
    const target = $(this[i]).getAttribute('data-target');
    $(this[i]).click((e) => {
      e.preventDefault();
      // При клике на триггер отменяем стандартное поведение, т.к. он может быть ссылкой и для полученного target применяем метод fadeIn()
      $(target).fadeIn(500); // Показываем модальное окно через 0.5 сек.
      document.body.style.overflow = 'hidden'; // Убираем вертикальный скролл
      document.body.style.marginRight = `${scroll}px`; // Подставляем значение функции calcScroll() чтобы убрать дёрганье страницы
    });

    const closeElements = document.querySelectorAll(`${target} [data-close]`); // Получаем все элементы с 'data-close' в текущем target
    closeElements.forEach(elem => {
      $(elem).click((e) => {
        e.preventDefault();
        // При клике на триггер отменяем стандартное поведение, т.к. он может быть ссылкой и для полученного target применяем метод hide()
        $(target).hide(); // Прячем модальное окно
        document.body.style.overflow = ''; // Возвращаем вертикальный скролл
        document.body.style.marginRight = `0px`; // Убираем значение функции calcScroll() чтобы убрать дёрганье страницы
         if (created) {
          // Если true, то модальное окно создано програмно, и для того чтобы не накладывалось одно окно на другое с одним и тем же id, будем удалять target
          document.querySelector(target).remove();
         }
      });
    });
  
    $(target).click((e) => {
      // При клике на текущий target проверим, есть ли у объекта события класс 'modal', если да, закрываем его при клике на подложку
      if (e.target.classList.contains('modal')) {
        $(target).hide(); // Прячем модальное окно
        document.body.style.overflow = ''; // Возвращаем вертикальный скролл
        document.body.style.marginRight = `0px`; // Убираем значение функции calcScroll() чтобы убрать дёрганье страницы
        if (created) {
          // Если true, то модальное окно создано програмно, и для того чтобы не накладывалось одно окно на другое с одним и тем же id, будем удалять target
          document.querySelector(target).remove();
         }
      }
    });
  }
};

$('[data-toggle="modal"]').modal(); // Инициализируем триггеры по дата-атрибуту data-toggle="modal"

$.prototype.createModal = function({text, btns: {count, settings} = {}} = {}) {
  // С помощью метода createModal создаём динамическое модальное окно. Метод принимает объект с настройками
  for (let i = 0; i < this.length; i++) {
    // Перебираем объект с триггерами и создаём блок обёртку 'modal' для нашего модального окна
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', $(this[i]).getAttribute('data-target').slice(1)); // Устанавливаем модальному окну атрибут 'data-target' полученный на триггере. С помощью slice(1) обрезаем #

    //btns = {count:num, settings: [[text, classNames, close, cb]]}
    const buttons = [];
    for (let j = 0; j < count; j++) {
      // Переданный в createModal() объект содержит свойство count, с помощью его при создании модального окна мы будем контролировать количество кнопок. Переменная j отвечает за номер кнопки
      let btn = document.createElement('button'); // Например count: 3, создаст нам 3 кнопки 
      btn.textContent = settings[j][0]; // Из аргумента достанем текст кнопки и запишем его 
      btn.classList.add('btn', ...settings[j][1]); // Из аргумента достанем классы кнопки и запишем их
      if (settings[j][2]) {
        // Если атрибут close == true, значит кнопка будет закрывать модальное окно, поэтому добавим 'data-close'
        btn.setAttribute('data-close', 'true');
      }
      if (settings[j][3] && typeof(settings[j][3]) === 'function') {
        // Если cb передан и тип cb функция, тогда на текущую кнопку добавим обработчик клика с этой cb-функцией
        btn.addEventListener('click', settings[j][3]);
      }
      buttons.push(btn); // Запушим каждую кнопку в массив buttons
    }

    // С помощью интерполяции в обёртку 'modal' добавим разметку нашего модального окна, и передадим текстовые значения title и body. Buttons не можем передать, т.к. это массив
    modal.innerHTML = `
    <div class="modal-dialog" >
      <div class="modal-content">
        <button class="close" data-close>
          <span>&times;</span>
        </button>
        <div class="modal-header">
          <h5 class="modal-title">${text.title}</h5>
        </div>
        <div class="modal-body">
          <p class="modal-text">
            ${text.body}
          </p>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
    `;
    modal.querySelector('.modal-footer').append(...buttons); // В модальном окне получим div с классом 'modal-footer', с помощью spread оператора развернём кнопки и добавим с помощью метода append
    document.body.appendChild(modal); // Поместим на страницу модальное окно
    $(this[i]).modal(true); // Т.к. передан аргумент true, чтобы модальные окна не наслаивались будем их удалять
    $(this[i].getAttribute('data-target')).fadeIn(500); // Получим модальное окно по 'data-target' и присеним метод fadeIn()
  }
};