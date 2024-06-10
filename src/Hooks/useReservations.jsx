import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useReservations = () => {
    const axiosSecure = useAxiosSecure()
    const { data: reservations = [], refetch, isLoading } = useQuery({
        queryKey: ["reservations"],
        queryFn: async () => {
          const res = await axiosSecure.get("/reservations");
          return res.data;
        },
      });
      
      return [reservations,refetch, isLoading];

};

export default useReservations;