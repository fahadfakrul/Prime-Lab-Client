import { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import TestsCards from "../../Components/Shared/TestsCards/TestsCards";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const AllTests = () => {
    const axiosPublic = useAxiosPublic();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [filteredTests, setFilteredTests] = useState([]);
 const [count, setCount] = useState(0)
  const { data: allTests = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['all-tests', currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-tests?page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    }
  });
  

  const { data: getCount = 0 } = useQuery({
    queryKey: ["tests-count"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tests-count");
      console.log("Count Data:", res.data);
      return res.data;
    }
  });
  useEffect(() => {
    refetch(); // Fetch all tests when currentPage or itemsPerPage changes
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (allTests && allTests.length > 0) {
      const filtered = allTests.filter((test) => new Date(test.date) >= startDate);
      setFilteredTests(filtered);
    }
  }, [allTests, startDate]);

  useEffect(() => {
    setCount(getCount.count);
  }, [getCount]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const numberOfPages = count > 0 ? Math.ceil(count / itemsPerPage) : 0;
  const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()].map((element) => element + 1) : [];
  console.log(numberOfPages);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };
  return (
    <div className="my-10">
      <label className="label">
        <p className="label-text">Filter onward from a date</p>
      </label>
      <DatePicker
        className="input input-bordered mt-2 mb-5"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {filteredTests.map((test) => (
          <TestsCards key={test._id} test={test} />
        ))}
      </div>
      <div className="flex justify-center space-x-1 dark:text-gray-800 mt-10">
        <button
        disabled = {currentPage ===1}
         onClick={() => handlePaginationButton(currentPage -1)}
          title="previous"
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-xl dark:bg-gray-50 dark:border-gray-400"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        {pages.map((btnNum) => (
          <button
            key={btnNum}
            
            onClick={() => handlePaginationButton(btnNum)}
            type="button"
            title="Page 1"
            className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-xl dark:bg-gray-50  ${currentPage === btnNum ? 'dark:text-sky-600 dark:border-sky-600' : ''}`}
          >
            {btnNum}
          </button>
        ))}

        <button
        onClick={() => handlePaginationButton(currentPage +1)}
          title="next"
          type="button"
          disabled = {currentPage === numberOfPages}
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-xl dark:bg-gray-50 dark:border-gray-400"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AllTests;
