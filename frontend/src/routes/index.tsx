import Signin from "@/pages/Auth/Signin";
import AppLayout from "@/pages/Layout";
import PostsPage from "@/pages/Post";
import WelcomePage from "@/pages/Welcome/WelcomePage";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/posts",
          element: <PostsPage />,
        },
      ],
    },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/",
    element: <WelcomePage />,
  },
]);
