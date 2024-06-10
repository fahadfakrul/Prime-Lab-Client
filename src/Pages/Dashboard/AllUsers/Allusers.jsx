
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import { MdBlock } from "react-icons/md";
import useUsers from "../../../Hooks/useUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUser, FaUsers } from "react-icons/fa";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import { useState } from "react";


const Allusers = () => {
   const axiosSecure = useAxiosSecure()
      const [users,refetch ,isLoading ]= useUsers();
      const [selectedUser, setSelectedUser] = useState(null);
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
      const openModal = (user) => {
        setSelectedUser(user);
        const modal = document.getElementById("my_modal_1");
        modal.showModal();
      };
    
      const closeModal = () => {
        setSelectedUser(null);
        const modal = document.getElementById("my_modal_1");
        modal.close();
      };

      const downloadUserInfoAsPDF = () => {
        if (!selectedUser) return;
    
        const doc = new jsPDF();
        doc.text(`User Info`, 10, 10);
        doc.text(`Name: ${selectedUser.name}`, 10, 20);
        doc.text(`Email: ${selectedUser.email}`, 10, 30);
        doc.text(`District: ${selectedUser.district}`, 10, 40);
        doc.text(`Upazila: ${selectedUser.upazila}`, 10, 50);
        doc.text(`Blood Group: ${selectedUser.bloodGroup}`, 10, 60);
        
    
    
        doc.save(`${selectedUser.name}_info.pdf`);
      };
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
              <th>Info</th>
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
                <td><button
                     onClick={() => openModal(user)}
                      className="btn  bg-[#2d3663]"
                    >
                      <FaUser className="text-white text-2xl"></FaUser>
                    </button></td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
      

<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-[#2d3663] text-3xl">User Info</h3>
    {selectedUser && (
            <div>
              <p className="pt-4"><span className="font-semibold">Name:</span> {selectedUser.name}</p>
              <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
              <p><span className="font-semibold">District:</span> {selectedUser.district}</p>
              <p><span className="font-semibold">Upazila:</span> {selectedUser.upazila}</p>
              <p><span className="font-semibold">Blood Group:</span> {selectedUser.bloodGroup}</p>
              <button onClick={downloadUserInfoAsPDF} className="btn rounded-full text-white bg-[#2d3663] mt-5">Download Info</button>
            </div>
          )}
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-outline" onClick={closeModal}>Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
    );
};

export default Allusers;