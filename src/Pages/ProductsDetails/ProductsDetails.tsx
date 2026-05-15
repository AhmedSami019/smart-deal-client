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
          newBid._id = data.insertedId;
          const newBids = [newBid, ...bids].sort(
            (a, b) => b.bid_price - a.bid_price,
          );
          setBids(newBids);
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
    <div className="mx-3 md:mx-10 my-5">
      {/* product detail section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* left side */}
        <div className="md:flex md:flex-col space-y-6 ">
          <figure>
            <img className="rounded-xl w-full" src={product.image} alt="" />
          </figure>

          <div className="flex-1 space-y-3 bg-base-200 p-5 rounded-xl">
            <h3 className="text-2xl font-semibold">Product Description</h3>
            <div className="flex justify-between text-xl font-medium">
              <h4 className="text-sm md:text-base">
                Condition :{" "}
                <span className="text-primary">{product.condition}</span>
              </h4>
              <h4 className="text-sm md:text-base">
                Usage time :{" "}
                <span className="text-primary">{product.usage}</span>
              </h4>
            </div>
            <div className="divider -my-2"></div>
            <p className="mt-2">{product.description}</p>
          </div>
        </div>

        {/* right side */}
        <div className="md:col-span-2 space-y-5">
          <h2 className="text-4xl font-bold">{product.title}</h2>
          <p className="btn btn-sm rounded-2xl border-pink-700 text-pink-500">
            {product.category}
          </p>
          <br />
          <div className="bg-base-200 p-5 rounded-xl">
            <h5 className="text-2xl font-bold">
              ${product.price_min} - {product.price_max}
            </h5>
            <p>Price starts from</p>
          </div>

          {/* product details */}
          <div className="bg-base-200 p-5 rounded-xl">
            <h6 className="text-xl font-semibold mb-5">Product Details</h6>
            <p>Product id : {product._id}</p>
            <p>Posted : {product.created_at}</p>
          </div>

          {/* seller info */}
          <div className="bg-base-200 p-5 rounded-xl">
            <h6 className="text-xl font-semibold mb-5">Seller Information</h6>
            <div className="flex items-center gap-5 mb-3">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2">
                  <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                </div>
              </div>
              <div>
                <p>{product.seller_name}</p>
                <p>{product.email}</p>
              </div>
            </div>
            <p>Location : {product.location}</p>
            <p>Contact : {product.seller_contact}</p>
            <p>Status <span>{product.status}</span></p>
          </div>
          <button onClick={handleBidModal} className="btn btn-primary w-full">
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
          Bids for this product :{" "}
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
