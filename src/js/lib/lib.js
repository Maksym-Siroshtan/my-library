// Файл экспортов для объединения всего, где будем собирать библиотеку. Файл нужен для того чтобы обогатить функционал функции $ различными методами
import $ from "./core"; // Импортируем главную функцию $ для возможности изменять её функционал

//Модули которые будут подвязаны к функции $ т.к. в её prototype будет записан различный функционал
import "./modules/display"; // Взаимодействие с css свойством display
import "./modules/classes"; // Взаимодействие с классами
import "./modules/attributes"; // Взаимодействие с атрибутами
import "./modules/handlers"; // Обработчики событий
import "./modules/actions"; // Методы для взаимодействия с элементами
import "./modules/effects"; // Взаимодействие с анимациями fadeIn, fadeOut
import "./components/dropdown"; // Dropdown
import "./components/modal"; // Динамическое и статическое создание модальных окон
import "./components/tab"; // Tabs
import "./components/accordion"; // Accordion - collapse
import "./components/carousel"; // Carousel - slider
import "./services/requests"; // Сервис запросов(GET, POST)

export default $; // Экспортируем уже модифицированную функцию $
