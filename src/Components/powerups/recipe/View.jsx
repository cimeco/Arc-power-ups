import { useLoaderData } from "react-router-dom";
import { sendMessage, parseQueryString } from "../../../../util/powerups";
import { customDecodeURIComponent } from "../../../../util/helpers";

export const loader = async () => {

  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse( decodeURIComponent(parameters.p) );
  const recipe = data.config.recipe

  return { recipe };
};

const RecipeView = () => {
  const {recipe} = useLoaderData();

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
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-bold">Ingredientes</h2>
        <ul className="list-disc list-inside mt-2">
          {recipe.ingredients.map((item, index) =>
            (
              <li key={index}>{item.item}</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};
export default RecipeView;
