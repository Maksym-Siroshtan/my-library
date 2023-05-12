// ***Основная функция $ и основной метод функции init()***

//JavaScript прототипно наследуемый язык и у каждой сущности есть свойство prototype, оно позволяет работать с прототипом объекта, т.к. любой тип данных всё-равно приходит к объекту.

const $ = function (selector) {
  // ***Быстрый доступ к элементам с помощью $***
  return new $.prototype.init(selector); // Возвращаем конструктор $.prototype.init(selector). При каждом использовании $(selector) будет создаваться новый объект. Также будет запускаться метод init(selector), который записан в prototype функции $
};

$.prototype.init = function (selector) {
  // ***init(selector) будет использоваться для получения элементов с которыми мы будем работать***
  if (!selector) {
    return this; // Если не передан selector, возвращаем контекст вызова this. В данном случае это пустой {}, т.к. при вызове конструктора(new) мы ссылаемся на новосозданный объект
  }

  if (selector.tagName) {
    // Если элемент является нодой(HTML element) а также он один, нам незачем перебирать его
    this[0] = selector; // Запишем его в объект на первую позицию
    this.length = 1; // Установим свойство length равное одному элементу
    return this; // Останавливаем функцию, т.к. дальше идти нет смысла

    // Пример объекта который мы получим
    /*{           
    0: node
    length: 1
  }*/
  } // Если условие не выполняется движемся далее по коду

  // Возвращаем элементы с которыми будем работать не в виде массива(псевдоколлекции), а в виде объекта. Это даст нам возможность    использовать методы которые есть у определённых объектов
  Object.assign(this, document.querySelectorAll(selector)); // Берём this(главный объект) для того чтобы сохранить свойство prototype. В наш this - а это {} добавляем полученные элементы
  this.length = document.querySelectorAll(selector).length; // В this(главный объект) добавляем свойство length которое в будущем будет использоваться
  return this; // Возвращаем this(главный объект) в котором хранятся prototype и элементы с которыми мы будем взаимодействовать

  // Пример объекта который мы получим
  /*{           
    0: node,
    1: node,
    2: node,
    3: node,
    4: node,
    5: node и т.д...
    length: 6
  }*/
};

$.prototype.init.prototype = $.prototype; // Обращаемся к prototype функции $, в нём содержится метод init(), и у него тоже есть prototype который относится к возвращаемому из него объекту this. Главному объекту(this) возвращаемому из init() мы присваиваем прототип функции $. Это даёт нам главное преимущество, теперь на объекте, который будет создаваться при помощи функции $, мы можем использовать любые методы, которые будут внутри prototype этой функции
window.$ = $; // Функцию $ записываем в глобальный объект window. Для возможности использовать её глобально

export default $; // Экспортируем функцию, т.к. библиотека будет собираться из разных кусочков и эта функция будет использоваться в отдельных файлах куда мы будем её импортировать
