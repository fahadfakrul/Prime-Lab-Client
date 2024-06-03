import { PropagateLoader} from "react-spinners";


const LoadingSpinner = ({smallHeight}) => {
    return (
        <div className={`${smallHeight ? 'h-[250px]': 'h-[70vh]'}
        flex flex-col justify-center items-center`}>
            <PropagateLoader size={30} color="#47CCC8" />
        </div>
    );
};

export default LoadingSpinner;