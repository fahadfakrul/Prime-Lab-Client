import { RiseLoader } from "react-spinners";


const LoadingSpinner = ({smallHeight}) => {
    return (
        <div className={`${smallHeight ? 'h-[250px]': 'h-[70vh]'}
        flex flex-col justify-center items-center`}>
            <RiseLoader size={100} color="#47CCC8" />
        </div>
    );
};

export default LoadingSpinner;