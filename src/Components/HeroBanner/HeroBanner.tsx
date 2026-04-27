const HeroBanner = () => {
  return (
    <div className="flex flex-col items-center space-y-5 mt-5 p-20 bg-linear-to-tr from-[#632EE3]/10 to-[#9F62F2]/10">
      <h2 className="text-6xl text-center font-extrabold">Deal your <span className="text-primary">Products</span> <br /> In a <span className="text-primary">Smart</span> way !</h2>
      <p>
        SmartDeals helps you sell, resell, and shop from trusted local sellers —
        all in one place!
      </p>
      <div className="w-3/12 border pl-3 rounded-3xl">
        <label className="flex justify-between items-center">
          <input type="search" required placeholder="Search" />
          <div className="bg-primary px-4 py-3 rounded-r-3xl">
            <svg
            className="h-[1em] opacity-50"
            color="white"
            fontSize={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          </div>
        </label>
      </div>

       <div className="space-x-5">
            <button className="btn btn-primary">watch all products</button>
            <button className="btn border-2 border-primary">watch all products</button>
          </div>
    </div>
  );
};

export default HeroBanner;
