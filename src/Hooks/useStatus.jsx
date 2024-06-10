import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: status, isPending: isAdminLoading } = useQuery({
    queryKey: [ "status", user?.status],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data?.status;
    },
  });
  return [status, isAdminLoading];
};

export default useAdmin;