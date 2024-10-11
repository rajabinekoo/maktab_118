import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { PostsPage } from "./pages/posts";
import { MainLayout } from "./layouts/main";
import { ErrorBoundary } from "./components/errorBoundary";
import { NotFound } from "./pages/not-found";
import { fetchPostByIdLoader, PostById } from "./pages/post-by-id";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
      </div>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "posts",
        element: <PostsPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "users",
        element: <div>users</div>,
      },
      {
        path: "post-info/:id",
        element: <PostById />,
        loader: fetchPostByIdLoader,
      },
      {
        path: "/404",
        element: <NotFound />,
      },
    ],
  },
]);

const router2 = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route
        index={true}
        element={
          <div>
            <h1>Hello World</h1>
          </div>
        }
      />
      <Route element={<MainLayout />}>
        <Route path="users" element={<div>users</div>} />
        <Route
          path="posts"
          element={<PostsPage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="post-info/:id"
          element={<PostById />}
          loader={fetchPostByIdLoader}
          errorElement={<ErrorBoundary />}
        />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
