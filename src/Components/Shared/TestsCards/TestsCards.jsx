import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TestsCards = ({test}) => {
    const {image,category,title,date,slots,shortDescription,_id}=test;
  return (
    <article className="flex flex-col rounded-lg shadow-xl dark:bg-gray-50 group">
      <a
        
      >
        <img
          alt=""
          className="object-cover  w-full rounded-t-lg h-56 dark:bg-gray-500 transition group-hover:scale-105 "
          src={image}
        />
      </a>
      <div className="flex flex-col flex-1 p-6">
        
        <a
          rel="noopener noreferrer"
          href="#"
          className="text-xs tracking-wider uppercase hover:underline dark:text-[#2D3663]"
        >
          {category}
        </a>
        <h3 className="py-2 text-lg font-semibold leading-snug">
         {title}
        </h3>
        <div className="flex-1">
        <p >{shortDescription}</p>
        </div>
        <div className="flex-1 mt-3">
            <p>Date: {date}</p>
            <p>Slots: {slots} left</p>
        </div>
        <Link to={`/testDetails/${_id}`}><button className="btn mt-3 rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-300 transitin hover:scale-x-110">Details <FaArrowRight></FaArrowRight></button></Link>
      </div>
    </article>
  );
};

export default TestsCards;
