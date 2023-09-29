import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

const router = createBrowserRouter([
    {
        path: "/:coinId",
        element: <Coin/>,
        children: [
            {
                path: "price",
                element: <Price/>,
            },
            {
                path: "chart",
                element: <Chart />,
            },
        ],
    },
    {
        path: "/",
        element: <Coins/>,
    },
]);

export default router;