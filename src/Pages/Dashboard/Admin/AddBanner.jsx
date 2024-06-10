import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddBanner = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true)
    const imageFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    if(res.data.success){
    const bannerItem = {
      title: data.title,
      image: res.data.data.url,
      couponCode: data.couponCode,
      discountRate: data.discountRate,
      text : data.text,
      isActive: 'true'
    };
    const Res= await axiosSecure.post('/banner',bannerItem)
    if (Res.data.insertedId){
        setLoading(false)
        reset(  )
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.title} Added Successfully`,
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/dashboard/allBanners')
       }
    }
  };
  return (
    <div className="">
      <div className="hero min-h-screen bg-base-200 lg:px-20">
        <div className="card w-full bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
            <div>
              <p className="text-4xl  font-medium text-[#2d3663] ">
                Add a banner
              </p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="title"
                {...register("title", { required: true })}
                className="input input-bordered"
                required
              />
              {errors.title && (
                <p className="text-red-600">This field is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                required
                id="image"
                accept="image/*"
                {...register("photo", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full "
              />

              {errors.photo && (
                <p className="text-red-600">This field is required</p>
              )}
            </div>

            <div className="md:flex  gap-5">
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Coupon Code</span>
                </label>
                <input
                  type="text"
                  placeholder="coupon code"
                  {...register("couponCode", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.couponCode && (
                  <p className="text-red-600">This field is required</p>
                )}
              </div>
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Discount</span>
                </label>
                <input
                  type="number"
                  placeholder="discount rate"
                  {...register("discountRate", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.discountRate && (
                  <p className="text-red-600">This field is required</p>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Text</span>
              </label>
              <input
                type="text"
                placeholder="text"
                className="textarea textarea-bordered"
                {...register("text", {
                  required: true,
                })}
                required
              />
              {errors.text && (
                <p className="text-red-600">This field is required</p>
              )}
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
                    "Save and Continue"
                  )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
