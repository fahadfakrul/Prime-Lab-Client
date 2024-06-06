import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
const AddTests = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {console.log(data)}
    return (
        <div className=''>
            <div className="hero min-h-screen bg-base-200 lg:px-20">
        
          
          <div className="card w-full bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)}  className="card-body ">
                
              <div>
                <p className="text-4xl  font-medium text-[#2d3663] ">
                  Add a test
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title*</span>
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
              <div className="md:flex   gap-5 ">
                <div className="form-control flex-grow">
                  <label className="label">
                    <span className="label-text">Price*</span>
                  </label>
                  <input
                    type="number"
                    step=".01"
                    placeholder="price"
                    {...register("price", { required: true })}
                    className="input input-bordered"
                    required
                  />
                  {errors.price && (
                    <p className="text-red-600">This field is required</p>
                  )}
                </div>
                <div className="form-control flex-grow">
                  <label className="label">
                    <span className="label-text">Category*</span>
                  </label>
                  <select
                    className="input  input-bordered "
                    {...register("category", { required: true })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Haematology">Haematology</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Microbiology">Microbiology</option>
                    <option value="Immunology and Serology">Immunology and Serology</option>
                    <option value="Clinical Pathology">Clinical Pathology</option>
                    <option value="Cytology and Histopathology">Cytology and Histopathology</option>
                    <option value="Molecular Diagnostics">Molecular Diagnostics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Oncology">Oncology</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-600">This field is required</p>
                  )}
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
                    <span className="label-text">Date*</span>
                  </label>
                  <DatePicker  className='input input-bordered w-full' selected={startDate} onChange={(date) => setStartDate(date)} />
                  
                </div>

                <div className="form-control flex-grow">
                  <label className="label">
                    <span className="label-text">Slots</span>
                  </label>
                  <input
                    type="number"
                    placeholder="slots"
                    {...register("slots", { required: true })}
                    className="input input-bordered"
                    required
                  />
                  {errors.slots && (
                    <p className="text-red-600">This field is required</p>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Short Description</span>
                </label>
                <input
                  type="text"
                  placeholder="short description"
                  className="textarea textarea-bordered"
                  {...register("shortDescription", {
                    required: true,
                  })}
                  required
                />
               {errors.shortDescription && (
                    <p className="text-red-600">This field is required</p>
                  )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Details</span>
                </label>
                <textarea
                  type="text"
                  placeholder="details"
                  className="textarea textarea-bordered"
                  
                  {...register("details", {
                    required: true,
                  })}
                  required
                />
               {errors.details && (
                    <p className="text-red-600">This field is required</p>
                  )}
              </div>

              
              <div className="form-control mt-6">
                <button
                //   disabled={loading}
                  type="submit"
                  className="btn rounded-full px-6 border-none dark:bg-[#2d3663] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50"
                >
                    Add Test
                  {/* {loading ? (
                    <FaSpinner className="animate-spin m-auto"></FaSpinner>
                  ) : (
                    "Sign up"
                  )} */}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>

        
    );
};

export default AddTests;