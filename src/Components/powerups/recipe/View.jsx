import { useLoaderData } from "react-router-dom";
import { sendMessage, parseQueryString } from "../../../../util/powerups";
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

const RecipeView = () => {
  const { recipe } = useLoaderData();

  function parseISO8601Duration(duration) {
    // Expresión regular para extraer horas y minutos
    const regex = /P(T(?:(\d+)H)?(?:(\d+)M)?)/;
    const matches = duration.match(regex);

    if (!matches) {
      throw new Error("Formato de duración no válido");
    }

    const hours = matches[2] ? parseInt(matches[2], 10) : 0;
    const minutes = matches[3] ? parseInt(matches[3], 10) : 0;

    // Crear una cadena legible
    let readableDuration = "";
    if (hours > 0) {
      readableDuration += `${hours} hora${hours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
      if (hours > 0) {
        readableDuration += " y ";
      }
      readableDuration += `${minutes} minuto${minutes > 1 ? "s" : ""}`;
    }

    return readableDuration;
  }

  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Duración total:</span>
          <span>
            {customDecodeURIComponent(parseISO8601Duration(recipe.totalTime))}
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Calorías:</span>
          <span>{customDecodeURIComponent(recipe.calories)}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Dificultad:</span>
          <span>{customDecodeURIComponent(recipe.difficulty)}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Tiempo de cocción:</span>
          <span>{customDecodeURIComponent(recipe.cookTime)}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Tiempo de preparación:</span>
          <span>{customDecodeURIComponent(recipe.prepTime)}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Porciones que rinde:</span>
          <span>{customDecodeURIComponent(recipe.recipeYield)}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Categoría de la receta:</span>
          <span>{customDecodeURIComponent(recipe.recipeCategory)}</span>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-bold">Ingredientes</h2>
        <ul className="list-disc list-inside mt-2">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{customDecodeURIComponent(item.item)}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-bold">Pasos de la receta</h2>
        <ol className="list-decimal list-inside mt-2">
          {recipe.recipeInstructions.map((step, index) => (
            <li key={index}>
              <span className="font-semibold">
                {customDecodeURIComponent(step.name)}:
              </span>{" "}
              {customDecodeURIComponent(step.text)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeView;
