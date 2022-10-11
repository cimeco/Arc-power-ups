import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Route,  Routes} from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import Index from './routes/index'
import ErrorPage from './routes/error-page'
import  DatafactorySearch, {loader as searchLoader} from './Components/powerups/datafactory/Search'
import  DatafactoryEdit  from './Components/powerups/datafactory/Edit'
import  DatafactoryView, {loader as viewLoader}  from './Components/powerups/datafactory/View'



const Router = () => {
return (
  <BrowserRouter>
  <Routes>
    <Route
      path="/powerups"
      element={<Root />}
      errorElement={<ErrorPage />}
    >
      {/* <Route errorElement={<ErrorPage />}> */}
        {/* <Route index element={<Index />} /> */}
        <Route
          path='datafactory/search'
          element={<DatafactorySearch />}
          errorElement={<ErrorPage />}
          
        />
        <Route
          path='datafactory/edit'
          element={<DatafactoryEdit />}
        />
        <Route
          path='datafactory/view/:id'
          element={<DatafactoryView />}
          
        />
        
      {/* </Route> */}
    </Route>
    </Routes>
    </BrowserRouter>
)}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />)
