import Helpers from './helpers.js';
import DomElements from './domElements.js';
import Events from './eventController.js';
import Categories from './categories.js';

const Display = (() => {
  // basic home viev
  const renderHome = (array) => {
    // categories section
    const menu = Helpers.createElementAtr('div', DomElements.container(), 'id', 'menu');
    const titleDiv = Helpers.createElementUnderParent('div', menu);
    titleDiv.innerHTML = `<h1>To do list</h1><h2>Select category</h2>`;
    const categoriesDiv = Helpers.createElementAtr('div', menu, 'id', 'categories');
    Events.renderCategories(array);
    Events.enableDeleteCategory(array);
    Events.btnShowCategoryForm(array);
    renderToDoFormSection(array);
    // form mask
    Helpers.renderMask(DomElements.container());
  };

  // todo form section
  const renderToDoFormSection = (array) => {
    const toDoForm = Helpers.createElementAtr('div', DomElements.container(), 'id', 'new-todo');
    const toDoFormTitle = Helpers.createElementUnderParent('h3', toDoForm);
    toDoFormTitle.textContent = 'Add new thing to do';
    const toDoFormBody = Helpers.createElementAtr('div', toDoForm, 'id', 'new-todo-form');
    const toDoFormName = Helpers.createElementUnderParent('div', toDoFormBody);
    toDoFormName.innerHTML = `<label>Task name:</label>
    <input type="text" name="task-name" required/><u></u>`;
    const toDoFormDescription = Helpers.createElementUnderParent('div', toDoFormBody);
    toDoFormDescription.innerHTML = `<label>Description:</label>
    <input type="text" name="description" required/><u></u>`;
    const toDoFormDate = Helpers.createElementUnderParent('div', toDoFormBody);
    toDoFormDate.innerHTML = `<label>Due date:</label>
    <input type="date" name="due-date" required/><u></u>`;
    const toDoFormPriority = Helpers.createElementAtr('div', toDoFormBody, 'class', 'row-border');
    toDoFormPriority.innerHTML = `<label>Priority:</label><br>
    <label class="radio-label"><input type="radio" name="priority" value="high" checked>High</label>
    <label class="radio-label"><input type="radio" name="priority" value="medium">Medium</label>
    <label class="radio-label"><input type="radio" name="priority" value="low">Low</label>
    <u></u>`;
    const toDoFormSelect = Helpers.createElementAtr('div', toDoFormBody, 'class', 'row-border');
    toDoFormSelect.innerHTML = `<label>Select category:</label><br>
    <select id="select-category" name="categories"></select><u></u>`;
    Events.renderSelectOptions(array);
    const toDoFormButton = Helpers.createElementAtr('button', toDoFormBody, 'id', 'add-todo');
    toDoFormButton.innerHTML = `<span>+</span>`;
    Events.addToDoToCategory(array);
  };

  // html for categories boxes
  const renderCategoriesGrid = (array) => {
    let i = 0;
    array.forEach((category) => {
      const categoryDiv = Helpers.createElementClassList('div', DomElements.categoriesDiv(), 'category', 'open');
      categoryDiv.setAttribute('id', `${category.categoryName}`);
      const categorySpan = Helpers.createElementUnderParent('span', categoryDiv);
      categorySpan.textContent = category.categoryName;
      const categoryDeleteBtn = Helpers.createElementUnderParent('button', categoryDiv);
      categoryDeleteBtn.classList.add('categoryDelBtn', 'material-icons');
      categoryDeleteBtn.setAttribute('id', i);
      categoryDeleteBtn.textContent = 'delete';
      i++;
    });
    const addCategoryDiv = Helpers.createElementUnderParent('div', DomElements.categoriesDiv());
    addCategoryDiv.setAttribute('class', 'category');
    addCategoryDiv.setAttribute('id', 'add-category');
    addCategoryDiv.innerHTML = `<span>Add category</span><br><span id="add" class="material-icons">add</span>`;
  };

  // deleting old categories elements, making space for new
  const deleteOldCategoryElements = () => {
    Helpers.removeAllElements(DomElements.categoriesDiv());
  };

  // render html for category adding form
  const newCategoryForm = () => {
    const categoryForm = Helpers.createElementAtr('div', DomElements.container(), 'id', 'category-form');
    categoryForm.innerHTML = `<h3 id="category-form-heading">Create new category</h3>
      <label>Category name:</label>
      <input type="text" name="create-category-name" required/>
      <button id="add-category-btn"><span>+</span></button>
      <button id="cancel-category"<span>X</span></button>`;
  };

  // darken background under category form
  const showMask = () => {
    DomElements.mask().setAttribute('id', 'mask');
  };

  const hideMask = () => {
    DomElements.mask().removeAttribute('id');
  };

  // Viev inside each categoryDiv
  const deleteMainContent = () => {
    Helpers.removeAllElements(DomElements.container());
  };

  const renderCategoryContent = (array, title) => {
    const categoryHeaderDiv = Helpers.createElementAtr('div', DomElements.container(), 'id', 'card-container');
    const categoryTitleDiv = Helpers.createElementAtr('div', categoryHeaderDiv, 'id', 'title');
    categoryTitleDiv.innerHTML = `<i id="back-menu" class="fas fa-long-arrow-alt-left"></i>
    <h1 id='cat-name'>${title}</h1>
    <i id="cards-add" class="fas fa-plus"></i>`;
    const toDoCardsDiv = Helpers.createElementAtr('div', categoryHeaderDiv, 'id', 'cards');
    renderToDos(array, title);
    Helpers.renderMask(DomElements.cardContainer());
  };

  const renderToDos = (array, title) => {
    const toDos = Events.arrayOfToDos(array, title);
    let i = 0;
    toDos.forEach((todo) => {
      const toDoCard = Helpers.createElementAtr('div', DomElements.toDoCardsDiv(), 'class', 'card');
      toDoCard.setAttribute('id', `${i}`);
      const cardHeader = Helpers.createElementAtr('div', toDoCard, 'class', 'card-header');
      const deadline = Helpers.createElementAtr('div', cardHeader, 'class', 'deadline');
      deadline.textContent = todo.dueDate;
      const cardTitle = Helpers.createElementAtr('div', cardHeader, 'class', 'card-title');
      cardTitle.textContent = todo.taskName;
      const priorityLvl = Helpers.createElementAtr('div', toDoCard, 'class', 'priority-level');
      priorityLvl.textContent = `${todo.priority} priority`;
      priorityLvl.classList.add(`${todo.priority}`);
      const description = Helpers.createElementAtr('div', toDoCard, 'class', 'todo-description');
      description.textContent = todo.description;
      const toDoFooter = Helpers.createElementAtr('div', toDoCard, 'class', 'todo-footer');
      toDoFooter.innerHTML =
      // `<div class="check-box">
      // <label><input type="checkbox" name="" value="done"><span>Done</span></label>
      // </div>
      // <i class="fas fa-edit"></i>
      `<i class="fas fa-trash"></i>`;
      i++;
    });
  };

  const toDoFormSolo = () => {
    const toDoForm = Helpers.createElementAtr('div', DomElements.cardContainer(), 'id', 'solo-todo');
    const toDoFormTitle = Helpers.createElementUnderParent('h3', toDoForm);
    toDoFormTitle.textContent = 'Add new thing to do';
    const toDoFormBody = Helpers.createElementAtr('div', toDoForm, 'id', 'new-todo-form');
    const toDoFormName = Helpers.createElementUnderParent('div', toDoFormBody);
    toDoFormName.innerHTML = `<label>Task name:</label>
    <input type="text" name="task-name" required/><u></u>`;
    const toDoFormDescription = Helpers.createElementUnderParent('div', toDoFormBody);
    toDoFormDescription.innerHTML = `<label>Description:</label>
    <input type="text" name="description" required/><u></u>`;
    const toDoFormDate = Helpers.createElementUnderParent('div', toDoFormBody);
    toDoFormDate.innerHTML = `<label>Due date:</label>
    <input type="date" name="due-date" required/><u></u>`;
    const toDoFormPriority = Helpers.createElementAtr('div', toDoFormBody, 'class', 'row-border');
    toDoFormPriority.innerHTML = `<label>Priority:</label><br>
    <label class="radio-label"><input type="radio" name="priority" value="high" checked>High</label>
    <label class="radio-label"><input type="radio" name="priority" value="medium">Medium</label>
    <label class="radio-label"><input type="radio" name="priority" value="low">Low</label>
    <u></u>`;
    const toDoFormButton = Helpers.createElementAtr('button', toDoFormBody, 'id', 'add-todo');
    toDoFormButton.innerHTML = `<span>+</span>`;
    const toDoFormCancelBtn = Helpers.createElementAtr('button', toDoFormBody, 'id', 'cancel-todo-form');
    toDoFormCancelBtn.innerHTML = `<span>X</span>`;
  };

  return {
    renderHome,
    renderCategoriesGrid,
    deleteOldCategoryElements,
    newCategoryForm,
    showMask,
    hideMask,
    deleteMainContent,
    renderCategoryContent,
    renderToDos,
    toDoFormSolo,
  };
})();

export default Display
