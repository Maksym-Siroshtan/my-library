import $ from "../core"; // Импортируем главную функцию $ для возможности изменять её функционал

$.prototype.carousel = function () {
  for (let i = 0; i < this.length; i++) {
    const width = window.getComputedStyle(
      this[i].querySelector(".carousel-inner")
    ).width; // Получим ширину основного блока для того, чтобы установить равную ширину каждому слайду
    const slides = this[i].querySelectorAll(".carousel-item"); // Получим все слайды
    const slidesField = this[i].querySelector(".carousel-slides"); // Блок объединяющий в себе все имеющиеся слайды
    const dots = this[i].querySelectorAll(".carousel-indicators li"); // Получим все dots(индикаторы)

    slidesField.style.width = 100 * slides.length + "%"; // Установим элементу slidesField ширину в зависимости от количества item(каждый 100%). Делаем это для того чтобы все слайды поместились внутрь и занимали одно и тоже значение по ширине, в не зависимости от контента внутри
    slides.forEach((slide) => (slide.style.width = width)); // Установим одинаковую ширину для каждого отдельного слайда

    let offset = 0; // Переменная нужна для получения значения на которое будет смещён блок slidesField(с помощью transform)
    let slideIndex = 0; // Переменная для отслеживания активного слайда изначально 0, потому что показывается первый слайд

    $(this[i].querySelector('[data-slide="next"]')).click((e) => {
      // Получаем стрелку next и ловим на ней событие 'click'
      e.preventDefault(); // Отменим стандартное поведение браузера, т.к. элемент у нас ссылка

      if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {
        // (+width.replace(/\D/g, '')) в переменной width(ширина каждого отдельного слайда) значение 900px, с помощью метода replace удалим все не числа(px)
        // (slides.length - 1) количество элементов слайдера
        // Если offset равен ширине всех слайдов, тоесть 3 слайда по 900 == 2700, значит достигли конца
        offset = 0; // Если достигли возвращаемся в начало(нулевая позиция)
      } else {
        // Если ещё не конец, прибавляем по одному значению ширины(слайда) в переменную offset
        offset += +width.replace(/\D/g, "");
      }

      slidesField.style.transform = `translateX(-${offset}px)`; // При клике на > cдвигаем блок slidesField справа на лево по горизонтали на offset(-900px)

      if (slideIndex == slides.length - 1) {
        // Если дошли до последнего слайда, скидываем slideIndex в начало
        slideIndex = 0;
      } else {
        // Инкрементим slideIndex пока не дошли до последнего слайда
        slideIndex++;
      }
      dots.forEach((dot) => dot.classList.remove("active")); // Переберём все индикаторы и уберём класс активности
      dots[slideIndex].classList.add("active"); // Добавим класс активности соответствующему slideIndex индикатору
    });

    $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
      // Получаем стрелку prev и ловим на ней событие 'click'
      e.preventDefault(); // Отменим стандартное поведение браузера, т.к. элемент у нас ссылка

      if (offset == 0) {
        // Если offset == 0(значит текущий слайд первый) то присваиваем ему ширину всех слайдов, тем самым перемещаем слайдер в конец
        offset = +width.replace(/\D/g, "") * (slides.length - 1);
        // (+width.replace(/\D/g, '')) в переменной width(ширина каждого отдельного слайда) значение 900px, с помощью метода replace удалим все не числа(px)
        // (slides.length - 1) количество элементов слайдера
      } else {
        // Если ещё не начало(не 0), отнимаем по одному значению ширины(слайда) от переменной offset
        offset -= +width.replace(/\D/g, "");
      }

      slidesField.style.transform = `translateX(-${offset}px)`; // При клике на < cдвигаем блок slidesField слева на право по горизонтали на offset(-900px)

      if (slideIndex == 0) {
        // Если дошли до первого слайда, перемещаем слайдер в конец
        slideIndex = slides.length - 1;
      } else {
        // Декриментим slideIndex пока не дошли до первого слайда
        slideIndex--;
      }
      dots.forEach((dot) => dot.classList.remove("active")); // Переберём все индикаторы и уберём класс активности
      dots[slideIndex].classList.add("active"); // Добавим класс активности соответствующему slideIndex индикатору
    });

    const sliderId = $(this[i]).getAttribute("id"); // Получим id нужного нам слайдера
    $(`#${sliderId} .carousel-indicators li`).click((e) => {
      // Повесим события 'click' на все индикаторы
      const slideTo = e.target.getAttribute('data-slide-to'); // Получим data-slide-to элемента на котором произошёл клик

      slideIndex = slideTo; // Запишем новое полученное при клике значение в переменную slideIndex
      offset = +width.replace(/\D/g, "") * slideTo; // Когда мы хаотично меняем slideIndex у нас довольно сильно изменяется переменная offset. Поэтому возьмём ширину каждого отдельного слайда и умножим её на slideTo(в которой хранится число слайдов которое мы пролистали)

      slidesField.style.transform = `translateX(-${offset}px)`; // При клике на индикатор cдвигаем блок slidesField по горизонтали на offset(-900px)
      
      dots.forEach((dot) => dot.classList.remove("active")); // Переберём все индикаторы и уберём класс активности
      dots[slideIndex].classList.add("active"); // Добавим класс активности соответствующему slideIndex индикатору
    });
  }
};

$(".carousel").carousel(); // $('.carousel') === this[i]
