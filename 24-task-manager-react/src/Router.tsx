// import { Test1 } from "./pages/test1";
// import { Test2 } from "./pages/test2";
// import { Test3 } from "./pages/test3";
// import { NotFound } from "./pages/404";
// import { MainLayout } from "./templates/main";

// export function Router() {
//   switch (window.location.pathname) {
//     case "/":
//       return (
//         <MainLayout>
//           <Test1 />
//         </MainLayout>
//         // <MainLayout children={<Test1 />} />
//       );
//     case "/test2":
//       return (
//         <MainLayout>
//           <Test2 />
//         </MainLayout>
//       );
//     case "/test3":
//       return (
//         <MainLayout>
//           <Test3 />
//         </MainLayout>
//       );
//     default:
//       return (
//         <MainLayout>
//           <NotFound />
//         </MainLayout>
//       );
//   }
// }

import { Home } from "./pages/home";
import { NotFound } from "./pages/404";
import { TasksListPage } from "./pages/tasks";

export function Router() {
  switch (window.location.pathname) {
    case "/":
      return <Home />;
    case "/tasks":
      return <TasksListPage />;
    default:
      return <NotFound />;
  }
}
