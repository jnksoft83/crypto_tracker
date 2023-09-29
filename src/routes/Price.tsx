import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "../api";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

interface ChartProps {
    coinId: string;
}

function Price() {
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading: isLoading, data: tickersData } = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchCoinTickers(coinId ? coinId : ""),
        {
            refetchInterval: 50000,
        }
    );
    return (
        <div>
            {isLoading ? (
                "Loading price..."
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>volume_24h:</span>
                            <span>${tickersData?.quotes.USD.volume_24h.toFixed(3)}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>volume_24h_change_24h:</span>
                            <span>{tickersData?.quotes.USD.volume_24h_change_24h}</span>
                        </OverviewItem>
                    </Overview>
                    <br/>
                    <Overview>
                        <OverviewItem>
                            <span>market_cap:</span>
                            <span>${tickersData?.quotes.USD.market_cap}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>market_cap_change_24h:</span>
                            <span>{tickersData?.quotes.USD.market_cap_change_24h}</span>
                        </OverviewItem>
                    </Overview>
                    <br/>
                    <Overview>
                        <OverviewItem>
                            <span>ath_price:</span>
                            <span>${tickersData?.quotes.USD.ath_price}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>percent_from_price_ath:</span>
                            <span>{tickersData?.quotes.USD.percent_from_price_ath}</span>
                        </OverviewItem>
                    </Overview>
                </>
            )}
        </div>
    );
}

export default Price;