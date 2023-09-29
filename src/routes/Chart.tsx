import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

interface CandlestickData {
    x: String;
    y: number[];
}

function Chart() {
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId)
    );

    const candlestickData: CandlestickData[] = [];
    data?.forEach((item) => {
        const candlestick : CandlestickData = {
            x: item.time_close,
            y: [item.open, item.high, item.low, item.close]
        };
        candlestickData.push(candlestick);
    });
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexChart
                    type="candlestick"
                    series={[
                        {
                            data: candlestickData ?? [],
                        }
                    ]}
                    options = {{
                        chart: {
                            type: 'candlestick',
                            height: 350
                        },
                        title: {
                            text: 'CandleStick Chart',
                            align: 'left'
                        },
                        xaxis: {
                            type: 'datetime'
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true
                            }
                        }
                    }}
                />
            )}
        </div>
    );
}

export default Chart;