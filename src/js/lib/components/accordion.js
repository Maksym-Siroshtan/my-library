import $ from "../core"; // Импортируем главную функцию $ для возможности изменять её функционал

$.prototype.accordion = function ( // Функция принимает 3 параметра, 2 класса активности и paddings(для корректной плавной анимации) 
  headActive = "accordion-head--active",
  contentActive = "accordion-content--active",
  paddings = 40
) {
  for (let i = 0; i < this.length; i++) {
    $(this[i]).click(() => { // Кликаем на коллапс элемент(в данном случае элементы с классом accordion-head)
      $(this[i]).toggleClass(headActive); // По клику на коллапс элемент тоглим его класс активности
      $(this[i].nextElementSibling).toggleClass(contentActive); // По клику на коллапс элемент тоглим класс активности у следующего элемента

      if ($(this[i]).containsClass(headActive)) { 
        // Если у коллапс элемента есть класс активности, то у идущего за ним(следующего) элемента зададим свойство max-height равное scrollHeight(та высота которую он должен занимать) + paddings(40, т.к. у блока который будет появляться верхний и нижний паддинги равны по 20px)
        this[i].nextElementSibling.style.maxHeight = this[i].nextElementSibling.scrollHeight + paddings + 'px';
      } else {
        // Иначе, когда не будет активного класса, зададим свойство max-height = 0, так мы спрячем элемент
        this[i].nextElementSibling.style.maxHeight = '0px';
      }
    });
  }
};

$(".accordion-head").accordion(); // Инициализируем коллапс элементы, при клике на которые будем отслеживать события
