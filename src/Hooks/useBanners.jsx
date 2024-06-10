
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useBanners = () => {
    const axiosSecure = useAxiosSecure()
    const {data: banners = [],  isLoading: loading, refetch} = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
           const res = await axiosSecure.get("/banners")
           return res.data;
        }
    })
    
  return [banners, loading, refetch];
};

export default useBanners;