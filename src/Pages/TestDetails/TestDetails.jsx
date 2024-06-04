import { useParams } from "react-router-dom";
import useTests from "../../Hooks/useTests";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const TestDetails = () => {
  const [tests, loading] = useTests();
  const { id } = useParams();
  const test = tests.find((test) => test._id === id);
  
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800 my-10">
      <div className="container flex flex-col mx-auto lg:flex-row">
        <div className="lg:w-1/2  dark:bg-gray-100">
          <div className="flex items-center justify-center p-4 md:p-8 lg:p-8">
            <img
              src={test.image}
              alt=""
              className="rounded-lg shadow-lg dark:bg-gray-500 aspect-video sm:min-h-96"
            />
          </div>
        </div>
        <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2  dark:text-black border shadow-2xl ">
          <div className="flex space-x-2 sm:space-x-4">
            <div className="space-y-2">
            <p className="text-xs tracking-wider uppercase hover:underline dark:text-[#2D3663]">
                {test.category}
              </p>
              <p className="text-xl font-semibold leading-snug">{test.title}</p>
            </div>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <div className="space-y-2">
              <p className="text-lg font-medium leading-snug">
                {test.shortDescription}
              </p>
            </div>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <div className="space-y-2">
              <p className="leading-snug text-gray-500">{test.details}</p>
            </div>
          </div>
          <div className="space-x-2 sm:space-x-4">
            <div className=" lg:flex items-center gap-20">
              <p className="leading-snug text-[#2D3663]">Test Date: {test.date}</p>
              <p className="leading-snug text-[#2D3663]">Slots left: {test.slots}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestDetails;
