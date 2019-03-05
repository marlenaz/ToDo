import DomElements from './domElements.js';
import Display from './displayController.js';
import Categories from './categories.js';
import Helpers from './helpers.js';
import ToDo from './toDo.js';

const Events = (() => {
// CATEGORIES ON MAIN PAGE //
  const renderCategories = (array) => {
    Display.renderCategoriesGrid(array);
    notificationBox(array);
    openCategory(array);
  };

  const refreshCategories = (array) => {
    Display.deleteOldCategoryElements();
    renderCategories(array);
  };

  // ADDING NEW CATEGORY (CATEGORY FORM)//
  // show form with working events
  const btnShowCategoryForm = (array) => {
    DomElements.addCategoryDiv().addEventListener('click', () => {
      categoryFormAppearance();
      categoryFormButtonsFunctionality(array);
    });
  };

  const categoryFormAppearance = () => {
    Display.newCategoryForm();
    Display.showMask();
  };

  const categoryFormButtonsFunctionality = (array) => {
    categoryFormAddBtn(array);
    categoryFormCloseBtn();
  };

  // + button in category form - functionality
  const categoryFormAddBtn = (array) => {
    DomElements.addBtnCategoryForm().addEventListener('click', () => {
      if (categoryFormValidation(array) === true) {
        formValid(array);
      };
    });
  };

  // category form validation
  const categoryFormValidation = (array) => {
    const categoryValue = document.querySelector('input[name=create-category-name]').value;
    const categoryInput = document.querySelector('input[name=create-category-name]')
    if (!categoryInput.checkValidity()) {
      categoryFormValidationMsg('! Category name can not be empty');
    } else if (repeatingName(categoryValue, array) === true) {
      categoryFormValidationMsg('! You can not repeat category name');
    } else {
      return true;
    }
  };

  const categoryFormValidationMsg = (message) => {
    const msgBox = Helpers.createElementAtr('div', DomElements.categoryForm(), 'id', 'category-validation');
    msgBox.textContent = message;
  };

  const repeatingName = (value, array) => {
    const result = array.findIndex(obj => obj.categoryName.toLowerCase() === value.toLowerCase());
    if (result === -1) {
      return false;
    }
    return true;
  };

  const formValid = (array) => {
    pushCategoryIntoArray(array);
    refreshCategories(array);
    refreshSelectOptions(array);
    enableDeleteCategory(array);
    btnShowCategoryForm(array);
    removeCategoryForm();
  };

  const pushCategoryIntoArray = (array) => {
    array.push(Categories.categoryFactory());
  };

  // x button in category form - functionality
  const categoryFormCloseBtn = () => {
    DomElements.closeBtnCategoryForm().addEventListener('click', removeCategoryForm);
  };

  const removeCategoryForm = () => {
    Helpers.removeElement(DomElements.categoryForm(), DomElements.container());
    Display.hideMask();
  };

  // delete category from main viev
  const enableDeleteCategory = (array) => {
    const deleteCategoryButtons = document.querySelectorAll('.categoryDelBtn');
    deleteCategoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        renderNewCategoriesViev(button, array);
      });
    });
  };

  const readBtnNr = btn => btn.id;

  const deleteCategoryFromArray = (btn, array) => {
    const buttonIdNum = readBtnNr(btn);
    array.splice(buttonIdNum, 1);
    return array;
  };

  const renderNewCategoriesViev = (btn, array) => {
    deleteCategoryFromArray(btn, array);
    refreshCategories(array);
    refreshSelectOptions(array);
    btnShowCategoryForm(array);
    enableDeleteCategory(array);
  };

  // TODO //
  // Functions taking filled form into category space
  const addToDoToCategory = (array) => {
    DomElements.addToDoBtn().addEventListener('click', () => {
      toDoFormValidation(array);
    });
  };

  const bind = (array) => {
    let toDo = '';
    if (DomElements.categoriesToSelect()) {
      toDo = ToDo.createToDo();
    } else {
      toDo = ToDo.createToDoInsideCategory();
    }
    const toDoCategoryName = toDo.selectCategory;
    const index = array.findIndex(category => category.categoryName === toDoCategoryName);
    array[index].categoryToDo.push(toDo);
  };

  // Select options in todo
  const renderSelectOptions = (array) => {
    let i = 0;
    array.forEach((category) => {
      const option = Helpers.createElementUnderParent('option', DomElements.categoriesToSelect());
      option.setAttribute('value', `${array[i].categoryName}`);
      option.textContent = `${array[i].categoryName}`.charAt(0).toUpperCase() + `${array[i].categoryName}`.toLowerCase().slice(1);
      i++;
    });
  };

  const deleteOldOptions = () => {
    Helpers.removeAllElements(DomElements.categoriesToSelect());
  };

  const refreshSelectOptions = (array) => {
    deleteOldOptions();
    renderSelectOptions(array);
  };

  // Todo form validation
  const toDoFormValidation = (array) => {
    const taskName = document.querySelector('input[name=task-name]');
    if (!taskName.checkValidity()) {
      validationNegative();
    } else {
      validationPositive(array);
    }
  };

  const createInvalidMsg = () => {
    const invalidTodoMsg = Helpers.createElementUnderParent('div', DomElements.toDoForm());
    if (!document.querySelector('.invalid-todo')) {
      DomElements.toDoForm().appendChild(invalidTodoMsg);
      invalidTodoMsg.classList.add('invalid-todo');
      invalidTodoMsg.innerHTML =`<span>Task name is required</span>
      <img id="arrow" src="image/curved-arrow-red.png">`;
      DomElements.taskNameInput().classList.add('underline');
    }
  };

  const removeInvalidMsg = () => {
    DomElements.taskNameInput().addEventListener('click', () => {
      Helpers.removeExistingElement('.invalid-todo');
      DomElements.taskNameInput().classList.remove('underline');
    });
  };

  const validationPositive = (array) => {
    bind(array);
    resetToDoForm();
    todoConfirmation();
    notificationsOnMainPage(array);
    refreshToDosInsideCategory(array);
  };

  const validationNegative = () => {
    createInvalidMsg();
    removeInvalidMsg();
  };

  // To make it blank again
  const resetToDoForm = () => {
    const taskName = document.querySelector('input[name=task-name]');
    const description = document.querySelector('input[name=description]');
    const dueDate = document.querySelector('input[name=due-date]');
    taskName.value = '';
    description.value = '';
    dueDate.value = '';
  };

  const todoConfirmation = () => {
    toDoAddedMsg();
    toDoAddedMsgRemoval();
  };

  const toDoAddedMsg = () => {
    const successInfo = Helpers.createElementAtr('div', DomElements.toDoForm(), 'id', 'success');
    successInfo.innerHTML = `<span>To-Do successfully added to category</span>
    <i id="done" class="fas fa-check"></i>
    <div id="success-btn"><i id="arr-forward" class="fas fa-long-arrow-alt-right"></i>
    <div id="success-ok">OK</div><i id="arr-back" class="fas fa-long-arrow-alt-left"></i></div>`;
  };

  const toDoAddedMsgRemoval = () => {
    const okBtn = document.getElementById('success-ok');
    okBtn.addEventListener('click', () => {
      Helpers.removeExistingElement('#success');
    });
  };

  // ToDo notifications
  const notificationBox = (array) => {
    array.forEach((category) => {
      if (category.categoryToDo.length > 0) {
        if (!document.querySelector(`#${category.categoryName} div.notification`)) {
          const categoryBox = document.getElementById(category.categoryName);
          const notifier = Helpers.createElementAtr('div', categoryBox, 'class', 'notification');
          notifier.textContent = category.categoryToDo.length;
        } else {
          const notifier = document.querySelector(`#${category.categoryName} div.notification`);
          notifier.textContent = category.categoryToDo.length;
        }
      }
    });
  };
  // page chceck for notifications
  const notificationsOnMainPage = (array) => {
    if (DomElements.categoriesDiv()) {
      notificationBox(array);
    }
  };

  // EACH CATEGORY INSIDES //
  const openCategory = (array) => {
    DomElements.categoriesToOpen().forEach((category) => {
      category.addEventListener('click', () => {
        const title = category.textContent;
        Display.deleteMainContent();
        Display.renderCategoryContent(array, title);
        enableDeleteCard(array); // enable all cards eents (edit, check)
        backToMenu(array);// enablenavbtns
        addToDoCard(array);
      });
    });
  };

  // przeszukuje array i znajduje obiekt kategorii, ktora odpowiada span name
  const searhArray = (array, title) => {
    let categoryEqual = '';
    array.forEach((category) => {
      if (category.categoryName.toLowerCase() === title.toLowerCase()) {
        categoryEqual = category;
      }
    });
    return categoryEqual;
  };

  // dostaje dany obiekt kategorii i wydobywa z niego tablicę
  const arrayOfToDos = (array, title) => {
    const categoryObj = searhArray(array, title);
    return categoryObj.categoryToDo;
  };

  // Nav buttons
  // back
  const backToMenu = (array) => {
    const btnBack = document.getElementById('back-menu');
    btnBack.addEventListener('click', () => {
      Display.deleteMainContent();
      Display.renderHome(array);
    });
  };

  // add
  const addToDoCard = (array) => {
    const addCardBtn = document.getElementById('cards-add');
    addCardBtn.addEventListener('click', () => {
      Display.showMask();
      Display.toDoFormSolo();
      toDoFormSoloEvents(array);
    });
  };
  // solo todo adding form
  const toDoFormSoloEvents = (array) => {
    cancelToDo();
    addToDoToCategory(array);
  };
  // x button
  const cancelToDo = () => {
    const cancelToDoBtn = document.getElementById('cancel-todo-form');
    cancelToDoBtn.addEventListener('click', () => {
      Helpers.removeExistingElement('#solo-todo');
      Display.hideMask();
    });
  };
  // refreshing ToDoes if they were added inside category
  const refreshToDosInsideCategory = (array) => {
    if (document.getElementById('cat-name')) {
      deleteOldTodos();
      renderNewToDos(array);
      enableDeleteCard(array); // all events
    };
  };

  const deleteOldTodos = () => {
    Helpers.removeAllElements(DomElements.toDoCardsDiv());
  };

  const renderNewToDos = (array) => {
    Display.renderToDos(array, DomElements.currentCategoryName());
  };

  // events on a single ToDo card

  // delete single toDo card
  const enableDeleteCard = (array) => {
    const deleteCardButtons = document.querySelectorAll('.fa-trash');
    deleteCardButtons.forEach((button) => {
      button.addEventListener('click', () => {
        renderNewCardsViev(button, array);
      });
    });
  };

  const readParentId = btn => (btn.parentElement).parentElement.id;

  const deleteToDoFromArray = (btn, array) => {
    const parentIdNum = readParentId(btn);
    const toDoArray = arrayOfToDos(array, DomElements.currentCategoryName());
    toDoArray.splice(parentIdNum, 1);
    return array;
  };

  const renderNewCardsViev = (btn, array) => {
    deleteToDoFromArray(btn, array);
    refreshToDosInsideCategory(array);
    // wszystkie pozostałe EL na każdej karcie kategorii (edit, chceck) do refreshToDosInsideCategory
  };


  return {
    renderCategories,
    btnShowCategoryForm,
    enableDeleteCategory,
    addToDoToCategory,
    renderSelectOptions,
    arrayOfToDos,
  };

})();

export default Events;
