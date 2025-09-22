import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products");
        const productList = res.data.data || [];
        setProducts(productList);
        setFilteredProducts(productList);

        const uniqueCategories = [
          ...new Set(productList.map((p) => p.category?.name))
        ].filter(Boolean);
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (p) => p.category?.name === selectedCategory
      );
    }

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      updatedProducts = updatedProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.dese.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, searchTerm, products]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#8b5e3c", marginBottom: "20px" }}>All Products</h2>

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <label htmlFor="category-select" style={{ fontWeight: "bold", color: "#8b5e3c" }}>Category:</label>
          <br />
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #d2b48c" }}
          >
            <option value="All">All</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-input" style={{ fontWeight: "bold", color: "#8b5e3c" }}>Search:</label>
          <br />
          <input
            type="text"
            id="search-input"
            placeholder="Search by name or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #d2b48c" }}
          />
        </div>
      </div>

      {/* Product grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #d2b48c",
                padding: 16,
                borderRadius: 8,
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              {product.image ? (
                <img
                  src={`http://localhost:4000${product.image}`}
                  alt={product.name}
                  style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0e0d6",
                    borderRadius: 8,
                    color: "#777",
                  }}
                >
                  No Image
                </div>
              )}
              <h3 style={{ marginTop: 10, color: "#8b5e3c" }}>{product.name}</h3>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Description:</strong> {product.dese}</p>
              <p><strong>Category:</strong> {product.category?.name || "N/A"}</p>
              <p><strong>Brand:</strong> {product.brand_name}</p>
              <p><strong>Colors:</strong> {product.color?.join(", ")}</p>
              <p><strong>Sizes:</strong> {product.size?.join(", ")}</p>
              <p><strong>Status:</strong> {product.status ? "Active" : "Inactive"}</p>
              <Link
                to={`/products/${product._id}`}
                style={{
                  marginTop: 10,
                  display: "inline-block",
                  padding: "6px 12px",
                  backgroundColor: "#d2b48c",
                  color: "#fff",
                  borderRadius: 5,
                  textDecoration: "none",
                  fontWeight: "bold",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c19a6b"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#d2b48c"}
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
