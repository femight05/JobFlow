import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Application from "./pages/Application";
import AddApplication from "./pages/AddApplication";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Application />} />
      <Route path="add-application" element={<AddApplication />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
