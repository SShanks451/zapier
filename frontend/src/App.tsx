import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ZapCreate from "./pages/ZapCreate";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/zap/create",
      element: <ZapCreate />,
    },
  ]);

  return (
    <div className="w-[100%]">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
