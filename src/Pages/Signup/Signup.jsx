import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import signUpImg from "../../assets/auth/signup.jpg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate =useNavigate()
  const location = useLocation()
  const districts = useLoaderData();
  const from = location.state?.from?.pathname || "/";
  const [upazilas, setUpazilas] = useState([]);
  const {createUser,setUser,updateUser} = useAuth()
  useEffect(() => {
    fetch("upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilas(data);
      })
      .catch((err) => console.error(err));
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUser(data.name, data.photoURL)
      .then(() => {
        console.log('user updated successfully');
      }).catch(err => {
        console.log(err.message);
      });
      setUser({...result?.user, photoURL: data.photoURL, displayName: data.name});
      Swal.fire({
        icon: "success",
        title: "Account created successfully!",
        showConfirmButton: false,
        timer: 1500
      })
      navigate(from, { replace: true });
    })
    
  };
  const password = watch("password");
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <img src={signUpImg} alt="" width={600} />
          </div>
          <div className="card w-full lg:w-8/12 max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.email && (
                  <p className="text-red-600">This field is required</p>
                )}
              </div>
              <div className="md:flex  gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    {...register("name", { required: true })}
                    className="input input-bordered"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-600">This field is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Blood Group</span>
                  </label>
                  <select
                    className="input  input-bordered"
                    {...register("bloodGroup", { required: true })}
                    defaultValue=""
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
                  {errors.bloodGroup && (
                    <p className="text-red-600">This field is required</p>
                  )}
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="photo URL"
                  {...register("photoURL", { required: true })}
                  className="input input-bordered"
                  required
                />
                {errors.photoURL && (
                  <p className="text-red-600">This field is required</p>
                )}
              </div>

              <div className="md:flex  gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">District</span>
                  </label>
                  <select
                    className="input input-bordered"
                    {...register("district", { required: true })}
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
                  {errors.district && (
                    <p className="text-red-600">This field is required</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Upazila</span>
                  </label>
                  <select
                    className="input input-bordered"
                    {...register("upazila", { required: true })}
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
                  {errors.upazila && (
                    <p className="text-red-600">This field is required</p>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/,
                  })}
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must be 6 letter password, with at least a symbol,
                    upper and lower case letters and a number
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === password,
                  })}
                  required
                />
                {errors.confirmPassword?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <p className="text-red-600">Password didnot match</p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign up"
                  className="btn rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50"
                />
              </div>
              <p>
                <small>
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="underline">Log in to your account.</span>
                  </Link>{" "}
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
