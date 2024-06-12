import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TestsCards from "../../../Components/Shared/TestsCards/TestsCards";


const FeaturedTests = () => {
    const axiosSecure = useAxiosSecure()
    const { data: featuredTests = [] } = useQuery({
        queryKey: ["most-booked-tests"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/most-booked-tests`);
          return res.data;
        },
      });
      console.log(featuredTests);
    return (
        <div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {featuredTests.map((test) => (
          <TestsCards key={test._id} test={test} />
        ))}
      </div>
        </div>
    );
};

export default FeaturedTests;