import { createBrowserRouter } from "react-router-dom";
import Weather from "./components/Weather.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Weather />
    },
]);

export default router