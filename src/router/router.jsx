import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AddItems from "../pages/AddItems/AddItems";
import ItemDetails from "../pages/ItemDetails/ItemDetails";
import PrivateRoute from "../routes/PrivateRoute"; 
import AllItems from "../pages/AllItems/AllItems";
import MyItems from "../pages/MyItems/MyItems";
import UpdateItem from "../pages/UpdateItem/UpdateItem";
const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "allItems",
        element: <AllItems />,
      },
      {
  path: "/updateItem/:id",
  element: <PrivateRoute>
    <UpdateItem />
    </PrivateRoute>
},

      {
  path: "/myItems",
  element: <PrivateRoute>
    <MyItems />
    </PrivateRoute>
},

      {
        path: "/addItems",
        element: (
    <PrivateRoute>
      <AddItems />
    </PrivateRoute>
  ),
      },
      {
        path: "/items/:id",
        element: <ItemDetails />,
        loader: ({params}) => fetch(`http://localhost:3000/items/${params.id}`)
      }
    ],
  },
]);

export default router;
