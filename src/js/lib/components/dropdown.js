import $ from "../core"; // Импортируем главную функцию $ для возможности изменять её функционал

$.prototype.dropdown = function() {
  for (let i = 0; i < this.length; i++) {
    const id = $(this[i]).getAttribute('id'); // $(this[i]) - кнопка(триггер). Получили атрибут id="dropdownMenuButton"
    $(this[i]).click(() => { // Ловим клик на триггере
      $(`[data-toggle-id="${id}"]`).fadeToggle(300); // С помощью полученного id, находим элемент, который будем тоглить
    });
  }
};

$('.dropdown-toggle').dropdown(); // Получаем кнопку с помощью класса 'dropdown-toggle' и инициализируем на ней метод dpopdown()