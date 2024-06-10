import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useBanners from "../../Hooks/useBanners";
import { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const TestDetails = () => {
  const { id } = useParams();
  const [couponCode, setCouponCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); 
  const axiosPublic = useAxiosPublic();
  const { data: test = {}, isLoading } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/test/${id}`);
      return data;
    },
  });
  const [banners, loading] = useBanners();
  useEffect(() => {
    if (test.price) {
      setTotalPrice(test.price);
    }
  }, [test.price]);
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const {
    image,
    title,
    category,
    shortDescription,
    details,
    date,
    slots,
    price,
  } = test;
  
   const handleApplyCoupon= () =>{
    const activeBanner = banners.find(banner => banner.couponCode === couponCode);
    console.log(activeBanner);
    if (activeBanner) {
      
      const discountedPrice = price - (price * (activeBanner.discountRate / 100));
      setTotalPrice(discountedPrice);
      alert(`Coupon applied! You get ${activeBanner.discountRate}% off.`);
    } else {
      alert('Invalid coupon code.');
    }
   }

  
 
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800 my-10">
      <div className="container flex flex-col mx-auto lg:flex-row">
        <div className="lg:w-1/2  dark:bg-gray-100">
          <div className="flex items-center justify-center p-4 md:p-8 lg:p-8">
            <img
              src={image}
              alt=""
              className="rounded-lg shadow-lg dark:bg-gray-500 aspect-video sm:min-h-96"
            />
          </div>
        </div>
        <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2  dark:text-black border shadow-2xl ">
          <div className="flex space-x-2 sm:space-x-4">
            <div className="space-y-2">
              <p className="text-xs tracking-wider uppercase hover:underline dark:text-[#2D3663]">
                {category}
              </p>
              <p className="text-xl font-semibold leading-snug">{title}</p>
            </div>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <div className="space-y-2">
              <p className="text-lg font-medium leading-snug">
                {shortDescription}
              </p>
            </div>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <div className="space-y-2">
              <p className="leading-snug text-gray-500">{details}</p>
            </div>
          </div>
          <div className="space-x-2 sm:space-x-4">
            <div className=" lg:flex items-center gap-20">
              <p className="leading-snug text-[#2D3663]">Test Date: {date}</p>
              <p className="leading-snug text-[#2D3663]">Slots left: {slots}</p>
            </div>
            <p className="font-niramit leading-snug text-[#2D3663] font-semibold text-2xl mt-5">
              Price: ${price}
            </p>
          </div>
          <button  onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn mt-3 rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-300"
          >
            Book now <FaArrowRight></FaArrowRight>
          </button>
        </div>
      </div>
      
      
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-2 font-semibold">{category}</p>
          <p className=" font-semibold">Date: {date}</p>
          <p className=" font-semibold">Price: ${price}</p>
          <label className="label">Promo Code</label>
          <input  onChange={(e) => setCouponCode(e.target.value)}  name="couponCode" type="text" className="input input-bordered mr-2"/>
          <button onClick={handleApplyCoupon} className="btn bg-[#2D3663] text-white ">Apply</button>
          <p className=" font-semibold mt-2">Total Price: ${totalPrice}</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} test={test} />
          </Elements>
          
        
        </div>
      </dialog>
    </section>
  );
};

export default TestDetails;
