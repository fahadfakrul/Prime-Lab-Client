import { Link } from "react-router-dom";
import errorbg from "../../assets/error_page/errorbg.jpg"
const ErrorPage = () => {
  return (
    <section className="flex items-center h-screen p-16  dark:bg-gray-50 dark:text-gray-800"
    style={{ backgroundImage: `url(${errorbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-[#47ccc8]">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-[#2d3663]">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link to="/"><button
            rel="noopener noreferrer"
            href="#"
            className="px-8 py-3 rounded-full font-semibold  dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50"
          >
            Back to homepage
          </button></Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
