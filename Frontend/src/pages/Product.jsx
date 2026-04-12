import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ added

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`
      );

      setProducts(res.data.products);

    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-4">

      {/* 🚀 BUTTON ADDED */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/createProduct")}
          className="bg-green-900 text-white px-4 py-2 rounded-xl"
        >
          + Create Product
        </button>
      </div>

      <h1 className="text-2xl font-bold text-green-900 mb-6 text-center">
        All Products 🛒
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-3 space-y-2">

                <h2 className="font-bold text-lg text-green-900">
                  {product.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-2">

                  <p className="text-green-700 font-bold text-lg">
                    ₹{product.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>

                </div>

                <p className="text-xs text-gray-400">
                  {product.isAvailable ? "Available" : "Out of stock"}
                </p>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Product;