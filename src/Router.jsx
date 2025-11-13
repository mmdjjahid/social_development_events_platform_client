import { createBrowserRouter } from "react-router";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CreateEvent from "./Pages/CreateEvent/CreateEvent";
import PrivateRoute from "./PrivateRoute";
import UpcomingEvents from "./Pages/UpcomingEvents/UpcomingEvents";
import EventDetails from "./Components/EventDetails";
import JoinedEvents from "./Pages/JoinedEvents/JoinedEvents";
import ManageEvents from "./Pages/ManageEvents";
import UpdateEvent from "./Components/UpdateEvent";
import NotFoundPage from "./Pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/createEvent",
        element: (
          <PrivateRoute>
            <CreateEvent></CreateEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "/events/:id",
        element: <EventDetails></EventDetails>,
        errorElement: <NotFoundPage></NotFoundPage>
      },
      {
        path: "/upcoming-events",
        element: <UpcomingEvents></UpcomingEvents>,
      },
      {
        path: "/joined-events/:email",
        element: (
          <PrivateRoute>
            <JoinedEvents></JoinedEvents>
          </PrivateRoute>
        ),
        errorElement: <NotFoundPage></NotFoundPage>
      },
      {
        path: "/manage-events/:email",
        element: (
          <PrivateRoute>
            <ManageEvents></ManageEvents>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-event/:id",
        element: (
          <PrivateRoute>
            <UpdateEvent></UpdateEvent>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "*",
    Component: NotFoundPage
  }
]);

export default router;
