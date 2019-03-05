import Display from './displayController.js';
import Categories from './categories.js';

const loadPage = (() => {
  Display.renderHome(Categories.projectArray());
})();
