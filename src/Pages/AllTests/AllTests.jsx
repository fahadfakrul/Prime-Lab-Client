import { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import TestsCards from "../../Components/Shared/TestsCards/TestsCards";
import useTests from "../../Hooks/useTests";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const AllTests = () => {
  const [tests, loading] = useTests();
  const [startDate, setStartDate] = useState(new Date());
  const [filteredTests, setFilteredTests] = useState([]);

  useEffect(() => {
    if (tests && tests.length > 0) {
      
      const filtered = tests.filter((test) => new Date(test.date)>= startDate);
      setFilteredTests(filtered);
    }
  }, [tests, startDate]);

  
  if (loading) {
    return <LoadingSpinner />;
  }
  

  console.log(tests)
 


  return (
    <div className="my-10">
      <label className="label">
        <p className="label-text">Filter onward from a date</p>
      </label>
        <DatePicker className="input input-bordered mt-2 mb-5"  selected={startDate} onChange={(date) => setStartDate(date)} />
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {filteredTests.map((test) => (
          <TestsCards key={test._id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default AllTests;
