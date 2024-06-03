import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useTests = () => {
    const [tests, setTests] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        fetch('http://localhost:5000/tests')
        .then(res => res.json())
        .then(data =>{
            setTests(data)
            setLoading(false)
        }
        ) 
    },[])

    const {data, isLoading} = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {

        }
    })
    
  return [tests, loading];
};

export default useTests;
