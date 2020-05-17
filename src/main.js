import {createSiteMenuTemplate} from "./components/sitemenu.js";
import {createFilterTemplate} from "./components/sortingmenu.js";
import {createBoardTemplate} from "./components/board.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/taskeditor.js";
import {createLoadMoreButtonTemplate} from "./components/showmorebutton.js";
import {generateFilters} from "./mock/filters.js";
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 22;
const SHOWING_TASK_COUNT_ON_START = 8;
const SHOWING_TASK_COUNT_ON_BUTTON = 8;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTaskCount = SHOWING_TASK_COUNT_ON_START;

tasks.slice(1, showingTaskCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTaskCount;
  showingTaskCount = showingTaskCount + SHOWING_TASK_COUNT_ON_BUTTON;

  tasks.slice(prevTasksCount, showingTaskCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTaskCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
