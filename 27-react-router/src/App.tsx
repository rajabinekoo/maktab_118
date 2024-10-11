import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { PostsPage } from "./pages/posts";
import { MainLayout } from "./layouts/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
      </div>
    ),
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "posts",
        element: <PostsPage />,
      },
      {
        path: "users",
        element: <div>users</div>,
      },
      {
        path: "post-info",
        element: <div>post info</div>,
      },
    ],
  },
]);

const router2 = createBrowserRouter(
  createRoutesFromElements(
    <Route>
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
        <Route path="posts" element={<PostsPage />} />
        <Route path="post-info" element={<div>post info</div>} />
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
