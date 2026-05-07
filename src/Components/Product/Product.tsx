const Product = ({product}) => {

    const {title, image} = product
  return (
    <div className="card bg-gray-700 shadow-sm">
      <figure className="px-5 h-80 pt-5">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl w-full h-full"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions w-full">
          <button className="btn bg-gray-700 hover:bg-gradient border-2 border-primary hover:btn-primary w-full">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
