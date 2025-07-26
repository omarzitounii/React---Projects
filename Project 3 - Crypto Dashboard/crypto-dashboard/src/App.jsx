import { useState, useEffect } from "react";
import Card from "./components/Card"
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        console.log(data);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, [limit]);

  const filteredCoins = coins.filter(coin => (
      coin.name.toLowerCase().includes(filter.toLocaleLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLocaleLowerCase())
    )).slice().sort((a,b) => {
      switch(sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
      }
    });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter}/>
        <LimitSelector limit={limit} onLimitChange={setLimit}/>
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && <p style={{ textAlign: "center", fontSize: "2rem", marginTop: "3rem"  }}>Loading...</p>}
      {error && <div className="error" style={{ textAlign: "center", fontSize: "2rem", marginTop: "3rem" }}>{error}</div>}

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
            <Card key={coin.id} coin={coin} />
          )) : <p style={{ textAlign: "center", fontSize: "2rem", marginTop: "3rem"  }}>No matching coins</p>}
        </main>
      )}

    </div>
  );
};

export default App;
