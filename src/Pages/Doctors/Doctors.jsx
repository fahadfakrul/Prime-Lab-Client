import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Doctors = () => {
    const axiosPublic = useAxiosPublic()
    const {data: doctors = [],  isLoading: loading} = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
           const res = await axiosPublic.get("/doctors")
           return res.data;
        }
    })
    if(loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
	<p className="text-4xl font-bold leading-none text-center sm:text-5xl mb-5">Meet Our Medical Team</p>
<h1 className="p-2 text-sm font-medium tracking-wider text-center uppercase">Get to know our team of skilled and compassionate doctors dedicated to providing the highest quality care for our patients. Each member of our medical team brings expertise and passion to their respective fields, ensuring comprehensive and personalized treatment for every individual.</h1>

		<div className="flex flex-row flex-wrap-reverse justify-center mt-8">
			{
                doctors.map(doctor => (<div key={doctor._id} className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 ">
                    <img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-gray-500" src={doctor.image} />
                    <div className="flex-1 my-4">
                        <p className="text-xl font-semibold leading-snug">{doctor.name}</p>
                        <p>{doctor.specialization}</p>
                    </div>
                    
                </div>))
            }
			
			
			
			
		</div>
	</div>
</section>
        </div>
    );
};

export default Doctors;