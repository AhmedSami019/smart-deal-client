import { useEffect, useState } from "react";
import Product from "../Product/Product";

const LatestProducts = () => {
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/latest-products");
        const data = await response.json();
        setLatestProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-center text-5xl font-bold my-10">Latest <span className="text-primary">Products</span></h2>
      {loading ? (
        <p>loading..</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-10">
          {latestProducts.map((product) => (
            <Product key={product._id}></Product>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestProducts;
