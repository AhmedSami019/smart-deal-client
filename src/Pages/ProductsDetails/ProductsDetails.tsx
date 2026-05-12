import { useLoaderData } from "react-router";

const ProductsDetails = () => {
    const product = useLoaderData()
    console.log(product);
    return (
        <div>
            this is product details 
        </div>
    );
};

export default ProductsDetails;