import React from "react";
import classes from "./RecipesDetails.module.css";

function RecipesDetails(props) {
  const cancelDetails = () => {
    props.setToggleDetails(false);
  };
  return (
    <div className={classes.recipesDetails}>
      <div>
        {props.recipes
          .filter((recipes) => recipes.id === props.details.id)
          .map((recipes, id) => (
            <div key={id} className={classes.flex}>
              <div className={classes.details}>
                <p className={classes.wrap}>Name: {recipes.recipeName}</p>
                <p className={classes.wrap}>Source: {recipes.sourceName}</p>
                <div className={classes.wrap}>
                  <p>Ingredients:</p>
                  {recipes.ingredients.map((item, i) => (
                    <div key={i}>
                      <p>
                        {item.name} : {item.qty},
                      </p>
                    </div>
                  ))}
                </div>
                <p className={classes.wrap}>
                  Time: {recipes.prepTimeHours}:{recipes.prepTimeMinutes}
                </p>
                <p className={classes.buttons}>
                  <button onClick={() => props.handleDelete(recipes.id)}>
                    Delete
                  </button>
                  <button onClick={cancelDetails}>Cancel</button>
                </p>
              </div>
              <div className={classes.textArea}>
                <p className={classes.wrap}>Preperation: {recipes.prepInstr}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipesDetails;
