import HeroBanner from "../../Components/HeroBanner/HeroBanner";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";


const Home = () => {

    // const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json())
    // const fetchProducts = async ()=>{
    //     const res = await fetch('http://localhost:3000/latest-products')
    //     return res.json()
    // }

    // const latestProductsPromise = fetchProducts()

    return (
        <div className="space-y-5">
            <HeroBanner></HeroBanner>
            <LatestProducts></LatestProducts>
        </div>
    );
};

export default Home;