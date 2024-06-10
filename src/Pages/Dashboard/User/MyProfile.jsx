import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user, setUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedDistricts = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDistricts(sortedDistricts);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedUpazilas = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUpazilas(sortedUpazilas);
      })
      .catch((err) => console.error(err));
  }, []);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name);
      setValue("bloodGroup", currentUser.bloodGroup);
      setValue("district", currentUser.district);
      setValue("upazila", currentUser.upazila);
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data) => {
    setLoading(true)
      const imageFile = { image: data.photo[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        await updateUser(data.name, res.data.data.display_url);

        const updatedUser = {
          name: data.name,
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila,
          photoURL: res.data.data.display_url,
        };

        await axiosSecure.patch(`/users/${user.email}`, updatedUser);
      
        setUser({
          ...user,
          photoURL: res.data.data.display_url,
          displayName: data.name,
        });
        
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
       setLoading(false);
      }
    
    
  };
  return (
    <div>
      <div className=" min-h-screen bg-base-200">
        <div>
          <div className=" w-full   bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div>
                <p className="text-4xl  font-medium text-[#2d3663] ">
                  My Profile
                </p>

                <div className="avatar mt-5">
                  <div className="w-28 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
                <p className="my-3">{user.email}</p>
              </div>

              <div className="md:flex  gap-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    {...register("name")}
                    className="input input-bordered "
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Blood Group</span>
                  </label>
                  <select
                    className="input  input-bordered"
                    {...register("bloodGroup")}
                    defaultValue={""}
                  >
                    <option value="" disabled>
                      Select Blood Group
                    </option>
                    <option value="O -">O -</option>
                    <option value="O +">O +</option>
                    <option value="A -">A -</option>
                    <option value="A +">A +</option>
                    <option value="B -">B -</option>
                    <option value="B +">B +</option>
                    <option value="AB -">AB -</option>
                    <option value="AB +">AB +</option>
                  </select>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  required
                  id="image"
                  accept="image/*"
                  {...register("photo")}
                  type="file"
                  className="file-input file-input-bordered w-full "
                />
              </div>

              <div className="md:flex  gap-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">District</span>
                  </label>
                  <select
                    className="input input-bordered"
                    {...register("district")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select District
                    </option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Upazila</span>
                  </label>
                  <select
                    className="input input-bordered"
                    {...register("upazila")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Upazila
                    </option>
                    {upazilas.map((upazila) => (
                      <option key={upazila.id} value={upazila.name}>
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-control mt-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin m-auto"></FaSpinner>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
