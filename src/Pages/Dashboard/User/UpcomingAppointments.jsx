import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";


const UpcomingAppointments = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const status = "pending";
    const { data: reservations = [],refetch,isLoading } = useQuery({
        queryKey: ["reservations"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservations/${user.email}?status=${status}`);
          return res.data;
        },
      });
      console.log(reservations);
    if (isLoading){
        return <LoadingSpinner></LoadingSpinner>
       }
       
       const currentDate = new Date();
       const upcomingReservations = reservations.filter(reservation => new Date(reservation.testDate) > currentDate);
       console.log(upcomingReservations);
      
       const handleDeleteReservation = async (reservation) => {
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
            const res = await axiosSecure.delete(
              `/reservations/${reservation._id}`
            );
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Reservation cancelled successfully`,
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
            <p className="text-4xl font-medium text-[#2d3663]">Upcoming Appointments</p>
          </div>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Price</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {upcomingReservations.map((reservation, index) => (
                <tr key={reservation._id}>
                  <th>{index + 1}</th>
                  <td>{reservation.testName}</td>
                  <td>{new Date(reservation.date).toLocaleDateString()}</td>
                  <td>{reservation.transactionId}</td>
                  <td>${reservation.price}</td>
                  <td> {" "}
                  <button
                    onClick={() => handleDeleteReservation(reservation)}
                    className="btn bg-[#d90429] "
                  >
                    <FaTrash className="text-white"></FaTrash>
                  </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default UpcomingAppointments;