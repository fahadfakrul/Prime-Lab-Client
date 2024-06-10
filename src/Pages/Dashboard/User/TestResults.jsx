import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const TestResults = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const { data: reservations = [],  isLoading } = useQuery({
      queryKey: ["reservations"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/reservations/${user.email}`);
        return res.data;
      },
    });
 
  console.log(reservations);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className="overflow-x-auto p-20">
        <div>
          <p className="text-4xl  font-medium text-[#2d3663] ">All tests</p>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>

              <th>Title</th>
              <th>Date</th>
              <th>Transaction Id</th>
              <th>Price</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={reservation._id}>
                <th>{index + 1}</th>

                <td>{reservation.testName}</td>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.transactionId}</td>
                <td>${reservation.price}</td>
                <td>
                  <a
                    href={reservation.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn bg-[#2D3663]">
                      <FaEdit className="text-white"></FaEdit>
                    </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResults;
