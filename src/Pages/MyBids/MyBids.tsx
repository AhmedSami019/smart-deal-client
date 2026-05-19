import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

type Bid = {
  _id: string;
  buyer_name: string;
  buyer_email: string;
  bid_price: number;
  status: string;
};

const MyBids = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const { user } = use(AuthContext);

  // authorization token from jwt
  const token = localStorage.getItem('token')
  

  useEffect(() => {
   axios.get(`http://localhost:3000/bids?email=${user?.email}`,{
    headers: {Authorization: `Bearer ${token}`}
   })
   .then(data => {
    setBids(data.data)
   })
  }, [user]);
  // useEffect(() => {
  //   fetch(`http://localhost:3000/bids?email=${user?.email}`,{
  //     headers: {
  //       authorization : `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data: Bid[]) => {
  //       const sortedData = data.sort((a, b) => b.bid_price - a.bid_price);
  //       console.log(sortedData);
  //       setBids(sortedData);
  //     });
  // }, [user]);

  // all process for firebase access token
  // const token = user.accessToken

  // useEffect(() => {
  //   fetch(`http://localhost:3000/bids?email=${user?.email}`,{
  //     headers: {
  //       authorization : `Bearer ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const sortedData = data.sort((a, b) => b.bid_price - a.bid_price);
  //       setBids(sortedData);
  //     });
  // }, [user]);

  // bid remove handler
  const handleRemoveBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter((bid) => bid._id !== id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <div className="mt-5">
      <h2 className="text-center text-4xl font-bold">
        My Bids : {bids.length}
      </h2>
      <div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product</th>
              <th>Seller Name</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{bid.buyer_name}</div>
                    </div>
                  </div>
                </td>
                <td>{bid.buyer_email}</td>
                <td>{bid.bid_price}</td>
                <td className="badge badge-warning text-base-300">
                  {bid.status}
                </td>
                <th>
                  <button
                    onClick={() => handleRemoveBid(bid._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
