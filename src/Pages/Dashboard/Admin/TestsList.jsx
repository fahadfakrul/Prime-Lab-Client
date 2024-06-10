import { FaTrashCan } from "react-icons/fa6";
import useTests from "../../../Hooks/useTests";
import { Link } from "react-router-dom";
import { FaEdit, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";

const TestsList = () => {
  const [tests, loading, refetch] = useTests();
  const axiosSecure = useAxiosSecure();
console.log(tests);

  if (loading){
    return <LoadingSpinner></LoadingSpinner>
   }
   if (!Array.isArray(tests)) {
    console.error('Tests is not an array:', tests);
    return <div>Error: tests is not an array</div>;
  }
  const handleDeleteTest = async (test) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2d3663",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/tests/${test._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${test.name} deleted successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
 
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
              <th>Slots left</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={test._id}>
                <th>{index + 1}</th>

                <td>{test.title}</td>
                <td>{test.date}</td>
                <td>{test.slots}</td>
                <td>${test.price}</td>
                <td>
                  <Link to={`/dashboard/updateTests/${test._id}`}>
                    <button
                      // onClick={() => handleUpdateItem(item)}
                      className="btn bg-[#2D3663] "
                    >
                      <FaEdit className="text-white"></FaEdit>
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteTest(test)}
                    className="btn bg-[#d90429] "
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin m-auto"></FaSpinner>
                    ) : (
                      <FaTrashCan className="text-white"></FaTrashCan>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestsList;
