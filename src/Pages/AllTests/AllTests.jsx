import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import TestsCards from "../../Components/Shared/TestsCards/TestsCards";
import useTests from "../../Hooks/useTests";

const AllTests = () => {
  const [tests, loading] = useTests();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Ensure tests is an array before filtering
  if (!Array.isArray(tests)) {
    console.error('Tests is not an array:', tests);
    return <div>Error: tests is not an array</div>;
  }

  const today = new Date().toLocaleDateString();
  const filterTests = Array.isArray(tests) ? tests.filter((test) => new Date(test.date) >= new Date(today)) : [];

  console.log(filterTests);

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {filterTests.map((test) => (
          <TestsCards key={test._id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default AllTests;
