
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import TestsCards from "../../Components/Shared/TestsCards/TestsCards";
import useTests from "../../Hooks/useTests";

const AllTests = () => {
  const [tests, loading] = useTests();
 
  const today = new Date().toLocaleDateString()
  const filterTests = tests.filter(test => new Date(test.date) >= new Date(today));
  
  console.log(filterTests);

  
  if (loading){
    return <LoadingSpinner></LoadingSpinner>
   }
  return (
    <div className="my-10">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {filterTests.map((test) => (
          <TestsCards key={test._id} test={test}></TestsCards>
        ))}
      </div>
    </div>
  );
};

export default AllTests;
