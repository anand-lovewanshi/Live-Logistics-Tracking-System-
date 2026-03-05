export default function ProductCard({ product }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "transform 0.2s"
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          background: "#f0f0f0",
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span style={{ fontSize: 64 }}>📦</span>
      </div>
      <div style={{ padding: 16 }}>
        <p
          style={{
            fontSize: 11,
            color: "#999",
            textTransform: "uppercase",
            marginBottom: 4
          }}
        >
          {product.brand} · {product.category}
        </p>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 8,
            lineHeight: 1.3
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: "#777",
            marginBottom: 12,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {product.description}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: "#e94560" }}>
            ₹{product.price.toLocaleString()}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#f5a623" }}>⭐</span>
            <span style={{ fontSize: 13 }}>{product.rating}</span>
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          {product.stock > 0 ? (
            <span
              style={{
                fontSize: 12,
                color: "#27ae60",
                background: "#eafaf1",
                padding: "2px 8px",
                borderRadius: 4
              }}
            >
              ✓ In Stock ({product.stock})
            </span>
          ) : (
            <span
              style={{
                fontSize: 12,
                color: "#e74c3c",
                background: "#fdecea",
                padding: "2px 8px",
                borderRadius: 4
              }}
            >
              ✗ Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
