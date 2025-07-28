import { useState, useEffect } from "react";
import { Link, useParams } from "react-router"
import Spinner from "../components/Spinner";

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchCoinDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) throw new Error("Failed to fetch coin details!");
                const data = await response.json();
                console.log(data);   
                setCoin(data);      
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCoinDetails();
    },[]);

  return (
    <div className="coin-details-container">
      <Link to="/">← Back to Home</Link>
      <h1 className="coin-details-title">{coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}</h1>

      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
            <img src={coin.image.large} alt={coin.name} className="coin-details-image"/>
            <p>{coin.description.en.split(". ")[0] + "."}</p>
            <div className="coin-details-info">
                <h3>Rank: #{coin.market_cap_rank}</h3>
                <h3>Current Price: €{coin.market_data.current_price.eur}</h3>
                <h4>Market Cap: €{coin.market_data.market_cap.eur.toLocaleString()}</h4>
                <h4>24h High: €{coin.market_data.high_24h.eur.toLocaleString()}</h4>
                <h4>24h Low: €{coin.market_data.low_24h.eur.toLocaleString()}</h4>
                <h4>24h Price Change: €{coin.market_data.price_change_24h.toFixed(2)} ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)</h4>
                <h4>All-Time High: €{coin.market_data.ath.eur.toLocaleString()} on {new Date(coin.market_data.ath_date.eur).toLocaleDateString()}</h4>
                <h4>All-Time Low: €{coin.market_data.atl.eur.toLocaleString()} on {new Date(coin.market_data.atl_date.eur).toLocaleDateString()}</h4>
                <div className="coin-details-links">
                    {coin.links.homepage[0] && <p><a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">🌐 Website</a></p>}
                </div>
            </div>
        </>
      )}


    </div>
  )
}

export default CoinDetailsPage
