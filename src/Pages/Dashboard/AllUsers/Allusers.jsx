
import Swal from "sweetalert2";

import { MdBlock } from "react-icons/md";
import useUsers from "../../../Hooks/useUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";


const Allusers = () => {
   const axiosSecure = useAxiosSecure()
      const [users,refetch ,isLoading ]= useUsers();
      console.log(users);
      
      const handleAdminAction = (user, action) => {
        axiosSecure.patch(`/users/${action}/${user._id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            const actionMessage = action === 'admin' ? "is admin now!" : "is Blocked now!";
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} ${actionMessage}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
      if (isLoading){
        return <LoadingSpinner></LoadingSpinner>
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
                    onClick={() => handleAdminAction(user, "block")}
                    className="btn bg-[#d90429] "
                  >
                   
                      <MdBlock className="text-white"></MdBlock>
                  
                  </button></td>
                <td>
                   {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleAdminAction(user, "admin")}
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