import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import DatafactorySearch, {
  loader as searchLoader,
} from "./Components/powerups/datafactory/Search";
import DatafactoryEdit from "./Components/powerups/datafactory/Edit";
import DatafactoryView, {
  loader as viewLoader,
} from "./Components/powerups/datafactory/View";
import RecipeSearch from "./Components/powerups/recipe/Search";
import RecipeEdit, {
  loader as recipeEditLoader,
} from "./Components/powerups/recipe/Edit";
import RecipeView, {
  loader as recipeViewLoader,
} from "./Components/powerups/recipe/View";
import LiveblogSearch from "./Components/powerups/liveblog/Search";
import LiveblogView, {
  loader as liveblogViewLoader,
} from "./Components/powerups/liveblog/View";
import LiveblogEdit, {
  loader as liveblogEditLoader,
} from "./Components/powerups/liveblog/Edit";
import CustomFieldsSearch from "./Components/powerups/customFields/Search";
import CustomFieldsEdit, {
  loader as customfieldsEditLoader,
} from "./Components/powerups/customFields/Edit";
import CustomFieldsView, {
  loader as customfieldsViewLoader,
} from "./Components/powerups/customFields/View";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/powerups" element={<Root />} errorElement={<ErrorPage />}>
      {/* DataFactory */}
      <Route
        path="datafactory/search"
        element={<DatafactorySearch />}
        errorElement={<ErrorPage />}
        loader={searchLoader}
      />
      <Route path="datafactory/edit" element={<DatafactoryEdit />} />
      <Route
        path="datafactory/view"
        element={<DatafactoryView />}
        loader={viewLoader}
      />
      {/* Recipe */}
      <Route
        path="recipe/search"
        element={<RecipeSearch />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="recipe/edit"
        element={<RecipeEdit />}
        loader={recipeEditLoader}
      />
      <Route
        path="recipe/view"
        element={<RecipeView />}
        loader={recipeViewLoader}
      />
      {/* Liveblog */}
      <Route
        path="liveblog/search"
        element={<LiveblogSearch />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="liveblog/edit"
        element={<LiveblogEdit />}
        loader={liveblogEditLoader}
      />
      <Route
        path="liveblog/view"
        element={<LiveblogView />}
        loader={liveblogViewLoader}
      />
      {/* CustomFields */}
      <Route
        path="customfields/search"
        element={<CustomFieldsSearch />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="customfields/edit"
        element={<CustomFieldsEdit />}
        loader={customfieldsEditLoader}
      />
      <Route
        path="customfields/view"
        element={<CustomFieldsView />}
        loader={customfieldsViewLoader}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
