import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Feed from "./features/feed/Feed";
import Profile from "./features/Profile/Profile";
import ProtectedRoute from "./middleware/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetails from "./features/Post-details/PostDetails";
import MainRouting from "./middleware/mainRouting";

const queryClient = new QueryClient();

export default function App() {
  const routes = createBrowserRouter([
    { path: "", element: <MainRouting><Home></Home></MainRouting> },
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          path: "/feed",
          element: (
            <ProtectedRoute>
              <Feed></Feed>
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          ),
        },
        {
          path: "/postdetails/:id",
          element: (
            <ProtectedRoute>
              <PostDetails></PostDetails>
            </ProtectedRoute>
          ),
        },
        
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer></ToastContainer>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
}
