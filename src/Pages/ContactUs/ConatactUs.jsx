import Swal from "sweetalert2";
import image from "../../assets/photo/doctor2.jpg";
import { FaSpinner } from "react-icons/fa";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const ConatactUs = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();
    const form = e.target;
    console.log(form);
    const name = form.name.value;
   
    const email = form.email.value;
    const message = form.message.value;
    console.log(name, email, message);
    const contactUs = {
      name: name,
      email: email,
      message: message,
    };
    const res = await axiosPublic.post('/feedback', contactUs)
    if(res.data.insertedId){
        setLoading(false)
        Swal.fire({
              title: "Thank you for contacting us",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
    }
   
  
}
  return (
    <div>
      <div
        className="hero h-[550px] rounded-sm my-10"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: "top" }}
      >
        <div className=" hero-overlay bg-opacity-20 rounded-sm">
          <div className=" text-left text-white  ">
            <div className="max-w-xl p-20  mt-10 ">
              <div className="bg-[#00000080] p-3 rounded-xl">
                <h1 className="mb-5 text-5xl font-bold font-niramit">
                  Contact Us
                </h1>
                <p className="mb-5 text-xl font-medium">
                  Get in touch with our dedicated team for all your healthcare
                  needs.
                </p>
                <p className="mb-5 text-xl font-medium">
                  We&aposre committed to providing compassionate care and advanced
                  medical solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-6 my-10 dark:bg-gray-100 dark:text-gray-900">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">
              Fill in the form to share your feedback.
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>34th Avenue – New York, W2 3XE United State.</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>+(123) 1800-88-66</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>primelab@labs.com</span>
              </p>
            </div>
          </div>
          <form
          onSubmit={handleSubmit}
            noValidate=""
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
          >
            <label className="block">
              <span className="mb-1">Full name</span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="block input input-bordered w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-[#47CCC8]dark:bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input
                type="email"
                name="email"
                placeholder="email@mail.com"
                className="block input input-bordered w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-[#47CCC8] dark:bg-gray-100"
              />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                rows="3"
                name="message"
                className="block  w-full border rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-[#47CCC8] dark:bg-gray-100"
              ></textarea>
            </label>
            <button
            disabled={loading}
              type="submit"
              className="self-center rounded-full px-8 py-3 text-lg  hover:ring focus:ring-opacity-75 dark:bg-[#47CCC8] dark:text-gray-50 focus:dark:ring-[#47CCC8] hover:dark:ring-[#47CCC8]"
            >
              {loading ? (
                    <FaSpinner className="animate-spin m-auto"></FaSpinner>
                  ) : (
                    "Submit"
                  )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ConatactUs;
