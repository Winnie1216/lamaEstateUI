import React from "react";
import { Routes, Route, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
// import ListPage from "./routes/listPage/ListPage";
import Layout from "./routes/layout/layout";
import { createBrowserRouter } from "react-router-dom";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/loginPage/login";
import Register from "./routes/registerPage/register";
import ListPage from "./routes/listPage/ListPage";
import ProfileUpdatedPage from "./routes/profileUpdatePage/ProfileUpdatePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatedPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
