import { FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import useReservations from "../../../Hooks/useReservations";
import { IoMdDocument } from "react-icons/io";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const Reservations = () => {
  const axiosSecure = useAxiosSecure();
  const [reservations, refetch, isLoading] = useReservations();
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");
  console.log(reservations);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const handleOpenModal = (reservationId) => {
    setSelectedReservationId(reservationId);
    document.getElementById("my_modal_1").showModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault;
    const form = e.target;
    const pdfLinkSubmit = form.pdfLink.value;
    console.log(pdfLinkSubmit);
    const submitDoc = {
      reportStatus: "delivered",
      pdfLink: pdfLinkSubmit,
    };
    const res = await axiosSecure.patch(
      `/reservations/${selectedReservationId}`,
      submitDoc
    );
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Report delivered Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
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
  const filteredReservations = searchEmail
    ? reservations.filter((reservation) =>
        reservation.email.toLowerCase().includes(searchEmail.toLowerCase())
      )
    : reservations;

  return (
    <div>
      <div className="overflow-x-auto p-20">
        <div className="flex justify-end">
          
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Filter by email"
            className="input input-bordered px-4 py-2 rounded-md mb-5"
          />
        </div>
        <div className="lg:flex justify-between">
          <p className="text-xl lg:text-4xl  font-medium text-[#2d3663] ">
            All Reservations
          </p>
          <p className="text-xl lg:text-4xl  font-medium text-[#2d3663] ">
            Total Reservations: {filteredReservations.length}
          </p>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>

              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Status</th>
              <th>Cancel</th>
              <th>
                Report <br /> Submit
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation, index) => (
              <tr key={reservation._id}>
                <th>{index + 1}</th>

                <td>{reservation?.testName}</td>
                <td>{reservation.email}</td>
                <td>
                  <div className="uppercase text-green-500  rounded-3xl flex items-center justify-center">
                    <p
                      className={`${
                        reservation.reportStatus === "pending" && "text-red-500"
                      }  `}
                    >
                      {reservation.reportStatus}
                    </p>
                  </div>
                </td>

                <td>
                  {" "}
                  <button
                    onClick={() => handleDeleteReservation(reservation)}
                    className="btn bg-[#d90429] "
                  >
                    <FaTrash className="text-white"></FaTrash>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpenModal(reservation._id)}
                    className="btn  bg-[#2d3663]"
                  >
                    <IoMdDocument className="text-white text-2xl"></IoMdDocument>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_1" className="modal w-full">
        <form onSubmit={handleSubmit}>
          <div className="modal-box w-full">
            <p className="text-4xl  font-medium text-[#2d3663] ">
              Submit report
            </p>
            <label className="label">
              <p className="label-text">PDF Link</p>
            </label>
            <input
              type="text"
              name="pdfLink"
              placeholder="Submit PDF Link Here ..."
              className="input input-bordered w-full"
            />
            <button
              type="submit"
              className="btn bg-[#2d3663] text-white px-5 rounded-full mt-5"
            >
              {" "}
              Submit
            </button>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Reservations;
