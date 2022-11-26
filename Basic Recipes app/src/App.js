import { useState } from "react";
import RecipesList from "./components/RecipesList";
import classes from "./App.module.css";
import Modal from "./components/Modal";
import Form from "./components/Form";

function App() {
  const [toggleForm, setToggleForm] = useState(false);
  const [showModal, setShowModal] = useState({ show: false, data: "" });

  const [recipes, setRecipes] = useState([]);

  //SUBMIT
  function addRecipe(recipe) {
    setRecipes([...recipes, recipe]);
    setToggleForm(false);
  }

  //DELETE + MODAL
  const handleDelete = (recipeId) => {
    setShowModal({ show: true, data: recipeId });
  };
  const handleModal = () => {
    const newRecipes = [...recipes];
    const index = recipes.findIndex((recipe) => recipe.id === showModal.data);
    newRecipes.splice(index, 1);

    setShowModal({ show: false, data: "" });
    setRecipes(newRecipes);
    setToggleDetails(false);
  };

  //DETAILS
  const [details, setDetails] = useState("");
  const [toggleDetails, setToggleDetails] = useState(false);
  const handleDetails = (recipeId) => {
    setToggleDetails(true);
    const element = recipes.find((recipe) => recipe.id === recipeId);
    setDetails(element);
  };

  return (
    <>
      <h1 className={classes.header}>Recipes</h1>
      <div className={classes.buttonDiv}>
        <button
          onClick={() => {
            setToggleForm(!toggleForm);
          }}
        >
          {!toggleForm ? "Add Recipe" : "Cancel Add"}
        </button>
      </div>
      {toggleForm && toggleForm ? (
        <Form recipes={recipes} setRecipes={setRecipes} addRecipe={addRecipe} />
      ) : (
        <RecipesList
          recipes={recipes}
          details={details}
          handleDelete={handleDelete}
          handleDetails={handleDetails}
          toggleDetails={toggleDetails}
          setToggleDetails={setToggleDetails}
        />
      )}
      {showModal.show && (
        <Modal
          handleModal={() => handleModal()}
          handleCloseModal={() => setShowModal({ show: false, data: "" })}
        />
      )}
    </>
  );
}

export default App;
