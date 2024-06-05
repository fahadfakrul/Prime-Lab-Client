import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const name = "diagnostics1";
const img = "https://i.ibb.co/6srYV8C/jason-briscoe-Glia-HAJ3-5-A-unsplash.jpg";
const title = "Diagnostic Center";
const couponCodeName = "DiagnosticCenter";
const couponRate = "20";
const isActive = "true";
const description =
  "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumendadfgdfgdf fdgdfg dfgdfgd dfgdfgdfg fg";

const Banner = ({ image }) => {
  return (
    <div className="my-5 relative">
      <div
        className="hero h-[600px] rounded-md "
        style={{
          backgroundImage: `url( ${img})`,
        }}
      >
        <div className=" hero-overlay bg-opacity-50 rounded-md"></div>
        <div className=" hero-content text-left text-neutral-content">
          <div className="max-w-xl text-white">
            <h1 className="mb-3 md:mb-5 text-5xl lg:text-6xl font-bold font-niramit">{title}</h1>
            <p className="mb-3 md:mb-5 text-lg">{description}</p>
              <Link to="/allTests"><button className="btn rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50 transition hover:scale-x-105">All Tests <FaArrowRight></FaArrowRight></button></Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 md:bottom-8 right-3 md:right-32 flex flex-col items-center justify-center rounded-full w-56 md:w-60  bg-[#ff6f61] h-40 lg:h-60 md:rotate-12 text-white text-xl font-niramit font-bold">
        <h4>Get <span className="text-red-600">{couponRate}%</span> OFF</h4>
        <p>Using Coupon Code </p>
        <p className=" text-xl ">&quot;{couponCodeName}&quot;</p>
      </div>
    </div>
  );
};

export default Banner;
