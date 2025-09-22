import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/product/edit/${id}`
        );
        setProduct(res.data?.data ?? null);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchSingle();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Loading…</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  if (!product) return <p style={{ padding: 20 }}>Product not found.</p>;

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2>Product Details</h2>


      {product.image ? (
        <div style={{ margin: "16px 0" }}>
          <img
            src={`http://localhost:4000${product.image}`}
            alt={product.name}
            style={{ width: 200, borderRadius: 8 }}
          />
        </div>
      ) : (
        <div style={{ margin: "16px 0", fontStyle: "italic", color: "#777" }}>
          No image available
        </div>
      )}

      <div style={{ margin: "16px 0" }}>
        <strong>Name:</strong> {product.name}
      </div>
      <div style={{ margin: "16px 0" }}>
        <strong>Price:</strong> {product.price}
      </div>
      <div style={{ margin: "16px 0" }}>
        <strong>Description:</strong> {product.dese}
      </div>
      <div style={{ margin: "16px 0" }}>
        <strong>Category:</strong>{" "}
        {product.category?.name || product.category || "N/A"}
      </div>
      <div style={{ margin: "16px 0" }}>
        <strong>Brand:</strong> {product.brand_name}
      </div>
      <div style={{ margin: "16px 0" }}>
        <strong>Colors:</strong> {product.color?.join(", ")}
      </div>
      <div style={{ margin: "16px 0" }}>
        <strong>Sizes:</strong> {product.size?.join(", ")}
      </div>
      <div style={{ margin: "16px 0" }}>
        <strong>Status:</strong> {product.status ? "Active" : "Inactive"}
      </div>

      <Link to="/" style={{ display: "inline-block", marginTop: 20 }}>
        ← Back to products
      </Link>
    </div>
  );
};

export default View;
