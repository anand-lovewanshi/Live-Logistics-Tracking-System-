import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slices/productSlice";
import { fetchProducts } from "../../redux/slices/productSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const { page, pages, total, filters } = useSelector((s) => s.products);

  const handlePage = (p) => {
    dispatch(setPage(p));
    dispatch(fetchProducts({ ...filters, page: p }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pages <= 1) return null;

  const btn = (active) => ({
    padding: "8px 14px",
    border: `1px solid ${active ? "#e94560" : "#ddd"}`,
    background: active ? "#e94560" : "#fff",
    color: active ? "#fff" : "#555",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: active ? 700 : 400
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 32
      }}
    >
      <button
        style={btn(false)}
        disabled={page === 1}
        onClick={() => handlePage(page - 1)}
      >
        ‹ Prev
      </button>
      {[...Array(pages)].map((_, i) => (
        <button
          key={i + 1}
          style={btn(page === i + 1)}
          onClick={() => handlePage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        style={btn(false)}
        disabled={page === pages}
        onClick={() => handlePage(page + 1)}
      >
        Next ›
      </button>
      <span style={{ fontSize: 13, color: "#999", marginLeft: 8 }}>
        {total} products
      </span>
    </div>
  );
}
