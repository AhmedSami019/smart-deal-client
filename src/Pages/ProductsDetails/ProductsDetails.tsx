import { useContext, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const ProductsDetails = () => {
  const { user } = useContext(AuthContext);

  const product = useLoaderData();
  const {_id}= product

  const bidModalRef = useRef<HTMLDialogElement>(null);
  const handleBidModal = () => {
    bidModalRef.current?.showModal();
  };

//   bid handler
  const handleBid = e =>{
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries());
    const newBid = {
      product: _id,
      buyer_name : data.name,
      buyer_email : data.email,
      bid_price : data.bid,
      status : "pending"
    };
    console.log(newBid);
    fetch('http://localhost:3000/bids', {
      method: "POST", 
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(newBid)
    })
    .then(res => res.json())
    .then(data => console.log("after pricing bid",data))
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
                    className="input"
                    name="name"
                    defaultValue={user ? user.displayName : ""}
                    placeholder={!user ? "Enter name" : ""}
                  />
                  <label className="label">Buyer Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    defaultValue={user? user.email: ""}
                    placeholder={!user?"Enter email": ""}
                  />
                   <label className="label">Bid price</label>
                  <input
                    type="name"
                    className="input"
                    name="bid"
                    placeholder="Place you bid pric"
                  />
                  <button className="btn btn-neutral mt-4">Bid now</button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids section */}
    </div>
  );
};

export default ProductsDetails;
