import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ProductsDetails = () => {
  const { user } = useContext(AuthContext);
  const product = useLoaderData();
  const { _id } = product;

  // states
  const [bids, setBids] = useState<
    {
      buyer_name: string;
      buyer_email: string;
      bid_price: number;
    }[]
  >([]);

  // bids collection for each product
  useEffect(() => {
    fetch(`http://localhost:3000/product/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [_id]);
  console.log(bids);

  const bidModalRef = useRef<HTMLDialogElement>(null);
  const handleBidModal = () => {
    bidModalRef.current?.showModal();
  };

  //   bid handler
  const handleBid = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const newBid = {
      product: _id,
      buyer_name: data.name,
      buyer_email: data.email,
      bid_price: data.bid,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current?.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.insertedId
          const newBids = [newBid, ...bids].sort((a,b)=> b.bid_price - a.bid_price)
          setBids(newBids)  
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
  };

  const handleClose = () => {
    bidModalRef.current?.close();
  };
  return (
    <div className="mx-10 my-5">
      {/* product detail section */}
      <section>
        <div></div>
        <div>
          <button onClick={handleBidModal} className="btn btn-primary">
            I want to buy this product
          </button>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Give seller your offered price
              </h3>
              <form onSubmit={handleBid} action="">
                <fieldset className="fieldset">
                  <label className="label">Buyer Name</label>
                  <input
                    type="name"
                    className="input w-full"
                    name="name"
                    defaultValue={user ? user.displayName : ""}
                    placeholder={!user ? "Enter name" : ""}
                  />
                  <label className="label">Buyer Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    name="email"
                    defaultValue={user ? user.email : ""}
                    placeholder={!user ? "Enter email" : ""}
                  />
                  <label className="label">Bid price</label>
                  <input
                    type="name"
                    className="input w-full"
                    name="bid"
                    placeholder="Place you bid pric"
                  />
                  <div className="flex justify-between items-center mt-5 gap-5">
                    <button className="btn btn-primary w-1/2">Bid now</button>
                    <button
                      onClick={handleClose}
                      type="button"
                      className="btn-secondary w-1/2"
                    >
                      <span className="btn-secondary-inner">cancel</span>
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </dialog>
        </div>
      </section>
      {/* bids section */}
      <section className="mt-10">
        <h2 className="text-3xl font-semibold">
          Bids for this product{" "}: {" "}
          <span className="text-primary">{bids.length}</span>
        </h2>
        <div className="my-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bid, index) => (
                  <tr>
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
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsDetails;
