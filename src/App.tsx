import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Application from "./pages/Application";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Application />} />),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
