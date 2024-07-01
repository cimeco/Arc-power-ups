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

  const [duration, setDuration] = useState(
    customDecodeURIComponent(recipe.duration)
  );
  const [calories, setCalories] = useState(
    customDecodeURIComponent(recipe.calories)
  );
  const [difficulty, setDifficulty] = useState(
    customDecodeURIComponent(recipe.difficulty)
  );
  const [cookTime, setCookTime] = useState(
    customDecodeURIComponent(recipe.cookTime)
  );
  const [prepTime, setPrepTime] = useState(
    customDecodeURIComponent(recipe.prepTime)
  );
  const [keywords, setKeywords] = useState(
    customDecodeURIComponent(recipe.keywords)
  );
  const [nutritionCalories, setNutritionCalories] = useState(
    customDecodeURIComponent(recipe.nutrition.calories)
  );
  const [recipeYield, setRecipeYield] = useState(
    customDecodeURIComponent(recipe.recipeYield)
  );
  const [recipeCategory, setRecipeCategory] = useState(
    customDecodeURIComponent(recipe.recipeCategory)
  );
  const [ingredients, setIngredients] = useState(
    customDecodeURIComponent(recipe.ingredients)
  );
  const [newIngredient, setNewIngredient] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState(
    customDecodeURIComponent(recipe.recipeInstructions)
  );
  const [newStep, setNewStep] = useState("");

  const saveData = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      duration,
      calories,
      difficulty,
      cookTime,
      prepTime,
      keywords,
      nutrition: {
        calories: nutritionCalories,
      },
      recipeYield,
      recipeCategory,
      ingredients,
      recipeInstructions,
    };

    const ansCustomEmbed = {
      id: parseQueryString()["k"],
      url: "https://dsj9tz56eff78.cloudfront.net/powerups/recipe/view",
      config: {
        recipe: updatedRecipe,
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

  const addStep = (e) => {
    e.preventDefault();
    setRecipeInstructions([
      ...recipeInstructions,
      { name: `Paso ${recipeInstructions.length + 1}`, text: newStep },
    ]);
    setNewStep("");
  };

  const editStep = (event, index) => {
    event.preventDefault();
    setNewStep(recipeInstructions[index].text);
    setRecipeInstructions(recipeInstructions.filter((_, i) => i !== index));
  };

  const removeStep = (event, index) => {
    event.preventDefault();
    setRecipeInstructions(recipeInstructions.filter((_, i) => i !== index));
  };

  useEffect(() => {
    sendMessage("ready", { height: document.documentElement.scrollHeight });
  }, []);

  const timeOptions = [
    "5 min",
    "10 min",
    "15 min",
    "20 min",
    "30 min",
    "45 min",
    "1 hr",
    "1.5 hr",
    "2 hr",
    "2.5 hr",
    "3 hr",
    "4 hr",
  ];

  return (
    <div className="w-full">
      <form className="rounded p-4 bg-white flex" onSubmit={saveData}>
        <div className="w-1/2 p-2">
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Duración (tiempo total):</span>
            <input
              className="border rounded-md px-2"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            />
            <span className="text-gray-600 text-sm">
              Tiempo total que toma preparar la receta (incluyendo preparación y
              cocción).
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Calorías:</span>
            <input
              className="border rounded-md px-2"
              onChange={(e) => setCalories(e.target.value)}
              value={calories}
            />
            <span className="text-gray-600 text-sm">
              Número de calorías por porción.
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Dificultad:</span>
            <input
              className="border rounded-md px-2"
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
            />
            <span className="text-gray-600 text-sm">
              Nivel de dificultad para preparar la receta (fácil, media,
              difícil).
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Tiempo de cocción:</span>
            <select
              className="border rounded-md px-2"
              onChange={(e) => setCookTime(e.target.value)}
              value={cookTime}
            >
              {timeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-gray-600 text-sm">
              Seleccione el tiempo de cocción (horas y minutos).
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Tiempo de preparación:</span>
            <select
              className="border rounded-md px-2"
              onChange={(e) => setPrepTime(e.target.value)}
              value={prepTime}
            >
              {timeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-gray-600 text-sm">
              Seleccione el tiempo de preparación (horas y minutos).
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">
              Palabras clave (separadas por comas):
            </span>
            <input
              className="border rounded-md px-2"
              onChange={(e) => setKeywords(e.target.value)}
              value={keywords}
            />
            <span className="text-gray-600 text-sm">
              Ingrese otros términos descriptivos de la receta, como la estación
              ("verano"), el día festivo ("Halloween") y otras palabras que la
              describen ("rápida", "fácil", "original"). Separe cada palabra
              clave con una coma. No use términos que sean categorías o tipos de
              cocina.
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Calorías por porción:</span>
            <input
              className="border rounded-md px-2"
              onChange={(e) => setNutritionCalories(e.target.value)}
              value={nutritionCalories}
            />
            <span className="text-gray-600 text-sm">
              Cantidad de calorías en cada porción de la receta.
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Porciones que rinde:</span>
            <input
              className="border rounded-md px-2"
              onChange={(e) => setRecipeYield(e.target.value)}
              value={recipeYield}
            />
            <span className="text-gray-600 text-sm">
              Número de porciones que produce la receta.
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Categoría de la receta:</span>
            <input
              className="border rounded-md px-2"
              onChange={(e) => setRecipeCategory(e.target.value)}
              value={recipeCategory}
            />
            <span className="text-gray-600 text-sm">
              Tipo de comida o plato de la receta (cena, plato principal,
              postre, bocadillo, etc.).
            </span>
          </div>
        </div>
        <div className="w-1/2 p-2">
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
              className="border rounded-md w-4/5 px-2"
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
          <h2 className="font-bold mt-5">Pasos de la receta</h2>
          <ol className="list-decimal list-inside mt-2">
            {recipeInstructions.map((step, index) => (
              <li key={index}>
                {step.text}
                <button
                  onClick={(e) => editStep(e, index)}
                  className="text-blue-400 ml-2"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => removeStep(e, index)}
                  className="text-red-600 ml-1"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ol>
          <div>
            <input
              className="border rounded-md w-4/5 px-2"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
            />
            <button
              className="border rounded-md px-2 ml-2 mt-2"
              onClick={addStep}
            >
              {editIndex !== null ? "Actualizar" : "Agregar"}
            </button>
          </div>
          <div className="flex justify-end mt-10">
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
