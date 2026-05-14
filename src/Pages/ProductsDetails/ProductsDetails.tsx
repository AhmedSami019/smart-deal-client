import { useContext, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ProductsDetails = () => {
  const { user } = useContext(AuthContext);

  const product = useLoaderData();
  const { _id } = product;

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
    console.log(newBid);
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
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
  };

  const handleClose = ()=>{
    bidModalRef.current?.close()
  }
  return (
    <div>
      {/* product detail section */}
      <div>
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
                    <button onClick={handleClose} type="button" className="btn-secondary w-1/2">
                      <span className="btn-secondary-inner">cancel</span>
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids section */}
    </div>
  );
};

export default ProductsDetails;
