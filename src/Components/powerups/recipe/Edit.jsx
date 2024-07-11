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
  const [keywords, setKeywords] = useState(
    customDecodeURIComponent(recipe.keywords)
  );
  const [recipeYield, setRecipeYield] = useState(
    customDecodeURIComponent(recipe.recipeYield)
  );
  const [recipeCategory, setRecipeCategory] = useState(
    customDecodeURIComponent(recipe.recipeCategory)
  );

  const parseISO8601ToTime = (iso8601) => {
    const regex = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/;
    const matches = iso8601.match(regex);
    return {
      hours: parseInt(matches[1] || 0),
      minutes: parseInt(matches[2] || 0),
    };
  };

  const cookTime = parseISO8601ToTime(
    customDecodeURIComponent(recipe.cookTime)
  );
  const prepTime = parseISO8601ToTime(
    customDecodeURIComponent(recipe.prepTime)
  );

  const [cookHours, setCookHours] = useState(cookTime.hours);
  const [cookMinutes, setCookMinutes] = useState(cookTime.minutes);
  const [prepHours, setPrepHours] = useState(prepTime.hours);
  const [prepMinutes, setPrepMinutes] = useState(prepTime.minutes);

  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [newIngredient, setNewIngredient] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState(
    recipe.recipeInstructions
  );
  const [newStep, setNewStep] = useState("");

  const formatDurationISO8601 = (hours, minutes) => {
    let duration = "PT";
    if (hours > 0) duration += `${hours}H`;
    if (minutes > 0) duration += `${minutes}M`;
    return duration;
  };

  const sumTimes = (hours1, minutes1, hours2, minutes2) => {
    const totalMinutes = hours1 * 60 + minutes1 + hours2 * 60 + minutes2;
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return formatDurationISO8601(totalHours, remainingMinutes);
  };

  const saveData = (e) => {
    e.preventDefault();

    const cookTime = formatDurationISO8601(cookHours, cookMinutes);
    const prepTime = formatDurationISO8601(prepHours, prepMinutes);
    const totalTime = sumTimes(cookHours, cookMinutes, prepHours, prepMinutes);

    const updatedRecipe = {
      duration,
      calories,
      difficulty,
      cookTime,
      prepTime,
      totalTime,
      keywords,
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
    if (editIndex !== null) {
      const updatedInstructions = [...recipeInstructions];
      updatedInstructions[editIndex] = {
        name: `Paso ${editIndex + 1}`,
        text: newStep,
      };
      setRecipeInstructions(updatedInstructions);
      setEditIndex(null);
    } else {
      setRecipeInstructions([
        ...recipeInstructions,
        { name: `Paso ${recipeInstructions.length + 1}`, text: newStep },
      ]);
    }
    setNewStep("");
  };

  const editStep = (event, index) => {
    event.preventDefault();
    setNewStep(recipeInstructions[index].text);
    setEditIndex(index);
  };

  const removeStep = (event, index) => {
    event.preventDefault();
    setRecipeInstructions(recipeInstructions.filter((_, i) => i !== index));
  };

  useEffect(() => {
    sendMessage("ready", { height: document.documentElement.scrollHeight });
  }, []);

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
              Categoria de la receta (Ejemplo: postres, ensaladas, etc.).
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Tiempo de cocción:</span>
            <div className="flex space-x-2">
              <input
                type="number"
                className="border rounded-md px-2"
                onChange={(e) => setCookHours(parseInt(e.target.value))}
                value={cookHours}
                min="0"
                placeholder="Horas"
              />
              <input
                type="number"
                className="border rounded-md px-2"
                onChange={(e) => setCookMinutes(parseInt(e.target.value))}
                value={cookMinutes}
                min="0"
                max="59"
                placeholder="Minutos"
              />
            </div>
            <span className="text-gray-600 text-sm">
              Tiempo que toma cocinar la receta.
            </span>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <span className="font-semibold">Tiempo de preparación:</span>
            <div className="flex space-x-2">
              <input
                type="number"
                className="border rounded-md px-2"
                onChange={(e) => setPrepHours(parseInt(e.target.value))}
                value={prepHours}
                min="0"
                placeholder="Horas"
              />
              <input
                type="number"
                className="border rounded-md px-2"
                onChange={(e) => setPrepMinutes(parseInt(e.target.value))}
                value={prepMinutes}
                min="0"
                max="59"
                placeholder="Minutos"
              />
            </div>
            <span className="text-gray-600 text-sm">
              Tiempo que toma preparar la receta antes de cocinarla.
            </span>
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Ingredientes:</span>
            <ul className="">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between items-center mt-2">
                  <span>{ingredient.item}</span>
                  <div className="space-x-2">
                    <button
                      className="bg-yellow-500 text-white rounded-md px-2"
                      onClick={(event) => editIngredient(event, index)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-md px-2"
                      onClick={(event) => removeIngredient(event, index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <textarea
                className="border rounded-md w-full px-2 py-1"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                rows={4}
              />
              <div className="justify-end flex flex-col">
                <button
                  className={`${
                    editIndex !== null ? "bg-yellow-500" : "bg-blue-500"
                  } text-white rounded-md px-4 py-2 h-10`}
                  onClick={addIngredient}
                >
                  {editIndex !== null ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <span className="font-semibold">Instrucciones:</span>
            <ol className="">
              {recipeInstructions.map((step, index) => (
                <li key={index} className="flex justify-between items-center mt-2">
                  <span>{step.text}</span>
                  <div className="space-x-2">
                    <button
                      className="bg-yellow-500 text-white rounded-md px-2"
                      onClick={(event) => editStep(event, index)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-md px-2"
                      onClick={(event) => removeStep(event, index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ol> 
            <div className="flex space-x-2">
              <textarea
                className="border rounded-md px-2 w-full"
                onChange={(e) => setNewStep(e.target.value)}
                value={newStep}
                placeholder="Nuevo paso"
                rows={4}
              />
              <div className="flex flex-col justify-end">
                <button
                  className={`${
                    editIndex !== null ? "bg-yellow-500" : "bg-blue-500"
                  } text-white rounded-md px-4 py-2 h-10`}
                  onClick={addStep}
                >
                  {editIndex !== null ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white rounded-md px-4 py-2"
          >
            Guardar receta
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeEdit;
