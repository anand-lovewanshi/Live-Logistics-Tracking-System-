import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../../redux/slices/productSlice";

export default function ProductFilters() {
  const dispatch = useDispatch();
  const { filters, meta } = useSelector((s) => s.products);

  const handleMultiSelect = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    dispatch(setFilters({ [key]: updated }));
  };

  const style = {
    box: {
      background: "#fff",
      borderRadius: 12,
      padding: 20,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    },
    label: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 0",
      cursor: "pointer",
      fontSize: 14
    },
    chip: (active) => ({
      padding: "4px 12px",
      borderRadius: 20,
      border: `1px solid ${active ? "#e94560" : "#ddd"}`,
      background: active ? "#fdecea" : "#fff",
      cursor: "pointer",
      fontSize: 13,
      color: active ? "#e94560" : "#555"
    }),
    input: {
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #ddd",
      borderRadius: 6,
      fontSize: 13
    },
    sectionTitle: {
      fontWeight: 700,
      marginBottom: 12,
      fontSize: 14,
      color: "#444",
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Category */}
      <div style={style.box}>
        <p style={style.sectionTitle}>Category</p>
        {meta.categories.map((cat) => (
          <label key={cat} style={style.label}>
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => handleMultiSelect("category", cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Brand */}
      <div style={style.box}>
        <p style={style.sectionTitle}>Brand</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {meta.brands.map((brand) => (
            <span
              key={brand}
              style={style.chip(filters.brand.includes(brand))}
              onClick={() => handleMultiSelect("brand", brand)}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div style={style.box}>
        <p style={style.sectionTitle}>Price Range</p>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            style={style.input}
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => dispatch(setFilters({ minPrice: e.target.value }))}
          />
          <input
            style={style.input}
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => dispatch(setFilters({ maxPrice: e.target.value }))}
          />
        </div>
      </div>

      {/* Rating */}
      <div style={style.box}>
        <p style={style.sectionTitle}>Min Rating</p>
        {[4, 3, 2, 1].map((r) => (
          <label key={r} style={style.label}>
            <input
              type="radio"
              name="rating"
              checked={filters.rating === String(r)}
              onChange={() => dispatch(setFilters({ rating: String(r) }))}
            />
            {"⭐".repeat(r)} & above
          </label>
        ))}
        {filters.rating && (
          <button
            onClick={() => dispatch(setFilters({ rating: "" }))}
            style={{
              fontSize: 12,
              color: "#e94560",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginTop: 4
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* In Stock */}
      <div style={style.box}>
        <label style={style.label}>
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) =>
              dispatch(setFilters({ inStock: e.target.checked }))
            }
          />
          In Stock Only
        </label>
      </div>

      {/* Reset */}
      <button
        onClick={() => dispatch(resetFilters())}
        style={{
          background: "#e94560",
          color: "#fff",
          border: "none",
          padding: "10px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600
        }}
      >
        Reset All Filters
      </button>
    </div>
  );
}
