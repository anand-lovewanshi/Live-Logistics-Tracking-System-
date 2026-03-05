import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  createProduct,
  updateProduct
} from "../redux/slices/productSlice";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  stock: "",
  rating: "",
  image: ""
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.products);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 100 }));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) dispatch(deleteProduct(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating)
    };
    if (editProduct) {
      dispatch(updateProduct({ id: editProduct._id, data })).then(() => {
        setShowForm(false);
        setEditProduct(null);
      });
    } else {
      dispatch(createProduct(data)).then(() => {
        setShowForm(false);
        dispatch(fetchProducts({ limit: 100 }));
      });
    }
    setForm(emptyForm);
  };

  const startEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      brand: p.brand,
      stock: p.stock,
      rating: p.rating,
      image: p.image || ""
    });
    setShowForm(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 14,
    marginBottom: 12
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24
        }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>Admin Dashboard</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditProduct(null);
            setForm(emptyForm);
          }}
          style={{
            background: "#e94560",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ marginBottom: 20 }}>
            {editProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 16px"
              }}
            >
              {[
                ["name", "Name"],
                ["category", "Category"],
                ["brand", "Brand"],
                ["image", "Image URL (optional)"]
              ].map(([key, label]) => (
                <input
                  key={key}
                  style={inputStyle}
                  placeholder={label}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={key !== "image"}
                />
              ))}
              {[
                ["price", "Price (₹)", "number"],
                ["stock", "Stock", "number"],
                ["rating", "Rating (0-5)", "number"]
              ].map(([key, label, type]) => (
                <input
                  key={key}
                  style={inputStyle}
                  placeholder={label}
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required
                />
              ))}
            </div>
            <textarea
              style={{ ...inputStyle, height: 80, resize: "vertical" }}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
            <button
              type="submit"
              style={{
                background: "#27ae60",
                color: "#fff",
                border: "none",
                padding: "10px 24px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              {editProduct ? "Update Product" : "Create Product"}
            </button>
          </form>
        </div>
      )}

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1a1a2e", color: "#fff" }}>
              {[
                "Name",
                "Category",
                "Brand",
                "Price",
                "Stock",
                "Rating",
                "Actions"
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontSize: 13
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => (
              <tr
                key={p._id}
                style={{
                  background: i % 2 === 0 ? "#fff" : "#fafafa",
                  borderBottom: "1px solid #eee"
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  {p.name}
                </td>
                <td
                  style={{ padding: "12px 16px", fontSize: 13, color: "#666" }}
                >
                  {p.category}
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>
                  {p.brand}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 13,
                    color: "#e94560",
                    fontWeight: 600
                  }}
                >
                  ₹{p.price.toLocaleString()}
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>
                  <span style={{ color: p.stock > 0 ? "#27ae60" : "#e74c3c" }}>
                    {p.stock}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>
                  ⭐ {p.rating}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    onClick={() => startEdit(p)}
                    style={{
                      background: "#3498db",
                      color: "#fff",
                      border: "none",
                      padding: "5px 12px",
                      borderRadius: 6,
                      cursor: "pointer",
                      marginRight: 8,
                      fontSize: 12
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    style={{
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "5px 12px",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 12
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div style={{ textAlign: "center", padding: 20, color: "#999" }}>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
