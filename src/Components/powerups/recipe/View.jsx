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
  console.log(recipe, "recipe");

  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Duración:</span>
          <span>{recipe.duration}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Calorías:</span>
          <span>{recipe.calories}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Dificultad:</span>
          <span>{recipe.difficulty}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Tiempo de cocción:</span>
          <span>{recipe.cookTime}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Tiempo de preparación:</span>
          <span>{recipe.prepTime}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Palabras clave:</span>
          <span>{recipe.keywords}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Calorías por porción:</span>
          <span>{recipe.nutrition.calories}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Porciones que rinde:</span>
          <span>{recipe.recipeYield}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold">Categoría de la receta:</span>
          <span>{recipe.recipeCategory}</span>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-bold">Ingredientes</h2>
        <ul className="list-disc list-inside mt-2">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item.item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-bold">Pasos de la receta</h2>
        <ol className="list-decimal list-inside mt-2">
          {recipe.recipeInstructions.map((step, index) => (
            <li key={index}>
              <span className="font-semibold">{step.name}:</span> {step.text}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeView;
