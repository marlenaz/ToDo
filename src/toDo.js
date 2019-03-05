const ToDo = (() => {

  const createToDo = () => {
    const taskName = document.querySelector('input[name=task-name]').value;
    const description = document.querySelector('input[name=description]').value;
    const dueDate = document.querySelector('input[name=due-date]').value;
    const priority = document.querySelector('input[name=priority]:checked').value;
    const selectCategory = document.getElementById('select-category').value;

    return {
      taskName,
      description,
      dueDate,
      priority,
      selectCategory,
    };
  };

  const createToDoInsideCategory = () => {
    const taskName = document.querySelector('input[name=task-name]').value;
    const description = document.querySelector('input[name=description]').value;
    const dueDate = document.querySelector('input[name=due-date]').value;
    const priority = document.querySelector('input[name=priority]:checked').value;
    const selectCategory = document.getElementById('cat-name').textContent;

    return {
      taskName,
      description,
      dueDate,
      priority,
      selectCategory,
    };
  };

  return {
    createToDo,
    createToDoInsideCategory,
  };

})();

export default ToDo;
