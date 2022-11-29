import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail></RoomDetail>,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm></GithubConfirm>,
          },
          {
            path: "kakao",
            element: <KakoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
