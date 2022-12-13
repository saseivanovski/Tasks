import { useState } from "react";
import classes from "./Form.module.css";

function Form(props) {
  const [recipeName, setRecipeName] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", qty: "" }]);
  const [prepTimeHours, setPrepTimeHours] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
  const [prepInstr, setPrepInstr] = useState("");

  function submit(ev) {
    ev.preventDefault();
    //ADD ALL VALUES
    const result = {
      id: Math.floor(Math.random() * 10000),
      recipeName,
      sourceName,
      ingredients,
      prepTimeHours,
      prepTimeMinutes,
      prepInstr,
    };
    props.addRecipe(result);
  }

  //GET VALUES FOR INGREDIENTS
  function handleIngredientNameChange(ev, index) {
    setIngredients([
      ...ingredients.slice(0, index),
      { ...ingredients[index], name: ev.target.value },
      ...ingredients.slice(index + 1),
    ]);
  }

  function handleIngredientQtyChange(ev, index) {
    setIngredients([
      ...ingredients.slice(0, index),
      { ...ingredients[index], qty: ev.target.value },
      ...ingredients.slice(index + 1),
    ]);
  }

  //ADD / REMOVE
  function addIngredient() {
    setIngredients([...ingredients, { name: "", qty: "" }]);
  }
  function undoIngredient() {
    setIngredients([...ingredients.slice(0, -1)]);
  }

  return (
    <div className={classes.form}>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="recipeName">Name:</label>
          <input
            type="text"
            name="recipeName"
            maxLength="15"
            value={recipeName}
            onChange={({ target: { value } }) => setRecipeName(value)}
            required
          />
          <label htmlFor="sourceName">Source:</label>
          <input
            type="text"
            name="sourceName"
            maxLength="15"
            value={sourceName}
            onChange={({ target: { value } }) => setSourceName(value)}
          />
        </div>
        {ingredients.map((ing, i) => {
          return (
            <div key={i}>
              <label htmlFor="listIngr">Ingredients:</label>
              <select
                className={classes.selection}
                type="text"
                name="listIngr"
                value={ingredients[i].name}
                onChange={(ev) => handleIngredientNameChange(ev, i)}
                required
              >
                <option hidden></option>
                <option value="Flour">Flour</option>
                <option value="Milk">Milk</option>
                <option value="Oil">Oil</option>
                <option value="Salt">Salt</option>
                <option value="Sugar">Sugar</option>
                <option value="Eggs">Eggs</option>
                <option value="Tomatoes">Tomatoes</option>
                <option value="Peppers">Peppers</option>
                <option value="Cheese">Cheese</option>1
                <option value="Potatoes">Potatoes</option>
                <option value="Meat">Meat</option>
              </select>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={ingredients[i].qty}
                onChange={(ev) => handleIngredientQtyChange(ev, i)}
                required
              />
            </div>
          );
        })}
        <button type="button" onClick={addIngredient}>
          Add Ingredients
        </button>
        <button type="button" onClick={undoIngredient}>
          Undo
        </button>
        <div>
          <label htmlFor="prepTimeHours">Hours:</label>
          <input
            type="number"
            name="prepTimeHours"
            value={prepTimeHours}
            onChange={({ target: { value } }) => setPrepTimeHours(value)}
          />
          <label htmlFor="prepTimeMinutes">Minutes:</label>
          <input
            type="number"
            name="prepTimeMinutes"
            max="59"
            value={prepTimeMinutes}
            onChange={({ target: { value } }) => setPrepTimeMinutes(value)}
            required
          />
        </div>
        <div>
          <label htmlFor="prepInstr">Preparation instructions:</label>
          <textarea
            name="prepInstr"
            maxLength="200"
            value={prepInstr}
            onChange={({ target: { value } }) => setPrepInstr(value)}
            required
          ></textarea>
        </div>
        <button type="submit">Confirm Recipe</button>
      </form>
    </div>
  );
}
export default Form;
