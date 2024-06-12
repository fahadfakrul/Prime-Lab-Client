import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Promotions = () => {
  return (
    <div>
      <div className="p-6 py-12 my-5 bg-gradient-to-r from-[#4ec0c1] to-[#05a1d8] dark:text-gray-50 rounded-lg">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-around">
           
            <TypeAnimation
              sequence={["Save 10% on your first test.", 500, "15% off on all tests booked on Saturdays and Sundays.", 500, "Get 25% off on any test during your birthday month.", 500,"10% off on all diagnostic tests for students.", 500]}
              style={{ fontSize: "2em",
               
                fontWeight: "bold"
                

               }}
              repeat={Infinity}
            />
            <Link to="/allTests">
              <button
                className="btn rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50 transition hover:scale-x-105"
              >
                All Tests <FaArrowRight></FaArrowRight>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
