const Categories = (() => {

  const categoryFactory = () => {
    const categoryName = document.querySelector('input[name=create-category-name]').value;
    const categoryToDo = [];

    return { categoryName, categoryToDo };
  };

  const projectArray = () => {
    const contentArray = [
      { categoryName: 'Home', categoryToDo: [] },
      { categoryName: 'Work', categoryToDo: [] },
      { categoryName: 'Activities', categoryToDo: [] },
      { categoryName: 'Appointments', categoryToDo: [] },
      { categoryName: 'Other', categoryToDo: [] },
    ];
    return contentArray;
  };

  return {
    categoryFactory,
    projectArray,
  }

})();

export default Categories;
