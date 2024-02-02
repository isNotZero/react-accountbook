import {
  createBrowserRouter,
} from "react-router-dom";

import List from "../pages/List";
import Add from "../pages/Add";
import Modify from "../pages/Modify";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/modify",
    element: <Modify />,
  },
]);