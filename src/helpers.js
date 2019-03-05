const Helpers = (() => {

  const createElementUnderParent = (tag, parent) => {
    const element = document.createElement(tag);
    parent.appendChild(element);
    return element;
  };

  // createing new element, setting atribute and parent
  const createElementAtr = (tag, parent, atribute, atributeName) => {
    const element = document.createElement(tag);
    parent.appendChild(element);
    element.setAttribute(atribute, atributeName);
    return element;
  };

  const createElementClassList = (tag, parent, class1, class2) => {
    const element = document.createElement(tag);
    parent.appendChild(element);
    element.classList.add(class1, class2);
    return element;
  };

  // remove one child element from parent
  const removeElement = (element, parent) => {
    parent.removeChild(element);
  };

  const removeAllElements = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const removeExistingElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.remove();
    }
  };

  const renderMask = (container) => {
    const mask = createElementAtr('div', container, 'class', 'mask');
  };

  return {
    createElementUnderParent,
    createElementAtr,
    createElementClassList,
    removeElement,
    removeAllElements,
    removeExistingElement,
    renderMask,
  };

})();

export default Helpers
