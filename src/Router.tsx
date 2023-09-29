import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

const router = createBrowserRouter([
    {
        path: "/crypto_tracker/:coinId",
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
        path: "/crypto_tracker",
        element: <Coins/>,
    },
]);

export default router;