import { useEffect, useState } from "react";

const LatestProducts = () => {
    const [loading, setLoading] = useState(true)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try{
                setLoading(true)
                const response = await fetch('http://localhost:3000/latest-products')
                const data = await response.json()
                 setLatestProducts(data)
            }
            finally{
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])
   
    return (
        <div>
            <h2>Latest Products</h2>
            {
                loading? <p>loading..</p>: <div>{latestProducts.length}</div>
            }
        </div>
    );
};

export default LatestProducts;