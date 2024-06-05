import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { parseQueryString, sendMessage } from "../../../../util/powerups";
import { customDecodeURIComponent } from "../../../../util/helpers";

export const loader = async () => {
  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse(decodeURIComponent(parameters.p));
  const recipe = data.config.recipe;

  return { recipe };
};
const RecipeEdit = () => {
  const { recipe } = useLoaderData();
  const [duration, setDuration] = useState(recipe.duration);
  const [calories, setCalories] = useState(recipe.calories);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [newIngredient, setNewIngredient] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const saveData = (e) => {
    e.preventDefault();

    const recipe = {
      duration,
      calories,
      difficulty,
      ingredients,
    };

    const ansCustomEmbed = {
      id: parseQueryString()["k"],
      url: "https://dsj9tz56eff78.cloudfront.net/powerups/recipe/view",
      config: {
        recipe,
      },
    };
    sendMessage("data", ansCustomEmbed);
  };
  const addIngredient = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setIngredients(
        ingredients.map((ingredient, index) =>
          index === editIndex ? { item: newIngredient } : ingredient
        )
      );
      setEditIndex(null);
    } else {
      setIngredients([...ingredients, { item: newIngredient }]);
    }
    setNewIngredient("");
  };

  const editIngredient = (event, index) => {
    event.preventDefault();
    setNewIngredient(ingredients[index].item);
    setEditIndex(index);
  };

  const removeIngredient = (event, index) => {
    event.preventDefault();
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  useEffect(() => {
    sendMessage("ready", { height: document.documentElement.scrollHeight });
  }, []);

  return (
    <div className="w-full max-w-lg">
      <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={saveData}>
        <div className="p-4 flex flex-col space-y-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Duración:</span>
              <input
                className="border rounded-md px-2"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="font-semibold">Calorías:</span>
              <input
                className="border rounded-md px-2"
                onChange={(e) => setCalories(e.target.value)}
                value={calories}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="font-semibold">Dificultad:</span>
              <input
                className="border rounded-md px-2"
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
              />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-bold">Ingredientes</h2>
            <ul className="list-disc list-inside mt-2">
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.item}
                  <button
                    onClick={(e) => editIngredient(e, index)}
                    className="text-blue-400 ml-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => removeIngredient(e, index)}
                    className="text-red-600 ml-1"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <input
                className="border rounded-md w-72 px-2"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <button
                className="border rounded-md px-2 ml-2 mt-2"
                onClick={addIngredient}
              >
                {editIndex !== null ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeEdit;
