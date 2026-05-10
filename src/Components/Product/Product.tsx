import { Link } from "react-router";

type ProductProps = {
  product: {
    _id: string;
    title: string;
    image: string;
  };
};

const Product = ({ product }: ProductProps) => {

    const {_id, title, image} = product
  return (
    <div className="card bg-gray-700 shadow-sm">
      <figure className="px-5 h-80 pt-5">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions w-full">
          <Link to={`/products/${_id}`} className="btn bg-gray-700 hover:bg-gradient border-2 border-primary hover:btn-primary w-full">View details</Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
