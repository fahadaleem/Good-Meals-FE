export const recipesUtilService = (() => {
  const RECIPES_PER_PAGE = 12;

  function isRecipeSelected(selectedRecipes, recipeName) {
    // Loop through each key in the data object
    for (const key in selectedRecipes) {
      // Loop through each recipe object in the key's array
      for (const recipeObj of selectedRecipes[key]) {
        // Check if the recipe_name matches the given name
        if (recipeObj.recipe_name === recipeName) {
          return true;
        }
      }
    }
    // If the recipe_name was not found, return false
    return false;
  }
  return {
    RECIPES_PER_PAGE,
    isRecipeSelected,
  };
})();
