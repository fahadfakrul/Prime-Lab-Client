import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useBanners from "../../../Hooks/useBanners";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";



const Banner = () => {
  const [banners, loading] = useBanners();
  console.log(banners);
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  const activeBanner = banners.length > 0 ? banners.find(banner => banner.isActive === true) : null;
  console.log(activeBanner);
  return (
    <div className="my-5 relative">
      <div
        className="hero h-[600px] rounded-md "
        style={{
          backgroundImage: `url( ${activeBanner.image})`,
        }}
      >
        <div className=" hero-overlay bg-opacity-50 rounded-md"></div>
        <div className=" hero-content text-left text-neutral-content">
          <div className="max-w-xl text-white">
            <h1 className="mb-3 md:mb-5 text-5xl lg:text-6xl font-bold font-niramit">{activeBanner.title}</h1>
            <p className="mb-3 md:mb-5 text-lg">{activeBanner.text}</p>
              <Link to="/allTests"><button className="btn rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50 transition hover:scale-x-105">All Tests <FaArrowRight></FaArrowRight></button></Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 md:bottom-8 right-3 md:right-32 flex flex-col items-center justify-center rounded-full w-56 md:w-60  bg-[#ff6f61] h-40 lg:h-60 md:rotate-12 text-white text-xl font-niramit font-bold">
        <h4>Get <span className="text-red-600">{activeBanner.discountRate}%</span> OFF</h4>
        <p>Using Coupon Code </p>
        <p className=" text-xl ">&quot;{activeBanner.couponCode}&quot;</p>
      </div>
    </div>
  );
};

export default Banner;
