import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTests = () => {
    const axiosPublic = useAxiosPublic()
    // const [tests, setTests] = useState([])
    // const [loading, setLoading] = useState(true)
    // useEffect(() =>{
    //     fetch('http://localhost:5000/tests')
    //     .then(res => res.json())
    //     .then(data =>{
    //         setTests(data)
    //         setLoading(false)
    //     }
    //     ) 
    // },[])

    const {data: tests = [],  isLoading, refetch} = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
           const res = await axiosPublic.get("/tests")
           return res.data;
        }
    })
    
  return [tests, isLoading, refetch];
};

export default useTests;
