import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import CoinDetailsPage from "./pages/coin-details";
import NotFoundPage from "./pages/not-found";

const API_URL = import.meta.env.VITE_COINS_API_URL;

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
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) throw new Error("Failed to fetch coins!");
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [limit]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage
        coins={coins}
        filter={filter}
        limit={limit}
        sortBy={sortBy}
        loading={loading}
        error={error}
        setLimit={setLimit}
        setFilter={setFilter}
        setSortBy={setSortBy}
      />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
