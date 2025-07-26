import Card from "../components/Card"
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
 const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLocaleLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
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
      <h1>🚀 Crypto Dashboard</h1>
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && (
        <p style={{ textAlign: "center", fontSize: "2rem", marginTop: "3rem" }}>
          Loading...
        </p>
      )}
      {error && (
        <div
          className="error"
          style={{ textAlign: "center", fontSize: "2rem", marginTop: "3rem" }}
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <Card key={coin.id} coin={coin} />)
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "2rem",
                marginTop: "3rem",
              }}
            >
              No matching coins
            </p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
