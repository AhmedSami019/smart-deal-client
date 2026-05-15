import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const MyBids = () => {
    const [bids, setBids] = useState([])
    const {user} = use(AuthContext)

    useEffect(()=>{
        fetch(`http://localhost:3000/bids?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setBids(data);
        })
    },[user?.email])

    return (
        <div className="mt-5">
            <h2 className="text-center text-4xl font-bold">My Bids : {bids.length}</h2>
        </div>
    );
};

export default MyBids;