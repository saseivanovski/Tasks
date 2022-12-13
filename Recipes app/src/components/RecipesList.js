import React from "react";
import classes from "./RecipesList.module.css";
import RecipesDetails from "./RecipesDetails";

function RecipesList(props) {
  const getLastWord = (data) => {
    if (data.length > 50) {
      const arr = data.split(" ");
      const last = arr[arr.length - 1];
      return last;
    }
  };

  return (
    <>
      <div className={classes.table}>
        <table className={classes.recipesList}>
          <thead>
            <tr>
              <td colSpan={7}>Recipes List</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Source</td>
              <td>Ingredients</td>
              <td>Time</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {props.recipes.map((recipes, i) => (
              <tr key={i}>
                <td>{recipes.id}</td>
                <td>{recipes.recipeName}</td>
                <td>{recipes.sourceName}</td>
                {recipes.ingredients.map((item, i) => (
                  <td key={i} className={classes.ingredients}>
                    {item.name} : {item.qty},
                  </td>
                ))}
                <td>
                  {recipes.prepTimeHours}:{recipes.prepTimeMinutes}min
                </td>
                <td className={classes.elipsisDiv}>
                  <div className={classes.elipsis}>{recipes.prepInstr}</div>
                  <div>{getLastWord(recipes.prepInstr)}</div>
                </td>
                <td>
                  <button onClick={() => props.handleDetails(recipes.id)}>
                    Details
                  </button>
                  <button onClick={() => props.handleDelete(recipes.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {props.toggleDetails && props.toggleDetails ? (
          <RecipesDetails
            recipes={props.recipes}
            details={props.details}
            handleDelete={props.handleDelete}
            toggleDetails={props.toggleDetails}
            setToggleDetails={props.setToggleDetails}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default RecipesList;
