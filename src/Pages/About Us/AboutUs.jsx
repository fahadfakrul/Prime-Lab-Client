import { Link } from "react-router-dom";
import doctor from "../../assets/photo/doctor.jpg";
import { FaArrowRight } from "react-icons/fa";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import sthethoscope from "../../assets/photo/stethoscope.png"
import medicalTeam from "../../assets/photo/medical-team.png"
import time from "../../assets/photo/time.png"

const AboutUs = () => {
  return (
    <div>
      <div
        className="hero h-[550px] rounded-sm my-10"
        style={{ backgroundImage: `url(${doctor})`, backgroundPosition: "top" }}
      >
        <div className="hero-overlay bg-opacity-20 rounded-sm">
          <div className=" text-left text-[#111111] ">
            <div className="max-w-xl p-20 mt-10">
              <h1 className="mb-5 text-5xl font-bold  font-niramit">
                Inspiring Better Health
              </h1>
              <p className="mb-5 text-xl font-medium">15 years of experience</p>
              <p className="mb-5 text-xl font-medium">
                Committed to providing compassionate care and advanced medical
                solutions.
              </p>
              <Link to="/">
                <button
                  className="btn rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50 transition hover:scale-x-105"
                >
                  Get Started <FaArrowRight></FaArrowRight>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SectionTitle heading={"Our Vision"} subheading={" Our vision is to create a healthier world by providing accessible and high-quality healthcare services to everyone. "}></SectionTitle>
      <div className="md:flex justify-around" >
        <div className="flex w-[400px] gap-3 p-3">
            <img src={sthethoscope} alt="" height={100} width={100} />
            <div className="space-y-1 text-[#2d3663]">
                <p className="font-semibold">World-Class Care</p>
                <p >Carefully chosen board-certified doctors and extended appointments with physicians who truly listen.</p>
            </div>
        </div>
        <div className="flex w-[400px] gap-3 p-3">
            <img src={medicalTeam} alt="" height={100} width={100} />
            <div className="space-y-1 text-[#2d3663]">
                <p className="font-semibold">
                Putting You First</p>
                <p >Convenient ofice locations, and on-site lab test with no appointment required..</p>
            </div>
        </div>
        <div className="flex w-[400px] gap-3 p-3">
            <img src={time} alt="" height={100} width={100} />
            <div className="space-y-1 text-[#2d3663]">
                <p className="font-semibold">Attention to Service</p>
                <p >95% of appointments start on time or early, and we’re in-network with most PPO and HMO plans.</p>
            </div>
        </div>
      </div>
  <SectionTitle heading={"Our Achievements"} subheading={"We are proud of our milestones and the trust our patients and partners place in us. Here’s a snapshot of our commitment to providing top-notch diagnostic services and care."}></SectionTitle>
      <section className="p-6 dark:bg-gray-100 text-[#2d3663] mb-10">
      <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
    <div className="flex flex-col justify-start m-2 lg:m-6">
        <p className="text-4xl font-bold leading-none lg:text-6xl">5K+</p>
        <p className="text-sm sm:text-base">Happy Patients</p>
    </div>
    <div className="flex flex-col justify-start m-2 lg:m-6">
        <p className="text-4xl font-bold leading-none lg:text-6xl">20+</p>
        <p className="text-sm sm:text-base">Expert Doctors</p>
    </div>
    <div className="flex flex-col justify-start m-2 lg:m-6">
        <p className="text-4xl font-bold leading-none lg:text-6xl">50+</p>
        <p className="text-sm sm:text-base">Advanced Tests Machineries</p>
    </div>
    <div className="flex flex-col justify-start m-2 lg:m-6">
        <p className="text-4xl font-bold leading-none lg:text-6xl">15</p>
        <p className="text-sm sm:text-base">Years of Service</p>
    </div>
    <div className="flex flex-col justify-start m-2 lg:m-6">
        <p className="text-4xl font-bold leading-none lg:text-6xl">100+</p>
        <p className="text-sm sm:text-base">Healthcare Partners</p>
    </div>
    <div className="flex flex-col justify-start m-2 lg:m-6">
        <p className="text-4xl font-bold leading-none lg:text-6xl">24/7</p>
        <p className="text-sm sm:text-base">Customer Support</p>
    </div>
</div>
</section>
    </div>
  );
};

export default AboutUs;
