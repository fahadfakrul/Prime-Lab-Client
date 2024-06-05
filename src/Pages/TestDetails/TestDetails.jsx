import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TestDetails = () => {
  
  const { id } = useParams();
  const axiosPublic = useAxiosPublic()
  const { data: test= {}, isLoading : loading } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/test/${id}`);
      return data;
    },
  })
 
 const {image, title, category,shortDescription, details, date, slots, price} = test;
  
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
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
            <p className="font-niramit leading-snug text-[#2D3663] font-semibold text-2xl mt-5">Price: ${price}</p>
          </div>
          <button className="btn mt-3 rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-300">Book now <FaArrowRight></FaArrowRight></button>
        </div>
      </div>
    </section>
  );
};

export default TestDetails;
