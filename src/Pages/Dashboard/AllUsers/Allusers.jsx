// import { FaSpinner } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaSpinner, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaTrashCan } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";


const Allusers = () => {
    
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch, isLoading:loading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axiosSecure.get("/users");
          return res.data;
        },
      });
      const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      };
      const handleBlockUser = (user) => {

      }
    return (
        <div>
           <div className="overflow-x-auto p-20">
        <div className="flex justify-between">

          <p className="text-4xl  font-medium text-[#2d3663] ">All Users</p>
          <p className="text-4xl  font-medium text-[#2d3663] ">Total Users: {users.length}</p>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>

              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Status</th>
              <th>Block</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><div className="uppercase text-red-500  rounded-3xl flex items-center justify-center"><p className={`${user.status === 'active' && 'text-green-500' }  `} >{user.status}</p></div></td>

                <td> <button
                    // onClick={() => handleDeleteTest(test)}
                    className="btn bg-[#d90429] "
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin m-auto"></FaSpinner>
                    ) : (
                      <MdBlock className="text-white"></MdBlock>
                    )}
                  </button></td>
                <td>
                   {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn  bg-[#2d3663]"
                    >
                      <FaUsers className="text-white text-2xl"></FaUsers>
                    </button>
                  )}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
        </div>
    );
};

export default Allusers;