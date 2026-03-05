import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchFilterMeta,
  setFilters
} from "../redux/slices/productSlice";
import ProductCard from "../components/products/ProductCard";
import ProductFilters from "../components/products/ProductFilters";
import Pagination from "../components/products/Pagination";

export default function HomePage() {
  const dispatch = useDispatch();
  const { items, loading, error, filters } = useSelector((s) => s.products);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(fetchFilterMeta());
    dispatch(fetchProducts(buildParams(filters)));
  }, []);

  const buildParams = (f) => {
    const params = { page: f.page, limit: f.limit, sort: f.sort };
    if (f.search) params.search = f.search;
    if (f.category?.length) params.category = f.category.join(",");
    if (f.brand?.length) params.brand = f.brand.join(",");
    if (f.minPrice) params.minPrice = f.minPrice;
    if (f.maxPrice) params.maxPrice = f.maxPrice;
    if (f.rating) params.rating = f.rating;
    if (f.inStock) params.inStock = "true";
    return params;
  };

  useEffect(() => {
    dispatch(fetchProducts(buildParams(filters)));
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchInput }));
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: 24 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
          Products
        </h1>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          {/* Search */}
          <form
            onSubmit={handleSearch}
            style={{ display: "flex", gap: 8, flex: 1, minWidth: 280 }}
          >
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid #ddd",
                borderRadius: 8,
                fontSize: 14
              }}
            />
            <button
              type="submit"
              style={{
                background: "#e94560",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Search
            </button>
          </form>
          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => dispatch(setFilters({ sort: e.target.value }))}
            style={{
              padding: "10px 14px",
              border: "1px solid #ddd",
              borderRadius: 8,
              fontSize: 14
            }}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="top_rated">Top Rated</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 24,
          alignItems: "start"
        }}
      >
        {/* Filters Sidebar */}
        <div>
          <ProductFilters />
        </div>

        {/* Products Grid */}
        <div>
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 20
              }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "#eee",
                    borderRadius: 12,
                    height: 320,
                    animation: "pulse 1.5s infinite"
                  }}
                />
              ))}
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", color: "#e94560", padding: 40 }}>
              {error}
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#999" }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>🔍</div>
              <h3>No products found</h3>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 20
              }}
            >
              {items.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
          <Pagination />
        </div>
      </div>
    </div>
  );
}
