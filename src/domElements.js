const DomElements = (() => {

  // HOME //
  const container = () => document.getElementById('container');
  const menu = () => document.getElementById('menu');
  const titleDiv = () => document.querySelector('#menu div');
  const categoriesDiv = () => document.getElementById('categories');
  const categoriesToOpen = () => document.querySelectorAll('.open span');
  const categoryByName = () => document.querySelector(`.open span.value=${category.categoryName}`);
  const addCategoryDiv = () => document.getElementById('add-category');

  // CATEGORY FORM //
  const categoryForm = () => document.getElementById('category-form');
  const mask = () => document.querySelector('.mask');
  const addBtnCategoryForm = () => document.getElementById('add-category-btn');
  const closeBtnCategoryForm = () => document.getElementById('cancel-category');

  // TODO FORM //
  const toDoForm = () => document.getElementById('new-todo-form');
  const taskNameInput = () => document.querySelector('input[name=task-name]');
  const addToDoBtn = () => document.getElementById('add-todo');
  const categoriesToSelect = () => document.getElementById('select-category');

  // CATEGORY PAGE //
  const cardContainer = () => document.getElementById('card-container');
  const toDoCardsDiv = () => document.getElementById('cards');
  const currentCategoryName = () => document.getElementById('cat-name').textContent;

  return {
    container,
    menu,
    titleDiv,
    categoriesDiv,
    categoriesToOpen,
    addCategoryDiv,
    categoryForm,
    mask,
    addBtnCategoryForm,
    closeBtnCategoryForm,
    toDoForm,
    taskNameInput,
    addToDoBtn,
    categoriesToSelect,
    cardContainer,
    toDoCardsDiv,
    currentCategoryName,
  };

})();

export default DomElements
