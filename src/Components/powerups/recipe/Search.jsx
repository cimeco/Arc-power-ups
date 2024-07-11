import { useEffect, useState } from "react";
import { parseQueryString, sendMessage } from "../../../../util/powerups";

const RecipeSearch = () => {
  const [calories, setCalories] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [cookHours, setCookHours] = useState(0);
  const [cookMinutes, setCookMinutes] = useState(0);
  const [prepHours, setPrepHours] = useState(0);
  const [prepMinutes, setPrepMinutes] = useState(0);
  const [recipeYield, setRecipeYield] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [newStep, setNewStep] = useState("");
  const [editIngredientIndex, setEditIngredientIndex] = useState(null);
  const [editStepIndex, setEditStepIndex] = useState(null);

  const saveData = (e) => {
    e.preventDefault();

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

    const cookTime = formatDurationISO8601(cookHours, cookMinutes);
    const prepTime = formatDurationISO8601(prepHours, prepMinutes);
    const totalTime = sumTimes(cookHours, cookMinutes, prepHours, prepMinutes);

    const recipe = {
      calories,
      difficulty,
      ingredients,
      cookTime,
      prepTime,
      totalTime,
      recipeYield,
      recipeCategory,
      recipeInstructions: recipeInstructions.map((step, index) => ({
        "@type": "HowToStep",
        name: `Paso ${index + 1}`,
        text: step,
      })),
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
    if (editIngredientIndex !== null) {
      setIngredients(
        ingredients.map((ingredient, index) =>
          index === editIngredientIndex ? { item: newIngredient } : ingredient
        )
      );
      setEditIngredientIndex(null);
    } else {
      setIngredients([...ingredients, { item: newIngredient }]);
    }
    setNewIngredient("");
  };

  const editIngredient = (event, index) => {
    event.preventDefault();
    setNewIngredient(ingredients[index].item);
    setEditIngredientIndex(index);
  };

  const removeIngredient = (event, index) => {
    event.preventDefault();
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = (e) => {
    e.preventDefault();
    if (editStepIndex !== null) {
      const updatedInstructions = [...recipeInstructions];
      updatedInstructions[editStepIndex] = newStep;
      setRecipeInstructions(updatedInstructions);
      setEditStepIndex(null);
    } else {
      setRecipeInstructions([...recipeInstructions, newStep]);
    }
    setNewStep("");
  };

  const editStep = (event, index) => {
    event.preventDefault();
    setNewStep(recipeInstructions[index]);
    setEditStepIndex(index);
  };

  const removeStep = (event, index) => {
    event.preventDefault();
    setRecipeInstructions(recipeInstructions.filter((_, i) => i !== index));
  };

  useEffect(() => {
    sendMessage("ready", {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  return (
    <div className="w-full">
      <form
        className="flex rounded px-8 pt-6 pb-8 mb-4 bg-white"
        onSubmit={saveData}
      >
        <div className="w-1/2">
          <div className="p-4">
            <div className="flex flex-col space-y-2 mt-4">
              <label className="font-semibold">Calorías:</label>
              <input
                className="border rounded-md px-2"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <span className="text-gray-600 text-sm">
                Número de calorías por porción.
              </span>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <label className="font-semibold">Dificultad:</label>
              <input
                className="border rounded-md px-2"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <span className="text-gray-600 text-sm">
                Nivel de dificultad para preparar la receta (fácil, media,
                difícil).
              </span>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <label className="font-semibold">Tiempo de cocción:</label>
              <div className="flex space-x-2">
                <select
                  className="border rounded-md px-2"
                  value={cookHours}
                  onChange={(e) => setCookHours(parseInt(e.target.value))}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} horas
                    </option>
                  ))}
                </select>
                <select
                  className="border rounded-md px-2"
                  value={cookMinutes}
                  onChange={(e) => setCookMinutes(parseInt(e.target.value))}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} minutos
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-gray-600 text-sm">
                Seleccione el tiempo de cocción (horas y minutos).
              </span>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <label className="font-semibold">Tiempo de preparación:</label>
              <div className="flex space-x-2">
                <select
                  className="border rounded-md px-2"
                  value={prepHours}
                  onChange={(e) => setPrepHours(parseInt(e.target.value))}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} horas
                    </option>
                  ))}
                </select>
                <select
                  className="border rounded-md px-2"
                  value={prepMinutes}
                  onChange={(e) => setPrepMinutes(parseInt(e.target.value))}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} minutos
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-gray-600 text-sm">
                Seleccione el tiempo de preparación (horas y minutos).
              </span>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <label className="font-semibold">Porciones que rinde:</label>
              <input
                className="border rounded-md px-2"
                value={recipeYield}
                onChange={(e) => setRecipeYield(e.target.value)}
              />
              <span className="text-gray-600 text-sm">
                Número de porciones que produce la receta.
              </span>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <label className="font-semibold">Categoría de la receta:</label>
              <input
                className="border rounded-md px-2"
                value={recipeCategory}
                onChange={(e) => setRecipeCategory(e.target.value)}
              />
              <span className="text-gray-600 text-sm">
                Tipo de comida o plato de la receta (cena, plato principal,
                postre, bocadillo, etc.).
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="p-4">
            <h2 className="font-bold">Ingredientes</h2>
            <ul className="list-disc list-inside mt-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="mt-2">
                  {ingredient.item}
                  <button
                    onClick={(e) => editIngredient(e, index)}
                    className="bg-yellow-500 text-white rounded-md px-2 mx-1"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => removeIngredient(e, index)}
                    className="bg-red-500 text-white rounded-md px-2"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex space-y-2 mt-4">
              <textarea
                className="border rounded-md w-full px-2 py-1"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                rows={4}
              />
              <div className="flex flex-col justify-end">
                <button
                  className={`${
                    editIngredientIndex !== null
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  } text-white rounded-md px-4 py-2 h-10 ml-2`}
                  onClick={addIngredient}
                >
                  {editIngredientIndex !== null ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>
            <span className="text-gray-600 text-sm block mt-2">
              Ingrese un ingrediente y haga clic en "Agregar" o "Actualizar"
              para modificar la lista.
            </span>
          </div>
          <div className="p-4">
            <h2 className="font-bold">Pasos de la receta</h2>
            <ul className="list-disc list-inside mt-2">
              {recipeInstructions.map((step, index) => (
                <li key={index} className="mt-2">
                  <span className="font-semibold">Paso {index + 1}:</span>{" "}
                  {step}
                  <button
                    onClick={(e) => editStep(e, index)}
                    className="bg-yellow-500 text-white rounded-md px-2 mx-1"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => removeStep(e, index)}
                    className="bg-red-500 text-white rounded-md px-2"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex space-y-2 mt-4">
              <textarea
                className="border rounded-md w-full px-2 py-1"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                rows={4}
              />
              <div className="flex flex-col justify-end">
                <button
                  className={`${
                    editStepIndex !== null ? "bg-yellow-500" : "bg-blue-500"
                  } text-white rounded-md px-4 py-2 h-10 ml-2`}
                  onClick={addStep}
                >
                  {editStepIndex !== null ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>
            <span className="text-gray-600 text-sm block mt-2">
              Ingrese un paso de la receta y haga clic en "Agregar" o
              "Actualizar" para modificar la lista.
            </span>
          </div>
          <div className="flex justify-end col-span-2 mt-6">
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

export default RecipeSearch;
